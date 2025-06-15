from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

import os

app = FastAPI(
    title="EduGuideAI Backend",
    description="Backend for grade-based analysis and personality assessment"
)

# Allow requests from Vite/React dev server and common localhost ports
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------ LLM Helpers ----------------
try:
    from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
    import torch

    # You probably have to specify the path to your local Llama3.2:3b, update path as necessary:
    LLAMA_PATH = os.environ.get("LLAMA_MODEL_PATH", "./llama3.2-3b")

    tokenizer = AutoTokenizer.from_pretrained(LLAMA_PATH)
    model = AutoModelForCausalLM.from_pretrained(LLAMA_PATH, torch_dtype=torch.float16, device_map="auto")
    llm_chat = pipeline("text-generation", model=model, tokenizer=tokenizer, max_new_tokens=512)
except Exception as e:
    llm_chat = None

def generate_llama_question(previous_qas: List[Dict[str, Any]]) -> Dict:
    """
    previous_qas: list of {'question': str, 'answer': str}
    Returns: dict {"question": str, "options": [str, str, ...]}
    """
    prompt = (
        "You are a career guidance AI. "
        "Based on the following previous question-answer pairs, generate the next personality-related multiple choice question. "
        "Provide the next question and a list of 5 short, relevant multiple-choice options. "
        "Strictly return a JSON object: {\"question\": \"...\", \"options\": [\"...\", \"...\", ...]}.\n\n"
        f"Previous QAs: {previous_qas}\n"
        "Next question:"
    )
    if not llm_chat:
        # Fallback for dev/test: return a canned question
        return {
            "question": "Do you prefer working alone or as part of a team?",
            "options": ["Alone", "Small team", "Big team", "It depends", "No preference"]
        }
    output = llm_chat(prompt)[0]['generated_text']
    import re, json
    try:
        match = re.search(r"\{.*\}", output, re.DOTALL)
        json_out = json.loads(match.group())
        return json_out
    except:
        # fallback on errors
        return {
            "question": "What motivates you the most in your studies?",
            "options": ["Personal growth", "Collaboration", "Achievement", "Creativity", "Helping others"]
        }

