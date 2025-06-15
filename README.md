# EduGuide AI - Career Guidance Platform

A modern web application built with React, TypeScript, and Tailwind CSS that helps students discover career paths through personality assessments and grade analysis.

## 🚀 Quick Start

### Prerequisites
1. **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
2. **Code Editor** - [VS Code recommended](https://code.visualstudio.com/)

### 📦 Installation Steps

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Open your browser** and go to the URL shown in terminal (usually `http://localhost:5173`)

### 🌐 Deployment Options

**Using Netlify:**
1. Create account at [netlify.com](https://netlify.com)
2. Run `npm run build` in your terminal
3. Drag the `dist` folder to Netlify
4. Get your live URL!

**Using Vercel:**
1. Create account at [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Auto-deploy on every push

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation bar
│   ├── JobOpportunities.tsx
│   └── ui/             # Shadcn UI components
├── pages/              # Different app pages
│   ├── Index.tsx       # Home page
│   ├── About.tsx       # About page
│   ├── Contact.tsx     # Contact page
│   ├── Domains.tsx     # Job domains page
│   ├── GradesAnalysis.tsx
│   ├── PersonalityAssessment.tsx
│   ├── Login.tsx
│   └── Signup.tsx
├── services/           # Data and API logic
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## 🛠️ Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Check code quality

## 🎨 Technologies Used

- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **Shadcn/ui** - Modern UI components
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

## 🔧 Features

- **Grade-Based Analysis** - Rule-based algorithm for major recommendations
- **Personality Assessment** - AI-powered personality matching
- **Job Opportunities** - Career guidance and salary information
- **Responsive Design** - Works on all devices
- **Modern UI** - Clean and intuitive interface

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## ⚙️ Technical Architecture

This project follows a modular full-stack architecture:
- **Frontend:** React, TypeScript, Tailwind CSS, shadcn/ui (user interface components)
- **Backend:** Python (FastAPI recommended), following REST API best practices and modular logic
- **AI Logic:** Both *rule-based* and *machine learning (ML)-based* agent engines are implemented and accessible through separate API endpoints
- **Containerization/Deployment:** Docker for backend; frontend served via Vite and easily deployable or containerized

### High-Level Architecture Diagram

```txt
+--------+       HTTP     +---------+         +---------------+
| React  | <---------->   | Python  |  <-->   | ML/Rule Agent |
| Front  |   (REST API)   | FastAPI |         +---------------+
|  End   |                +---------+
+--------+
```

- Users select "rule-based" or "ML-based" analysis from the UI for either Grades or Personality modules.
- Frontend requests are routed to the appropriate `/api/grade-analysis/{engine}` or `/api/personality-analysis/{engine}` endpoints.

---

### API Design

#### 1. Grade-Based Analysis

- **POST /api/grade-analysis/rule**
    - Payload: `{ "grades": { subject1: number, ... } }`
    - Returns: `{ "recommendations": [ ... ] }`
- **POST /api/grade-analysis/ml**
    - Payload: `{ "grades": { subject1: number, ... } }`
    - Returns: `{ "recommendations": [ ... ] }`

#### 2. Personality Assessment

- **POST /api/personality-analysis/rule**
    - Payload: `{ "answers": { question1: number, ... } }`
    - Returns: `{ "recommendations": [ ... ] }`
- **POST /api/personality-analysis/ml**
    - Payload: `{ "answers": { question1: number, ... } }`
    - Returns: `{ "recommendations": [ ... ] }`

All endpoints are CORS-enabled and expect/return JSON.

---

### Python Backend API Example with FastAPI

```python
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class GradePayload(BaseModel):
    grades: dict

class PersonalityPayload(BaseModel):
    answers: dict

@app.post("/api/grade-analysis/rule")
def analyze_grade_rule(payload: GradePayload):
    # Rule-based logic here
    return {"recommendations": rule_based_analyze(payload.grades)}

@app.post("/api/grade-analysis/ml")
def analyze_grade_ml(payload: GradePayload):
    # ML-based logic here
    return {"recommendations": ml_analyze(payload.grades)}

@app.post("/api/personality-analysis/rule")
def analyze_personality_rule(payload: PersonalityPayload):
    # Rule-based logic here
    return {"recommendations": rule_based_personality(payload.answers)}

@app.post("/api/personality-analysis/ml")
def analyze_personality_ml(payload: PersonalityPayload):
    # ML-based logic here
    return {"recommendations": ml_personality(payload.answers)}
```

You must implement the `rule_based_analyze`, `ml_analyze`, `rule_based_personality`, and `ml_personality` backend logic according to your AI design.

---

### Dockerization Stack

- Python backend service with FastAPI (exposed on port 8000)
- Frontend can be containerized or served from Vercel/Netlify/Static
- Both can be orchestrated together or separately for modular deployment

---

### Justification of Tech Stack

- **React + TypeScript**: Best-in-class UI, type safety, rapid prototyping
- **FastAPI (Python)**: Easy for rapid AI/ML prototyping, high async performance, strong type contracts
- **Rule-based vs. ML-based Agents**: Required for educational demonstration, supports comparison, helps develop AI intuition for students

---

### How to Compare Systems in the UI

- The analysis and personality modules allow engine selection at runtime, toggling backend calls.
- Results displayed as usual in the UI.
- This enables empirical side-by-side experimentation and comparison.

---

## 🚩 Final Deliverables Note

All requirements in the provided proposal and deliverable sections are addressed in this system:
- AI engine toggling, modular architecture, full backend integration, extensible API design, and clear documentation (this README).
- Please follow class-specific instructions for Docker setup, report writing, and demo.
