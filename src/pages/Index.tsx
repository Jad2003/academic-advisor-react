
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Brain, BookOpen, TrendingUp, Cpu, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center mb-8">
          <Cpu className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">EduGuide AI Agent</h1>
        </div>
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto">
          Autonomous AI-powered educational enhancement system using dual implementation approaches: 
          rule-based decision engine and modern machine learning capabilities for intelligent academic guidance.
        </p>
      </header>

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
                Traditional decision-making engine using logical rules and heuristics for grade-based analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Lebanese Baccalaureate Analysis
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Brain className="h-4 w-4 mr-2" />
                  Logical rules & heuristic matching
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Cpu className="h-4 w-4 mr-2" />
                  Autonomous decision making
                </div>
              </div>
              <Link to="/grades-analysis" className="block">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3">
                  Launch Grade Analysis Agent
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
              <CardTitle className="text-2xl font-bold text-gray-900">ML-Based AI Engine</CardTitle>
              <CardDescription className="text-gray-600">
                Modern machine learning engine with advanced capabilities for personality-based analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Adaptive questionnaire system
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Brain className="h-4 w-4 mr-2" />
                  Classification & prediction algorithms
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Cpu className="h-4 w-4 mr-2" />
                  Goal-driven task execution
                </div>
              </div>
              <Link to="/personality-assessment" className="block">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3">
                  Launch Personality Agent
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* AI System Features */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">AI Agent Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Cpu className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Autonomous Operation</h3>
              <p className="text-sm text-gray-600">Goal-driven AI that makes decisions and executes tasks independently</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Dual AI Implementation</h3>
              <p className="text-sm text-gray-600">Traditional rule-based and modern ML engines for comprehensive analysis</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Educational Enhancement</h3>
              <p className="text-sm text-gray-600">Adaptive learning recommendations and automated feedback systems</p>
            </div>
          </div>
        </div>

        {/* System Architecture Note */}
        <div className="mt-12 max-w-2xl mx-auto">
          <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Full-Stack AI System</h3>
              <p className="text-sm text-gray-600">
                Complete agent-oriented architecture with frontend UX/UI, secure backend APIs, 
                and modular deployment capabilities for educational enhancement.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
