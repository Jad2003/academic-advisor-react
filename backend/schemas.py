
from pydantic import BaseModel
from typing import List, Dict, Any

# ----------- Grade analysis ------------

class GradesRequest(BaseModel):
    baccalaureateClass: str
    grades: Dict[str, float]

class MajorRecommendation(BaseModel):
    major: str
    match: float
    description: str
    reasons: List[str]

# ----------- LLM-based Personality Assessment ------------

class NextQuestionRequest(BaseModel):
    previous_qas: List[Dict[str, str]] = []

class NextQuestionResponse(BaseModel):
    question: str
    options: List[str]

class RecommendMajorsRequest(BaseModel):
    qas: List[Dict[str, str]]  # List of 6 Q/A dicts

class AssessmentResult(BaseModel):
    major: str
    match: float
    description: str
    traits: List[str]
