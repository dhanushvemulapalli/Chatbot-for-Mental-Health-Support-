from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage
from dotenv import load_dotenv
from Pinecone_conn import get_Pinecone_vectorstore
import re
import time
from Sentiment_Anal import sentiment_analysis

load_dotenv()

# Format documents manually
def format_document(doc):
    return f"Title: {doc.metadata.get('title', 'No title')}\nLink: {doc.metadata.get('link', 'No link')}\nContent: {doc.page_content}"

def parse_response_to_json(response_text: str):
    # Basic extraction: find links and surrounding context
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

def chatbot(query):
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
        "messages": [HumanMessage(content=query)],  # Send the query with sentiment info
        "sentiment": sentiment_prompt
    })

    # Final LLM call
    start_llm = time.time()
    response = llm.invoke(chain_input)
    end_llm = time.time()
    print(f"⏱️ LLM time: {end_llm - start_llm:.2f} seconds")
    print(f"🔁 Total time: {end_llm - start_retrieval:.2f} seconds")

    print("\n💬 Answer:\n", response.content)
    structured_output = parse_response_to_json(response.content)
    print(structured_output)
    return structured_output

if __name__ == "__main__":
    # Example query
    response = chatbot("I am feeling stressed?")
    print("Response:", response)
