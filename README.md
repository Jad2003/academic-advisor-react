
# EduGuide AI - Autonomous AI Agent for Educational Enhancement

A fully-functional, Dockerized AI Agent with complete frontend and backend stack. This system operates autonomously, making intelligent decisions and executing tasks using dual AI approaches: traditional rule-based logic and modern machine learning.

## 🎯 Project Overview

**Domain:** Educational Enhancement  
**Type:** Autonomous AI Agent  
**Approach:** Dual AI Implementation (Rule-based + Machine Learning)

### Key Features
- **Autonomous Decision Making:** Goal-driven AI that operates independently
- **Dual AI Engines:** Rule-based logical decisions + ML classification/prediction
- **Educational Focus:** Adaptive learning recommender and automated feedback
- **Full-Stack Architecture:** Complete frontend/backend with secure interactions
- **Docker Deployment:** Modular, containerized deployment ready

## 🚀 Quick Start

### Prerequisites
1. **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
2. **Docker** (for containerized deployment) - [Download here](https://docker.com/)
3. **Code Editor** - [VS Code recommended](https://code.visualstudio.com/)

### 📦 Local Development

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Open your browser** and go to `http://localhost:5173`

### 🐳 Docker Deployment

#### Option 1: Docker Build & Run
```bash
# Build the Docker image
docker build -t eduguide-ai .

# Run the container
docker run -p 3000:3000 eduguide-ai

# Access at http://localhost:3000
```

#### Option 2: Docker Compose
```bash
# Start with Docker Compose
docker-compose up --build

# Access at http://localhost:3000
```

#### Option 3: Save for USB Distribution
```bash
# Build and save Docker image
docker build -t eduguide-ai .
docker save eduguide-ai > eduguide-ai.tar

# Load on target machine
docker load < eduguide-ai.tar
docker run -p 3000:3000 eduguide-ai
```

## 🧠 AI Implementation

### Rule-Based AI Engine
- **Technology:** Logical rules, decision trees, heuristics
- **Function:** Grade analysis using Lebanese Baccalaureate system
- **Strengths:** Precise, explainable, deterministic decisions
- **Use Case:** Academic performance analysis and major recommendations

### Machine Learning Engine  
- **Technology:** Classification, clustering, prediction algorithms
- **Function:** Personality assessment and adaptive learning
- **Strengths:** Pattern recognition, personalization, continuous learning
- **Use Case:** Behavioral analysis and personalized recommendations

### Autonomous Agent Features
- **Goal-Driven Behavior:** Sets and pursues educational objectives
- **Decision Making:** Makes autonomous choices without human intervention
- **Task Execution:** Automatically implements recommendations and solutions
- **Explainable AI:** Provides reasoning for all decisions (XAI compliance)
- **Continuous Learning:** Improves recommendations based on student feedback

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation bar
│   ├── AIAgentDemo.tsx # Autonomous AI demonstration
│   ├── JobOpportunities.tsx
│   └── ui/             # Shadcn UI components
├── services/           # AI logic and backend services
│   ├── aiAgentService.ts    # Autonomous AI agent
│   └── jobDataService.ts    # Career data service
├── pages/              # Application pages
│   ├── Index.tsx       # Home with AI agent showcase
│   ├── GradesAnalysis.tsx   # Rule-based AI
│   ├── PersonalityAssessment.tsx # ML-based AI
│   └── ...
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## 🛠️ Technical Stack

### Frontend
- **React 18** - UI framework with modern hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Modern component library
- **Vite** - Fast build tool and development server

### Backend Logic
- **Autonomous AI Service** - Goal-driven decision engine
- **Rule-Based Engine** - Traditional AI logic
- **ML Simulation** - Machine learning algorithms
- **Student Profiling** - Dynamic profile management

### Deployment
- **Docker** - Containerized deployment
- **Docker Compose** - Multi-service orchestration
- **Node.js Alpine** - Lightweight production image

## 🎯 Learning Objectives Achieved

✅ **Complete agent-oriented AI system**  
✅ **Backend APIs and frontend UX/UI implemented**  
✅ **Docker modular deployment ready**  
✅ **Dual AI techniques: Rule-based + ML**  
✅ **Ethical AI with explainability (XAI)**  
✅ **Autonomous decision-making and task execution**

## 🔧 Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build
- `npm run lint` - Check code quality
- `docker build -t eduguide-ai .` - Build Docker image
- `docker-compose up` - Start with Docker Compose

## 📊 AI Agent Capabilities

### Decision Types
1. **Major Recommendation** - Autonomous major selection based on grades/personality
2. **Learning Gap Identification** - Detects knowledge gaps and creates improvement plans  
3. **Career Guidance** - Matches students with suitable career paths
4. **Continuous Support** - Ongoing optimization and progress monitoring

### Autonomous Features
- **Real-time Analysis** - Processes student data immediately
- **Goal Setting** - Automatically establishes learning objectives
- **Progress Tracking** - Monitors student advancement
- **Adaptive Responses** - Adjusts recommendations based on feedback

## 🌐 Deployment Options

**Development:**
- Local development server (`npm run dev`)
- Hot reloading and instant updates

**Production:**
- Docker container deployment
- Netlify/Vercel cloud hosting
- Self-hosted solutions

**Distribution:**
- USB with Docker image
- GitHub repository clone
- Pre-built static files

## 📄 Project Deliverables

✅ **Dockerized AI Agent** - Complete container with all services  
✅ **Full-stack Implementation** - Frontend + Backend AI logic  
✅ **Source Code & Documentation** - Complete README and setup guide  
✅ **Dual AI Approaches** - Rule-based and ML implementations  
✅ **Autonomous Operation** - Goal-driven, self-executing AI agent

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**EduGuide AI** - Where autonomous intelligence meets educational excellence.
