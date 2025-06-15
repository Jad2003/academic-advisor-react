import os
os.environ["LLAMA_MODEL_PATH"] = r"C:\Users\user\.ollama\models"

try:
    from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
    import torch

    LLAMA_PATH = os.environ.get("LLAMA_MODEL_PATH", r"C:\Users\user\.ollama\models")
    tokenizer = AutoTokenizer.from_pretrained(LLAMA_PATH)

    # Detect if CUDA (GPU) is available, else use CPU mode
    if torch.cuda.is_available():
        model = AutoModelForCausalLM.from_pretrained(
            LLAMA_PATH, torch_dtype=torch.float16, device_map="auto"
        )
    else:
        model = AutoModelForCausalLM.from_pretrained(LLAMA_PATH)
    llm_chat = pipeline("text-generation", model=model, tokenizer=tokenizer, max_new_tokens=512)
except Exception as e:
    print(f"Error loading Llama model from {os.environ['LLAMA_MODEL_PATH']}: {e}")
    llm_chat = None

def generate_llama_question(previous_qas):
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
        return {
            "question": "What motivates you the most in your studies?",
            "options": ["Personal growth", "Collaboration", "Achievement", "Creativity", "Helping others"]
        }

def suggest_majors_from_llama(qas):
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
        return [
            {
                "major": "Business Administration",
                "match": 80,
                "description": "Lead and manage organizations.",
                "traits": ["Leadership", "Strategic thinking", "Collaboration"]
            }
        ]
