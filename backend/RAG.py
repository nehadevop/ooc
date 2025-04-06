import ollama
from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.utils import embedding_functions
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from pdfExtractor import extractText
import logging
import os
from ChatModel import getPrompt
import math

class DocumentManager:
    def __init__(self):
        self.client = ollama.Client()
        self.embeddingModel = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
        self.chromaClient = chromadb.Client()
        self.collection = self.getOrCreateCollection()
        self.latest_category = None

    def getOrCreateCollection(self, name="ragDocuments"):
        existing_collections = self.chromaClient.list_collections()
        for col in existing_collections:
            if col.name == name:
                return self.chromaClient.get_collection(name=name)
        return self.chromaClient.create_collection(
            name=name, 
            embedding_function=embedding_functions.SentenceTransformerEmbeddingFunction()
        )

    def loadDocument(self, file_path):
        return extractText(file_path)

    def chunkText(self, text, chunk_size=200):
        words = text.split()
        return [' '.join(words[i:i + chunk_size]) for i in range(0, len(words), chunk_size)]

    def addDocumentToVectorDb(self, doc_id, text, batch_size=166):
        # Split text into chunks
        chunks = self.chunkText(text)
        
        # Process chunks in batches
        for batch_start in range(0, len(chunks), batch_size):
            batch_end = min(batch_start + batch_size, len(chunks))
            batch_chunks = chunks[batch_start:batch_end]
            
            # Generate embeddings for the batch
            batch_embeddings = self.embeddingModel.encode(batch_chunks)
            
            # Prepare batch IDs
            batch_ids = [f"{doc_id}chunk{i}" for i in range(batch_start, batch_end)]
            
            # Add batch to collection
            self.collection.add(
                documents=batch_chunks,
                embeddings=batch_embeddings.tolist(),
                ids=batch_ids
            )
            
        print(f"Document '{doc_id}' has been added to the vector database with {len(chunks)} chunks in {math.ceil(len(chunks)/batch_size)} batches.")

        

    def retrieveRelevantChunks(self, query, topK=4):
        try:
            queryEmbedding = self.embeddingModel.encode([query])[0]

            records = self.collection.get(include=["embeddings", "documents"])

            if len(records["embeddings"]) == 0 or len(records["documents"]) == 0:
                print("No documents are present in the vector database. refersh the page.")
                return []
            
            embeddings = np.array(records["embeddings"])
            similarities = cosine_similarity([queryEmbedding], embeddings)[0]
            topIndices = np.argsort(similarities)[-topK:][::-1]
            topChunks = [records["documents"][idx] for idx in topIndices]

            return topChunks
            
            # return [records["documents"][idx] for idx in top_indices]
            
        except Exception as e:
            logging.error(f"Error retrieving chunks: {e}")
            return []

    def generateResponse(self, conversationHistory, query ,category):
        
        relevantChunks = self.retrieveRelevantChunks(query)
        
        combinedText = ' '.join(relevantChunks)

        if not combinedText:
            combinedText = "generally asking"

        logging.info(query,conversationHistory)


        messages = getPrompt(conversationHistory,combinedText, query, category)

        response = self.client.chat(model="SWOCBOT", messages=messages)['message']['content']

        return response
    
    def setLatestCategory(self, category):
        self.latest_category = category

    def categoryExists(self, category):
        return self.latest_category == category

    def clearCollection(self, batch_size=166):
        try:
            records = self.collection.get()
            if not records["ids"]:
                logging.info("Collection is already empty")
                return
            
            # Process deletion in batches
            ids = records["ids"]
            for batch_start in range(0, len(ids), batch_size):
                batch_end = min(batch_start + batch_size, len(ids))
                batch_ids = ids[batch_start:batch_end]
                
                # Delete batch of documents
                self.collection.delete(ids=batch_ids)
                logging.info(f"Deleted batch of {len(batch_ids)} documents")
            
            logging.info(f"Successfully deleted all {len(ids)} documents from collection")
            self.latest_category = None
                
        except Exception as e:
            logging.error(f"Error clearing collection: {e}")
            raise