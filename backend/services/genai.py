from google import genai
import os


class GenAIService:
    def __init__(self):
        self.client = genai.Client(os.getenv("GOOGLE_API_KEY"))

    def extract_requirements(self, text: str) -> Dict:
        prompt = f"""Analyze this RFP text and extract structured requirements:
        {text}
        """
        return self._structured_output(prompt)

    def identify_risk_clauses(self, text: str) -> List[Dict]:
        prompt = f"""Identify risky contract clauses in:
        {text}
        """
        return self._structured_output(prompt)

    def _structured_output(self, prompt: str) -> Any:
        response = self.client.generate_content(
            model="gemini-pro", contents=prompt, response_mime_type="application/json"
        )
        return json.loads(response.text)
