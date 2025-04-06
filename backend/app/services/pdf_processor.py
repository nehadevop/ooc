from PyPDF2 import PdfReader
from typing import List
import asyncio
from fastapi import UploadFile
import io

class PDFProcessor:
    def __init__(self, chunk_size: int = 1000):
        self.chunk_size = chunk_size

    async def process(self, file: UploadFile) -> List[str]:
        """
        Process PDF file and return text chunks.
        """
        # Read uploaded file
        contents = await file.read()
        
        # Process in thread pool to avoid blocking
        return await asyncio.get_event_loop().run_in_executor(
            None, self._extract_text, contents
        )

    def _extract_text(self, pdf_content: bytes) -> List[str]:
        chunks = []
        text = ""

        # Create PDF reader object
        pdf_file = io.BytesIO(pdf_content)
        pdf_reader = PdfReader(pdf_file)

        # Extract text from each page
        for page in pdf_reader.pages:
            text += page.extract_text()

            # Create chunks when size threshold is reached
            while len(text) >= self.chunk_size:
                chunks.append(text[:self.chunk_size])
                text = text[self.chunk_size:]

        # Add remaining text as final chunk
        if text:
            chunks.append(text)

        return chunks
