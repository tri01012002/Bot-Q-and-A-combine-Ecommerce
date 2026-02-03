import os
import glob
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

# Config
DATA_PATH = "../data"
VECTOR_DB_PATH = "faiss_index"
EMBEDDING_MODEL_NAME = "dangvantuan/vietnamese-embedding"

def load_documents():
    documents = []
    # Load Text files
    for file_path in glob.glob(os.path.join(DATA_PATH, "*.txt")):
        print(f"Loading {file_path}")
        loader = TextLoader(file_path, encoding='utf-8')
        documents.extend(loader.load())
    
    # Load PDF files
    for file_path in glob.glob(os.path.join(DATA_PATH, "*.pdf")):
        print(f"Loading {file_path}")
        loader = PyPDFLoader(file_path)
        documents.extend(loader.load())
        
    return documents

def split_documents(documents):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )
    texts = text_splitter.split_documents(documents)
    print(f"Split {len(documents)} documents into {len(texts)} chunks.")
    return texts

def main():
    print("Starting ingestion...")
    documents = load_documents()
    if not documents:
        print("No documents found in data/")
        return

    texts = split_documents(documents)

    print(f"Loading embedding model: {EMBEDDING_MODEL_NAME}")
    embeddings = HuggingFaceEmbeddings(model_name=EMBEDDING_MODEL_NAME)

    print("Creating vector store...")
    db = FAISS.from_documents(texts, embeddings)
    
    db.save_local(VECTOR_DB_PATH)
    print(f"Vector store saved to {VECTOR_DB_PATH}")

if __name__ == "__main__":
    main()
