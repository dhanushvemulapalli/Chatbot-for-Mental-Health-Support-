# dhanush
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage
from dotenv import load_dotenv
from .Pinecone_conn import get_Pinecone_vectorstore
import re
import time
from .Sentiment_Anal import sentiment_analysis
from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, TrainingArguments, Trainer
import torch
import random

load_dotenv()

# Format documents manually
def format_document(doc):
    """
    Format a document into a string with title, link, and content.

    Args:
        doc (Document): Document to format

    Returns:
        str: Formatted string
    """
    return f"Title: {doc.metadata.get('title', 'No title')}\nLink: {doc.metadata.get('link', 'No link')}\nContent: {doc.page_content}"

def parse_response_to_json(response_text: str):
    # Basic extraction: find links and surrounding context
    """
    Parse a response from the chatbot into a JSON object with extracted resources.

    Args:
        response_text (str): Text from the chatbot response

    Returns:
        dict: JSON object with answer and resources
    """
    links = re.findall(r'(https?://[^\s]+)', response_text)
    resources = []

    for link in links:
        # Look behind the link for a possible title
        idx = response_text.find(link)
        title_start = max(0, idx - 60)
        snippet = response_text[title_start:idx].strip()
        # Extract last sentence or phrase before link
        possible_title = re.findall(r'([\w\s]{5,})[.:!?]?\s*$', snippet)
        title = possible_title[-1].strip().capitalize() if possible_title else "Resource"
        
        resources.append({
            "title": title,
            "link": link
        })

    return {
        "answer": response_text,
        "resources": resources
    }

def chatbot(query,history=None):
    """
    Process a query and return a structured JSON object with an answer and suggested resources, based on sentiment analysis and retrieval from the Pinecone VectorStore.

    Args:
        query (str): User query to process
        history (list[HumanMessage], optional): Previous messages to include in the prompt. Defaults to None.

    Returns:
        dict: JSON object with answer and resources
    """
    start_retrieval = time.time()
    
    # Step 1: Load Pinecone VectorStore
    vectorstore = get_Pinecone_vectorstore("mindcare-resource2")
    retriever = vectorstore.as_retriever(search_type="similarity", k=3)

    # Step 2: Perform Sentiment Analysis on the query
    sentiment = sentiment_analysis(query)
    print(f"Sentiment analysis result: {sentiment}")
    
    # Step 3: Load LLM
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash-thinking-exp-01-21",
        temperature=0.2
    )

    # Step 4: Create Prompt Template

    SYSTEM_TEMPLATE = """
    You are MindCare™, a compassionate mental health assistant who is aware of the user's emotional state based on their sentiment. 
    Use the following context and resources to help answer the user's question in a supportive and empathetic manner.

    Consider the sentiment of the user's query and tailor your response accordingly. If the sentiment is negative (e.g., stress, sadness), be extra empathetic and offer useful resources or advice. 
    If the sentiment is neutral or positive, provide practical suggestions or responses to help with the inquiry.

    If the answer is not in the context, clearly inform the user that you don't know, but still offer encouragement or suggest related resources.

    <sentiment>
    {sentiment}
    </sentiment>

    <context>
    {context}
    </context>

    <past_messages>
    {past_messages}
    </past_messages>
    """

    prompt = ChatPromptTemplate.from_messages([ 
        ("system", SYSTEM_TEMPLATE), 
        MessagesPlaceholder(variable_name="messages"),
    ])

    # Step 5: Query and format context
    retrieved_docs = retriever.invoke(query)
    end_retrieval = time.time()
    print(f"⏱️ Retrieval time: {end_retrieval - start_retrieval:.2f} seconds")

    formatted_context = "\n\n".join([format_document(doc) for doc in retrieved_docs])

    # Debug
    print("🔍 Retrieved docs:", [doc.page_content[:100] for doc in retrieved_docs])

    # Step 6: Include sentiment info in the prompt or as part of the message
    sentiment_prompt = f"Sentiment: {sentiment}\n"  # Add sentiment as part of the context

    # Step 7: Format prompt and run with LLM
    chain_input = prompt.invoke({
        "context": formatted_context,
        "messages": [HumanMessage(content=query)],
        "past_messages": history or [],
        "sentiment": sentiment_prompt
    })

    # Final LLM call
    start_llm = time.time()
    response = llm.invoke(chain_input)
    end_llm = time.time()
    print(f"⏱️ LLM time: {end_llm - start_llm:.2f} seconds")
    print(f"🔁 Total time: {end_llm - start_retrieval:.2f} seconds")

    # print("\n💬 Answer:\n", response.content)
    structured_output = parse_response_to_json(response.content)
    print(structured_output)
    return structured_output

def crisis_check(query):
    # Initialize your LLM (Google Generative AI model)
    """
    Check if a user's query indicates an immediate crisis (e.g., self-harm, suicidal thoughts, or emergency).

    Parameters
    ----------
    query : str
        User query to check

    Returns
    -------
    bool
        True if the query indicates a crisis, False otherwise
    """
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash-thinking-exp-01-21",
        temperature=0.2
    )

    # Define the system template with clear instructions for crisis detection
    SYSTEM_TEMPLATE = """
    You are a mental health assistant. Your task is to check if the user's query indicates an immediate crisis (e.g., self-harm, suicidal thoughts, or emergency). 
    If the user's message mentions any form of distress such as feelings of harming themselves, severe emotional pain, or any crisis-related terms, respond with 'True'. 
    Otherwise, respond with 'False'.

    Please consider the following signs of crisis:
    - Suicidal thoughts
    - Self-harm
    - Severe emotional distress
    - Expressions of not wanting to live or harm oneself
    - Any urgent or emergency-related phrases

    <query>
    {query}
    </query>
    """

    # Create the prompt to pass to the LLM
    prompt = ChatPromptTemplate.from_messages([ 
        ("system", SYSTEM_TEMPLATE),
        ("human", "{query}"),  # The user's query as input
    ])

    # Format the prompt with the user's query
    chain_input = prompt.invoke({
        "query": query,
    })

    # Get the response from the model
    response = llm.invoke(chain_input)

    print("Crisis Check Response:", response.content)
    
    # Check the response for crisis indication
    if "True" in response.content:
        return True
    return False

