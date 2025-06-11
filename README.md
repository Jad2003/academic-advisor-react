
# EduGuide AI - Autonomous AI Agent for Educational Enhancement

A cutting-edge autonomous AI agent system built with React, TypeScript, and Docker that provides intelligent educational guidance through dual AI approaches: rule-based analysis and simulated machine learning for personality assessment.

## 🤖 Autonomous AI Agent Features

- **Goal-Driven Decision Making**: Autonomous agent that sets and executes educational guidance goals
- **Dual AI Approaches**: 
  - Rule-based algorithm for grade analysis
  - Simulated ML algorithm for personality matching
- **Continuous Learning**: Agent optimizes recommendations through autonomous feedback loops
- **Real-time Monitoring**: Live demonstration of AI decision-making processes

## 🚀 Quick Start

### Prerequisites
1. **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
2. **Docker** (for containerized deployment) - [Download here](https://docker.com/)

### 📦 Installation Methods

#### Method 1: Docker Deployment (Recommended for Instructors)
```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build manually
docker build -t eduguide-ai .
docker run -p 4173:4173 eduguide-ai
```

#### Method 2: Local Development
```bash
# Clone and install
git clone [repository-url]
cd eduguide-ai
npm install

# Start development server
npm run dev
```

#### Method 3: USB/CD Distribution
```bash
# Build for production
npm run build

# Create Docker image for distribution
docker save eduguide-ai > eduguide-ai.tar
```

Recipients can load and run:
```bash
docker load < eduguide-ai.tar
docker run -p 4173:4173 eduguide-ai
```

### 🌐 Deployment Options

**Using Netlify:**
1. Create account at [netlify.com](https://netlify.com)
2. Run `npm run build`
3. Deploy `dist` folder

**Using Vercel:**
1. Create account at [vercel.com](https://vercel.com)
2. Connect GitHub repository
3. Auto-deploy on push

## 📁 Project Architecture

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation bar
│   ├── AIAgentDemo.tsx # Autonomous agent demonstration
│   ├── JobOpportunities.tsx
│   └── ui/             # Shadcn UI components
├── pages/              # Application pages
│   ├── Index.tsx       # Home page with AI agent
│   ├── GradesAnalysis.tsx # Rule-based AI analysis
│   ├── PersonalityAssessment.tsx # ML-based assessment
│   └── [other pages]
├── services/           # Core AI services
│   ├── aiAgentService.ts # Autonomous AI agent logic
│   └── jobDataService.ts
└── hooks/              # Custom React hooks
```

## 🤖 Autonomous AI Agent Technical Details

### Core Components
1. **Goal Management**: Dynamic goal creation and prioritization
2. **Decision Engine**: Autonomous decision-making with confidence scoring
3. **Dual AI Processing**:
   - Rule-based grade analysis
   - Simulated ML personality matching
4. **Continuous Optimization**: Self-improving recommendation accuracy

### Agent Workflow
```
Initialize Goals → Select Priority Goal → Execute Analysis → 
Record Decision → Update Status → Optimize → Repeat
```

### AI Algorithms
- **Rule-Based**: Mathematical grade correlation analysis
- **Simulated ML**: Weighted personality trait matching
- **Hybrid**: Autonomous combination of both approaches

## 🛠️ Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Check code quality
- `docker-compose up` - Run with Docker

## 🎨 Technologies Used

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Modern component library
- **Docker** - Containerization
- **React Router** - Client-side routing
- **Autonomous AI** - Custom goal-driven agent

## 🔧 AI Agent Features

- **Grade-Based Analysis** - Rule-based algorithm for academic assessment
- **Personality Assessment** - Simulated ML for personality-major matching
- **Autonomous Decision Making** - Self-directed goal execution
- **Real-time Monitoring** - Live agent status and decision tracking
- **Continuous Learning** - Self-optimizing recommendation engine

## 📊 Academic Requirements Met

✅ **Autonomous AI Agent**: Self-directed goal-based decision making  
✅ **Dual AI Approaches**: Rule-based + Simulated ML algorithms  
✅ **Educational Domain**: Career guidance and major selection  
✅ **Full-Stack Architecture**: Frontend + AI services + Docker  
✅ **Real-time Demonstration**: Live agent monitoring  
✅ **Containerized Deployment**: Docker ready for distribution  

## 📄 License

This project is developed for academic purposes and is available under the [MIT License](LICENSE).

## 🎓 Academic Context

This project demonstrates advanced concepts in:
- Autonomous AI agent development
- Multi-algorithm AI systems
- Educational technology applications
- Modern web development practices
- Containerized software deployment

---
*Built with ❤️ for educational enhancement through autonomous AI*
