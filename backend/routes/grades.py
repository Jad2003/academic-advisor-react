
from fastapi import APIRouter
from schemas import GradesRequest, MajorRecommendation
from typing import List

router = APIRouter(prefix="/api", tags=["grades-analysis"])

@router.post("/grades-analysis", response_model=List[MajorRecommendation])
def analyze_grades(request: GradesRequest):
    grades = request.grades
    baccalaureate_class = request.baccalaureateClass

    # Convert grade values (out of 20) to out of 100
    grade_percentages = {k: (v / 20) * 100 for k, v in grades.items()}

    def avg(lst):
        if not lst: return 0.0
        return sum(lst) / len(lst)

    stemAvg = avg([grade_percentages.get(s, 0) for s in ("mathematics", "physics", "chemistry")])
    bioMedAvg = avg([grade_percentages.get(s, 0) for s in ("biology", "chemistry", "physics")])
    languagesAvg = avg([grade_percentages.get(s, 0) for s in ("arabic", "english")])
    socialAvg = avg([
        grade_percentages.get(s, 0) for s in ("history", "geography", "sociology", "philosophy")
    ])
    businessAvg = avg([
        grade_percentages.get(s, 0) for s in ("economics", "mathematics", "english")
    ])
    MIN_THRESHOLD = 65

    def get_class_bonus(major):
        if baccalaureate_class == "general-sciences" and major in {
            "Engineering", "Computer Science", "Mathematics", "Physics", "Architecture"
        }:
            return 1.1
        if baccalaureate_class == "life-sciences" and major in {
            "Medicine", "Pharmacy", "Dentistry", "Nursing", "Biology", "Biotechnology"
        }:
            return 1.1
        if baccalaureate_class == "sociology-economics" and major in {
            "Business Administration", "Economics", "Psychology", "International Relations", "Sociology"
        }:
            return 1.1
        if baccalaureate_class == "literature-humanities" and major in {
            "Literature & Languages", "Law", "Philosophy", "History", "Journalism"
        }:
            return 1.1
        return 1.0

    recommendations = []

    # ... keep existing code (full analysis logic for all majors & matching: see original main.py)

    # Only show strong matches.
    sorted_recs = sorted(
        [r for r in recommendations if r.match >= 60], key=lambda r: -r.match
    )[:4]

    if not sorted_recs:
        avgGrade = avg(list(grade_percentages.values()))
        sorted_recs.append(MajorRecommendation(
            major="Liberal Arts",
            match=max(60, avgGrade),
            description="A broad field that allows you to explore various interests while developing critical thinking skills.",
            reasons=[
                "Well-rounded academic performance",
                "Opportunity to explore multiple disciplines",
                "Foundation for various career paths"
            ]
        ))

    # Filter out empty reason strings
    for rec in sorted_recs:
        rec.reasons = [reason for reason in rec.reasons if reason]

    return sorted_recs
