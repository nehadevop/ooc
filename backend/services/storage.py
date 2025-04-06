from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
import os
import uuid
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()


class VectorStore:
    def __init__(self):
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-mpnet-base-v2"
        )
        self.persist_directory = "db"
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000, chunk_overlap=200
        )

    async def store_documents(self, documents):
        """Store documents in vector database"""
        try:
            texts = [doc["text"] for doc in documents]
            metadatas = [doc["metadata"] for doc in documents]
            embeddings = self.embeddings.embed_documents(texts)

            vectordb = Chroma.from_documents(
                documents=documents,
                embedding=self.embeddings,
                persist_directory=self.persist_directory,
            )
            vectordb.persist()
            return len(documents)
        except Exception as e:
            print(f"Error storing documents: {e}")
            return 0

    async def search(self, query, k=3):
        """Search vector database for relevant documents"""
        try:
            vectordb = Chroma(
                persist_directory=self.persist_directory,
                embedding_function=self.embeddings,
            )
            docs = vectordb.similarity_search(query, k=k)
            return [doc.page_content for doc in docs]
        except Exception as e:
            print(f"Error during search: {e}")
            return []
