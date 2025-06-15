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

## 🐍 Backend Development

A Python FastAPI backend powers grade-based and personality assessments.

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

- The backend will run at `http://localhost:8000`

#### Endpoints

- `POST /api/grades-analysis`  
  Params:  
    ```json
    {
      "baccalaureateClass": "general-sciences",
      "grades": {"arabic": 15, "mathematics": 19, ...}
    }
    ```
  Returns:  
    List of recommended majors: `[{"major": "Engineering", "match": 90, ...}, ...]`

- `POST /api/personality-assessment`  
  Params:  
    ```json
    {
      "answers": {
        "q1_interest": 0,
        "q2_environment": 1,
        ...
      },
      "engine": "rule" | "ml"
    }
    ```
  Returns:  
    List of major recommendations.

### LLM/ML Integration

For the `"ml"` engine in personality assessment, connect a local LLAMA/Mistral model (not included here—add your integration in the `/api/personality-assessment` handler).

See `backend/main.py` for a stub where the LLM call should be placed.
