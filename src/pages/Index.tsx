
import CustomButton from "@/components/ui/CustomButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/CustomCard";
import GraduationCap from "@/components/icons/GraduationCap";
import Brain from "@/components/icons/Brain";
import BookOpen from "@/components/icons/BookOpen";
import TrendingUp from "@/components/icons/TrendingUp";
import { Link } from "@/utils/router";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center mb-8">
          <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">EduGuide AI</h1>
        </div>
        <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto">
          Discover your perfect academic major with our intelligent guidance system. 
          Choose between grade-based analysis or personality assessment.
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
              <CardTitle className="text-2xl font-bold text-gray-900">Grade-Based Analysis</CardTitle>
              <CardDescription className="text-gray-600">
                Get major recommendations based on your academic performance in key subjects
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
                  Rule-based intelligent matching
                </div>
              </div>
              <Link to="/grades-analysis" className="block">
                <CustomButton className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3">
                  Start Grade Analysis
                </CustomButton>
              </Link>
            </CardContent>
          </Card>

          {/* Question-Based AI Agent */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Personality Assessment</CardTitle>
              <CardDescription className="text-gray-600">
                Discover your ideal major through comprehensive personality and interest analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Interactive questionnaire
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Brain className="h-4 w-4 mr-2" />
                  AI-powered personality matching
                </div>
              </div>
              <Link to="/personality-assessment" className="block">
                <CustomButton className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3">
                  Start Assessment
                </CustomButton>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Choose EduGuide AI?</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Intelligent Analysis</h3>
              <p className="text-sm text-gray-600">Advanced AI algorithms analyze your strengths and interests</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Data-Driven Results</h3>
              <p className="text-sm text-gray-600">Recommendations based on proven academic correlations</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Personalized Guidance</h3>
              <p className="text-sm text-gray-600">Tailored recommendations for your unique profile</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
