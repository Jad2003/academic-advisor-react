
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Brain, BookOpen, TrendingUp, Bot, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center mb-8">
          <Bot className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">EduGuide AI Agent</h1>
        </div>
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl text-gray-700 mb-4">
            Autonomous AI Agent for Educational Enhancement
          </p>
          <p className="text-lg text-gray-600">
            A goal-driven AI system that operates autonomously, making intelligent decisions for 
            adaptive learning recommendations, automated feedback assistance, and knowledge gap identification. 
            Our dual-implementation approach combines traditional rule-based logic with modern machine learning capabilities.
          </p>
        </div>
      </header>

      {/* AI Agent Approaches */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Dual AI Implementation</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience our versatile AI agent system featuring two distinct approaches for comprehensive educational guidance
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Rule-Based AI Agent */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Rule-Based AI Engine</CardTitle>
              <CardDescription className="text-gray-600">
                Traditional decision-making engine using logical rules and heuristics for grade-based analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Target className="h-4 w-4 mr-2 text-blue-500" />
                  Logical rule-based decision making
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                  Analyzes academic performance patterns
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Zap className="h-4 w-4 mr-2 text-blue-500" />
                  Deterministic recommendations
                </div>
              </div>
              <Link to="/grades-analysis" className="block">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3">
                  Launch Rule-Based Agent
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Machine Learning AI Agent */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Machine Learning Engine</CardTitle>
              <CardDescription className="text-gray-600">
                Advanced ML capabilities with classification, clustering, and prediction for personality-based matching
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Brain className="h-4 w-4 mr-2 text-purple-500" />
                  Advanced ML algorithms
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Target className="h-4 w-4 mr-2 text-purple-500" />
                  Adaptive learning patterns
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Zap className="h-4 w-4 mr-2 text-purple-500" />
                  Predictive personality matching
                </div>
              </div>
              <Link to="/personality-assessment" className="block">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3">
                  Launch ML Agent
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* AI Agent Capabilities */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">AI Agent Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white/60 backdrop-blur rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Adaptive Learning Recommender</h3>
              <p className="text-sm text-gray-600">Autonomous system that identifies learning patterns and recommends personalized educational paths</p>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Automated Feedback Assistant</h3>
              <p className="text-sm text-gray-600">Goal-driven agent providing intelligent feedback and guidance based on performance analysis</p>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Knowledge Gap Identifier</h3>
              <p className="text-sm text-gray-600">Intelligent system that detects learning gaps and provides targeted recommendations for improvement</p>
            </div>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Agent-Oriented System</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our AI agent operates autonomously with goal-driven decision making, combining traditional rule-based logic 
              with modern machine learning approaches for comprehensive educational enhancement.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                Traditional Rule-Based Engine
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Logical rules and heuristics</li>
                <li>• Deterministic decision making</li>
                <li>• Grade-based pattern analysis</li>
                <li>• Transparent reasoning process</li>
              </ul>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-500" />
                Modern ML Engine
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Classification and clustering</li>
                <li>• Predictive modeling</li>
                <li>• Adaptive learning patterns</li>
                <li>• Personality-based matching</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
