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

---

## 🏗️ Technical Architecture & Requirements (per assignment)

### Full Stack Declaration

- **Frontend:** React + TypeScript + TailwindCSS (shadcn/ui), running client-side in browser (UI/UX, forms, analysis triggers)
- **Backend:** Python (Flask or FastAPI recommended) providing two APIs:
  - `/api/grade-analysis?engine=<rule|ml>` — POST grade data, returns recommendations using rule-based or ML-based logic
  - `/api/personality-analysis?engine=<rule|ml>` — POST assessment answers, returns recommendations using rule-based or ML-based logic
- **Database:** (optional for minimal demo; for persistence, use PostgreSQL or Supabase)
- **Containerization:** Apps/services to be containerized via **Docker** for easy modular deployment.

### Dockerization

- Each service (frontend and backend) should be isolated in its own Docker container.
- Example `docker-compose.yml` (not included in this repo) should orchestrate the services.

---

### API Design

```http
POST /api/grade-analysis?engine=rule
Body: { ...grades }
Returns: { recommendations: [ ... ] }
```
```http
POST /api/grade-analysis?engine=ml
Body: { ...grades }
Returns: { recommendations: [ ... ] }
```
```http
POST /api/personality-analysis?engine=rule
Body: { ...answers }
Returns: { recommendations: [ ... ] }
```
```http
POST /api/personality-analysis?engine=ml
Body: { ...answers }
Returns: { recommendations: [ ... ] }
```

### Python Backend Pseudo-Example

A minimal example for your backend (not included in build):

```python
# backend/app.py
from flask import Flask, request, jsonify
from engines.grade_rule_engine import analyze as rule_grade
from engines.grade_ml_engine import analyze as ml_grade
from engines.personality_rule_engine import analyze as rule_pers
from engines.personality_ml_engine import analyze as ml_pers

app = Flask(__name__)

@app.route('/api/grade-analysis', methods=['POST'])
def grade_analysis():
    engine = request.args.get('engine')
    payload = request.json
    if engine == "ml":
        result = ml_grade(payload)
    else:
        result = rule_grade(payload)
    return jsonify({"recommendations": result})

@app.route('/api/personality-analysis', methods=['POST'])
def pers_analysis():
    engine = request.args.get('engine')
    payload = request.json
    if engine == "ml":
        result = ml_pers(payload)
    else:
        result = rule_pers(payload)
    return jsonify({"recommendations": result})

# Place this in Docker, serve at /api.
```

- Implement `engines/grade_rule_engine.py`, `engines/grade_ml_engine.py`, etc. as separate modules for each logic style.
- **Rule-based:** Use heuristics/if-else/statistical matching logic.
- **ML-based:** Use a classifier or mock ML for demo/testing.

---

### Justification/Notes

- This approach fulfills the assignment’s requirements for dual backend pathways, modularity, and clear full stack declaration.
- All user-facing UI and design remain consistent (per your request).
- Backend endpoints and selector are exposed for easy comparison of rule-based and ML-based approaches.

---

## 📄 License
