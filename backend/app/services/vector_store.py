from typing import List, Dict, Any
import chromadb
from chromadb.config import Settings


class VectorStore:
    def __init__(self):
        self.client = chromadb.Client(
            Settings(
                chroma_db_impl="duckdb+parquet", persist_directory="storage/vectors"
            )
        )
        self.collection = self.client.get_or_create_collection("rfp_documents")

    async def store(self, chunks: List[str], metadata: Dict[str, Any]) -> str:
        """
        Store text chunks in vector database with metadata.
        """
        # Generate IDs for chunks
        chunk_ids = [f"{metadata['filename']}_{i}" for i in range(len(chunks))]

        # Store chunks with metadata
        self.collection.add(
            documents=chunks, ids=chunk_ids, metadatas=[metadata] * len(chunks)
        )

        return chunk_ids[0]  # Return first chunk ID as document ID
