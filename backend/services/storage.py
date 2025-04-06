import os
from typing import List, Dict, Any
import ollama
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


class VectorStore:
    def __init__(self):
        self.llm_client = ollama.Client()
        self.embedding_model = SentenceTransformer(
            "sentence-transformers/all-MiniLM-L6-v2"
        )
        self.documents = []  # Store documents in memory

    async def store_documents(self, documents: List[Dict[str, Any]]) -> int:
        """Store documents with their embeddings"""
        try:
            print(f"Storing {len(documents)} documents")
            for doc in documents:
                # Generate embedding for the document text
                embedding = self.embedding_model.encode(doc["text"])
                print(f"Generated embedding shape: {embedding.shape}")

                # Store document with its embedding
                self.documents.append(
                    {
                        "text": doc["text"],
                        "embedding": embedding,
                        "metadata": doc.get("metadata", {}),
                    }
                )

            print(f"Total documents stored: {len(self.documents)}")
            return len(documents)
        except Exception as e:
            print(f"Error storing documents: {e}")
            return 0

    async def search(self, query: str, k: int = 3) -> List[Dict[str, Any]]:
        """Search for similar documents using embeddings"""
        try:
            # Generate embedding for the query
            query_embedding = self.embedding_model.encode(query)

            if not self.documents:
                return []

            # Get all stored embeddings
            embeddings = np.array([doc["embedding"] for doc in self.documents])

            # Calculate similarities
            similarities = cosine_similarity([query_embedding], embeddings)[0]

            # Get top-k results
            top_k_indices = np.argsort(similarities)[-k:][::-1]

            results = []
            for idx in top_k_indices:
                results.append(
                    {
                        "text": self.documents[idx]["text"],
                        "metadata": self.documents[idx]["metadata"],
                        "score": float(similarities[idx]),
                    }
                )

            return results
        except Exception as e:
            print(f"Error during search: {e}")
            return []
