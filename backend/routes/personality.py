
from fastapi import APIRouter
from schemas import (
    NextQuestionRequest, NextQuestionResponse,
    RecommendMajorsRequest, AssessmentResult
)
from llm import generate_llama_question, suggest_majors_from_llama
from typing import List

router = APIRouter(prefix="/api", tags=["personality"])

@router.post("/personality-questions", response_model=NextQuestionResponse)
def get_next_question(req: NextQuestionRequest):
    q = generate_llama_question(req.previous_qas)
    return NextQuestionResponse(**q)

@router.post("/personality-recommend", response_model=List[AssessmentResult])
def recommend_majors(req: RecommendMajorsRequest):
    results = suggest_majors_from_llama(req.qas)
    recs = []
    for r in results:
        recs.append(AssessmentResult(
            major=r["major"],
            match=float(r["match"]),
            description=r["description"],
            traits=r.get("traits", [])
        ))
    return recs
