# dhanush
import time
import os
import json
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document
from dotenv import load_dotenv
from uuid import uuid4

def get_Pinecone_vectorstore(index_name: str = "mindcare-resource2") -> PineconeVectorStore:
    """
    Initializes a Pinecone vector store with a specified index and embedding model.
    If the index does not exist, it creates one with the specified configuration.
    """
    # Load environment variables
    load_dotenv()

    # Check if Pinecone API key is set
    if not os.getenv("PINECONE_API_KEY"):
        raise ValueError("Pinecone API key is not set in environment variables.")
        
    # Initialize Pinecone
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))


    # Check if the index already exists
    existing_indexes = [index_info["name"] for index_info in pc.list_indexes()]

    if index_name not in existing_indexes:
        pc.create_index(
            name=index_name,
            dimension=384,  # Adjusted for Hugging Face model
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1"),
            deletion_protection="enabled",  # Defaults to "disabled"
        )
        # Wait for the index to be ready
        while not pc.describe_index(index_name).status["ready"]:
            time.sleep(1)

    # Connect to the index
    index = pc.Index(index_name)

    # Initialize Hugging Face Embeddings
    embedding_model = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2",
        model_kwargs={"device": "cpu"},  # Use "cuda" if GPU is available
        encode_kwargs={"normalize_embeddings": True}
    )

    # Initialize Pinecone Vector Store with Hugging Face Embeddings
    vector_store = PineconeVectorStore(index=index, embedding=embedding_model)

    return vector_store


def clean_metadata(meta):
    """
    Clean the metadata dictionary by removing any key-value pairs where the value is None.

    Args:
        meta (dict): The input metadata dictionary to be cleaned.

    Returns:
        dict: A new dictionary with key-value pairs where values are not None.
    """

    return {k: v for k, v in meta.items() if v is not None}


# === Main Logic ===
if __name__ == "__main__":
    # Load JSON
    with open('resources.json', 'r') as f:
        data = json.load(f)

    # Support for both list or single dict
    if isinstance(data, dict):
        data = [data]

    # Convert each JSON item to a Document
    documents = []
    ids = []

    for item in data:
        item_id = item.get("id") or str(uuid4())
        metadata = {
            "id": item_id,
            "title": item.get("title"),
            "tags": item.get("tags"),
            "link": item.get("link"),
            "type": item.get("type"),
            "accessible": item.get("accessible"),
        }

        doc = Document(
            page_content=item["description"],
            metadata=clean_metadata(metadata)
        )
        documents.append(doc)
        ids.append(item_id)

    # Init vector store and upload
    vector_store = get_Pinecone_vectorstore()
    vector_store.add_documents(documents=documents, ids=ids)

    print("✅ Uploaded rich documents to Pinecone with metadata.")