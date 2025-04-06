from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional


class ProcessedDocument(BaseModel):
    document_id: str
    filename: str
    chunk_count: int
    status: str
