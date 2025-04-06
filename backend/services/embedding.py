from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_huggingface import HuggingFaceEmbeddings  # Updated import
import os


class PDFProcessor:
    def __init__(self):
        self.embedder = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-mpnet-base-v2"
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000, chunk_overlap=200
        )

    def process_pdf(self, file_path: str):
        """Extract text and create embeddings from PDF"""
        loader = PyPDFLoader(file_path)
        pages = loader.load_and_split(self.text_splitter)

        texts = [page.page_content for page in pages]
        embeddings = self.embedder.embed_documents(texts)

        return [
            {
                "text": text,
                "embedding": embedding,
                "metadata": {"source": os.path.basename(file_path), "page": idx + 1},
            }
            for idx, (text, embedding) in enumerate(zip(texts, embeddings))
        ]
