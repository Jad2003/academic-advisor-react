
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Brain, BookOpen, TrendingUp, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import AIAgentDemo from "@/components/AIAgentDemo";
import { useState } from "react";

const Index = () => {
  const [showAIDemo, setShowAIDemo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center mb-8">
          <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">EduGuide AI</h1>
        </div>
        <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Autonomous AI Agent for Educational Enhancement - Making intelligent decisions and 
          executing tasks to guide your academic journey with dual AI approaches.
        </p>
        
        {/* AI Agent Status Banner */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Brain className="h-6 w-6 mr-2" />
                <span className="font-semibold">Autonomous AI Agent Active</span>
              </div>
              <p className="text-purple-100 mb-4">
                Goal-driven AI making autonomous decisions using rule-based logic + machine learning
              </p>
              <Button 
                onClick={() => setShowAIDemo(!showAIDemo)}
                variant="secondary" 
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                {showAIDemo ? 'Hide' : 'View'} AI Agent Demo
              </Button>
            </CardContent>
          </Card>
        </div>
      </header>

      {/* AI Agent Demo Section */}
      {showAIDemo && (
        <section className="container mx-auto px-4 py-8 mb-16">
          <AIAgentDemo />
        </section>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Rule-Based AI Agent */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Rule-Based AI Engine</CardTitle>
              <CardDescription className="text-gray-600">
                Traditional decision-making using logical rules and heuristics for grade analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Analyzes Math, Science, English & more
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Brain className="h-4 w-4 mr-2" />
                  Logical rules and decision trees
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Target className="h-4 w-4 mr-2" />
                  Goal-driven major recommendations
                </div>
              </div>
              <Link to="/grades-analysis" className="block">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3">
                  Start Rule-Based Analysis
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* ML-Based AI Agent */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">ML-Powered Assessment</CardTitle>
              <CardDescription className="text-gray-600">
                Advanced machine learning engine with classification, clustering, and prediction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Adaptive questionnaire system
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Zap className="h-4 w-4 mr-2" />
                  ML classification & prediction
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Target className="h-4 w-4 mr-2" />
                  Personality-driven matching
                </div>
              </div>
              <Link to="/personality-assessment" className="block">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3">
                  Start ML Assessment
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Dual AI Approach Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Dual AI Implementation</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Rule-Based Logic</h3>
              <p className="text-sm text-gray-600">Traditional AI using logical rules, heuristics, and decision trees for precise analysis</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Machine Learning</h3>
              <p className="text-sm text-gray-600">Advanced ML with classification, clustering, and prediction on relevant datasets</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Autonomous Decisions</h3>
              <p className="text-sm text-gray-600">Goal-driven AI agent that makes autonomous decisions and executes tasks</p>
            </div>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-0">
            <CardHeader>
              <CardTitle className="text-center">Technical Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Backend AI Logic</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Autonomous decision-making engine</li>
                    <li>• Dual AI approach combination</li>
                    <li>• Goal-driven task execution</li>
                    <li>• Real-time student profiling</li>
                    <li>• Knowledge gap identification</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Deployment & Ethics</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Dockerized modular deployment</li>
                    <li>• Ethical AI decision explanations</li>
                    <li>• Explainable AI (XAI) integration</li>
                    <li>• Secure full-stack interactions</li>
                    <li>• Continuous learning capabilities</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