def summarize_msg(conversation):
    # Initialize your LLM (Google Generative AI model)
    """
    Summarize a conversation history into a 10-20 word summary of the user's emotions and key topics.
    
    Parameters
    ----------
    conversation : str
        The conversation history to summarize.
    
    Returns
    -------
    str
        A 10-20 word summary of the user's emotions and key topics.
    """
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash-thinking-exp-01-21",
        temperature=0.2
    )

    # Define the system template with clear instructions for summarization
    SYSTEM_TEMPLATE = """
    You are a helpful mental health assistant. Summarize the conversation below in 10–20 words.
    Focus on the user's emotions and key topics. Prioritize recent messages.
    <conversation>
    {conversation}
    </conversation>
    """


    # Create the prompt to pass to the LLM
    prompt = ChatPromptTemplate.from_messages([ 
        ("system", SYSTEM_TEMPLATE),
        ("human", "{conversation}"),  # The conversation history as input
    ])

    # Format the prompt with the conversation history
    chain_input = prompt.invoke({
        "conversation": conversation,
    })

    # Get the response from the model
    response = llm.invoke(chain_input)

    print("Conversation Summary:", response.content)
    return response.content


def is_llm_working() -> bool:
    try:
        llm = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash-thinking-exp-01-21",
            temperature=0
        )
        test_message = HumanMessage(content="Ping?")
        response = llm([test_message])
        return response.content is not None and len(response.content.strip()) > 0
    except Exception as e:
        print(f"LLM check failed: {e}")
        return False


# # Secondary LLM

# # Load everything only once (global setup)
# intent_labels = ["feeling_anxious", "feeling_sad", "seeking_help", "seeking_fun", "crisis", "general_chat"]
# label2id = {label: id for id, label in enumerate(intent_labels)}
# id2label = {id: label for label, id in label2id.items()}

# # Load the trained intent classifier and tokenizer
# loaded_tokenizer = AutoTokenizer.from_pretrained("./trained_intent_classifier")
# loaded_classifier_model = AutoModelForSequenceClassification.from_pretrained("./trained_intent_classifier")
# loaded_classifier_model.eval()

# # The main function to call
# def get_chatbot_response(user_input: str) -> str:
#     inputs = loaded_tokenizer(user_input, return_tensors="pt", truncation=True, padding=True)
#     with torch.no_grad():
#         outputs = loaded_classifier_model(**inputs)
#     predicted_class = torch.argmax(outputs.logits, dim=-1).item()
#     intent = id2label[predicted_class]

#     if intent == "crisis":
#         return """
# It sounds like you are going through an extremely difficult time and are in distress.
# Please know that you are not alone and there is help available.

# **If you are in immediate danger, please call your local emergency number immediately (e.g., 112, 911).**

# You can also contact the following crisis hotlines in Amaravati, Andhra Pradesh, India:

# * **[Insert Local Suicide Prevention Helpline Number for Amaravati]**
# * **[Insert Link to Mental Health Services in Andhra Pradesh]**

# Please reach out to them right now. Talking to someone can make a difference.
# Your life is important, and help is available.
# """
#     elif intent == "feeling_anxious":
#         return random.choice([
#             "It sounds like you're feeling anxious. Remember to breathe deeply.",
#             "What thoughts are making you feel anxious right now?"
#         ])
#     elif intent == "feeling_sad":
#         return random.choice([
#             "I hear you're feeling down. It's okay to feel your emotions.",
#             "Is there anything specific that's making you feel sad?"
#         ])
#     elif intent == "seeking_help":
#         return random.choice([
#             "It's a sign of strength to seek help. What kind of support are you looking for?",
#             "There are many resources available. How can I guide you?"
#         ])
#     elif intent == "seeking_fun":
#         return random.choice([
#             "Why don't scientists trust atoms? Because they make up everything!",
#             "What do you call a lazy kangaroo? Pouch potato!"
#         ])
#     else:
#         return "I'm here to listen. How can I assist you today?"

# Example use
# print(get_chatbot_response("I feel really anxious and can't sleep at night."))


if __name__ == "__main__":
    # Example query
    # response = chatbot("I am feeling stressed?")
    # print("Response:", response)
    # Example crisis check
    # crisis_response = crisis_check("I am feeling a bit stressed.")
    # print("Crisis Check:", crisis_response)
    # Example conversation summary
    conversation_history = [
    "User: I am feeling really down today because of the exams.",
    "Assistant: I'm sorry to hear that. Can you tell me more about what's bothering you?",
    "User: I just feel overwhelmed with everything i need to study.",
    "Assistant: It's completely normal to feel overwhelmed sometimes. Let's talk about what's on your mind."]
    summary = summarize_msg("\n".join(conversation_history))
    print("Conversation Summary:", summary)