def suggest_majors_from_llama(qas: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    qas: list of {'question': str, 'answer': str}
    Returns: list of {"major": "...", "match": ..., "description": "...", "traits": [...]}
    """
    prompt = (
        "You are a career guidance AI. Given the following 6 question-answer pairs from a personality assessment, "
        "suggest up to 3 best-fit university majors for the student. For each, give: major name, match (out of 100), "
        "1-sentence description, and 3 bullet-point personality trait matches. "
        "Strictly respond as a JSON list like:\n"
        "[{\"major\": \"Engineering\", \"match\": 93, \"description\": \"...\", \"traits\": [\"..\",\"..\",\"..\"]}, ...]\n"
        f"QAs: {qas}"
    )
    if not llm_chat:
        # fallback for dev/test
        return [
            {
                "major": "Engineering",
                "match": 93,
                "description": "Design and build solutions using technical and analytical skills.",
                "traits": ["Analytical", "Technical aptitude", "Problem-solving"]
            },
            {
                "major": "Psychology",
                "match": 87,
                "description": "Help people understand and improve mental processes.",
                "traits": ["Empathy", "Communication", "Insightful"]
            }
        ]
    output = llm_chat(prompt)[0]['generated_text']
    import re, json
    try:
        match = re.search(r"\[.*\]", output, re.DOTALL)
        majors = json.loads(match.group())
        return majors
    except:
        # fallback
        return [
            {
                "major": "Business Administration",
                "match": 80,
                "description": "Lead and manage organizations.",
                "traits": ["Leadership", "Strategic thinking", "Collaboration"]
            }
        ]

# ---------- GRADE BASED ANALYSIS RULE-BASED AGENT ----------

class GradesRequest(BaseModel):
    baccalaureateClass: str
    grades: Dict[str, float]

class MajorRecommendation(BaseModel):
    major: str
    match: float
    description: str
    reasons: List[str]

@app.post("/api/grades-analysis", response_model=List[MajorRecommendation])
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

    # Engineering
    if grade_percentages.get("mathematics",0) >= 75 and grade_percentages.get("physics",0) >= 70 and stemAvg >= 72:
        engineeringScore = (stemAvg + (grade_percentages.get("mathematics",0) - 70) * 0.3) * get_class_bonus("Engineering")
        recommendations.append(MajorRecommendation(
            major="Engineering",
            match=min(95, engineeringScore),
            description="Design and build solutions to technical problems using mathematics and science.",
            reasons=[
                f"Strong mathematics foundation ({grades.get('mathematics',0)}/20)",
                f"Excellent physics understanding ({grades.get('physics',0)}/20)",
                f"STEM subjects average: {round(stemAvg)}%",
                "Perfect match for your General Sciences background" if baccalaureate_class=="general-sciences" else ""
            ]
        ))

    # Computer Science
    if grade_percentages.get("mathematics",0) >= 70 and (grade_percentages.get("physics",0) >= 65 or grade_percentages.get("economics",0) >= 65):
        csScore = (grade_percentages.get("mathematics",0)*0.6 + grade_percentages.get("physics",0)*0.25 + grade_percentages.get("english",0)*0.15) * get_class_bonus("Computer Science")
        if csScore >= MIN_THRESHOLD:
            recommendations.append(MajorRecommendation(
                major="Computer Science",
                match=min(92, csScore),
                description="Develop software, algorithms, and computing systems.",
                reasons=[
                    f"Strong mathematical reasoning ({grades.get('mathematics',0)}/20)",
                    "Logical problem-solving abilities",
                    "Physics foundation supports computational thinking" if grade_percentages.get("physics",0) >= 65 else "Economics background aids algorithmic thinking",
                    "Ideal for your technical background" if baccalaureate_class=="general-sciences" else ""
                ]
            ))
    # Medicine
    if grade_percentages.get("biology",0) >= 75 and grade_percentages.get("chemistry",0) >= 70 and bioMedAvg >= 72:
        medScore = (bioMedAvg + (grade_percentages.get("biology",0) - 70)*0.4) * get_class_bonus("Medicine")
        recommendations.append(MajorRecommendation(
            major="Medicine",
            match=min(97, medScore),
            description="Study human health, disease prevention, and medical treatment.",
            reasons=[
                f"Outstanding biology performance ({grades.get('biology',0)}/20)",
                f"Strong chemistry foundation ({grades.get('chemistry',0)}/20)",
                f"Medical sciences average: {round(bioMedAvg)}%",
                "Perfect alignment with your Life Sciences track" if baccalaureate_class=="life-sciences" else ""
            ]
        ))

    # Pharmacy
    if grade_percentages.get("chemistry",0) >= 75 and grade_percentages.get("biology",0) >= 65 and grade_percentages.get("mathematics",0) >= 60:
        pharmScore = (grade_percentages.get("chemistry",0)*0.5 + grade_percentages.get("biology",0)*0.3 + grade_percentages.get("mathematics",0)*0.2) * get_class_bonus("Pharmacy")
        if pharmScore >= MIN_THRESHOLD:
            recommendations.append(MajorRecommendation(
                major="Pharmacy",
                match=min(90, pharmScore),
                description="Study drug development, medication management, and pharmaceutical sciences.",
                reasons=[
                    f"Excellent chemistry mastery ({grades.get('chemistry',0)}/20)",
                    "Strong biological sciences foundation",
                    "Mathematical skills for pharmaceutical calculations",
                    "Great fit for your scientific background" if baccalaureate_class=="life-sciences" else ""
                ]
            ))

    # Business Administration
    if grade_percentages.get("economics",0) >= 70 and businessAvg >= 68:
        businessScore = (businessAvg + (grade_percentages.get("economics",0)-65)*0.3) * get_class_bonus("Business Administration")
        recommendations.append(MajorRecommendation(
            major="Business Administration",
            match=min(88, businessScore),
            description="Learn management, finance, and organizational leadership.",
            reasons=[
                f"Strong economics understanding ({grades.get('economics',0)}/20)",
                "Good mathematical skills for financial analysis",
                "Language skills for business communication",
                "Excellent match for your academic background" if baccalaureate_class=="sociology-economics" else ""
            ]
        ))

    # Law
    if grade_percentages.get("arabic",0) >= 70 and grade_percentages.get("history",0) >= 68 and grade_percentages.get("philosophy",0) >= 65:
        lawScore = (grade_percentages.get("arabic",0)*0.4 + grade_percentages.get("history",0)*0.3 + grade_percentages.get("philosophy",0)*0.3) * get_class_bonus("Law")
        if lawScore >= MIN_THRESHOLD:
            recommendations.append(MajorRecommendation(
                major="Law",
                match=min(85, lawScore),
                description="Study legal systems and advocate for justice.",
                reasons=[
                    "Strong Arabic language skills for legal documents",
                    "Historical knowledge for legal precedents",
                    "Philosophical thinking for legal analysis",
                    "Perfect for your humanities background" if baccalaureate_class=="literature-humanities" else ""
                ]
            ))

    # Literature & Languages
    if languagesAvg >= 72 and (grade_percentages.get("arabic",0) >= 70 or grade_percentages.get("english",0) >= 70):
        litScore = (languagesAvg + (max(grade_percentages.get("arabic",0), grade_percentages.get("english",0)) - 70)*0.2) * get_class_bonus("Literature & Languages")
        recommendations.append(MajorRecommendation(
            major="Literature & Languages",
            match=min(85, litScore),
            description="Study languages, literature, and communication.",
            reasons=[
                f"Strong language abilities (Avg: {round(languagesAvg)}%)",
                "Excellent communication skills",
                "Philosophy enhances literary analysis" if grade_percentages.get("philosophy",0) >= 65 else "Strong foundation in language studies",
                "Ideal for your literary background" if baccalaureate_class=="literature-humanities" else ""
            ]
        ))

    # Psychology
    if grade_percentages.get("sociology",0) >= 70 and grade_percentages.get("philosophy",0) >= 65 and socialAvg >= 68:
        psychScore = (grade_percentages.get("sociology",0)*0.4 + grade_percentages.get("philosophy",0)*0.3 + grade_percentages.get("biology",0)*0.2 + grade_percentages.get("english",0)*0.1) * get_class_bonus("Psychology")
        if psychScore >= MIN_THRESHOLD:
            recommendations.append(MajorRecommendation(
                major="Psychology",
                match=min(83, psychScore),
                description="Study human behavior, mental processes, and therapeutic techniques.",
                reasons=[
                    f"Strong understanding of human behavior (Sociology: {grades.get('sociology',0)}/20)",
                    "Philosophical thinking for psychological analysis",
                    "Biology background supports neuropsychology" if grade_percentages.get("biology",0) >= 60 else "Strong social science foundation",
                    "Great match for your social sciences track" if baccalaureate_class=="sociology-economics" else ""
                ]
            ))

    # Economics (Specialized)
    if grade_percentages.get("economics",0) >= 75 and grade_percentages.get("mathematics",0) >= 70:
        econScore = (grade_percentages.get("economics",0)*0.5 + grade_percentages.get("mathematics",0)*0.3 + grade_percentages.get("philosophy",0)*0.2) * get_class_bonus("Economics")
        if econScore >= MIN_THRESHOLD:
            recommendations.append(MajorRecommendation(
                major="Economics",
                match=min(87, econScore),
                description="Analyze economic systems, markets, and financial behavior.",
                reasons=[
                    f"Outstanding economics performance ({grades.get('economics',0)}/20)",
                    "Strong mathematical foundation for economic modeling",
                    "Philosophical thinking enhances economic theory" if grade_percentages.get("philosophy",0) >= 65 else "Analytical skills for market analysis",
                    "Perfect for your economics background" if baccalaureate_class=="sociology-economics" else ""
                ]
            ))

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


# ---------- LLM-based Personality Assessment (Adaptive Q/A) ----------

class NextQuestionRequest(BaseModel):
    previous_qas: List[Dict[str, str]] = []

class NextQuestionResponse(BaseModel):
    question: str
    options: List[str]

@app.post("/api/personality-questions", response_model=NextQuestionResponse)
def get_next_question(req: NextQuestionRequest):
    # For step N, req.previous_qas will have 0 to N-1 Q/A pairs.
    q = generate_llama_question(req.previous_qas)
    return NextQuestionResponse(**q)

class RecommendMajorsRequest(BaseModel):
    qas: List[Dict[str, str]]  # List of 6 Q/A dicts

class AssessmentResult(BaseModel):
    major: str
    match: float
    description: str
    traits: List[str]

@app.post("/api/personality-recommend", response_model=List[AssessmentResult])
def recommend_majors(req: RecommendMajorsRequest):
    results = suggest_majors_from_llama(req.qas)
    # Convert possible float->int and ensure keys are present
    recs = []
    for r in results:
        recs.append(AssessmentResult(
            major=r["major"],
            match=float(r["match"]),
            description=r["description"],
            traits=r.get("traits", [])
        ))
    return recs

# Health probe
@app.get("/")
def root():
    return {"status": "ok", "message": "EduGuideAI backend running."}
