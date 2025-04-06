from pydantic import BaseModel
from typing import List


class PDFUpload(BaseModel):
    filename: str
    content_type: str


class DocumentChunk(BaseModel):
    text: str
    embedding: List[float]
    metadata: dict


class KnowledgeBaseResponse(BaseModel):
    document_id: str
    chunks_processed: int
