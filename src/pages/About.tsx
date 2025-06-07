
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/CustomCard";
import GraduationCap from "@/components/icons/GraduationCap";
import User from "@/components/icons/User";
import TrendingUp from "@/components/icons/TrendingUp";
import Brain from "@/components/icons/Brain";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About EduGuide AI</h1>
            <p className="text-xl text-gray-600">
              Empowering students to find their perfect academic path through intelligent guidance
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To help students discover their ideal academic major through data-driven insights and personalized assessments, 
                  ensuring they make informed decisions about their educational future.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Our Team</h3>
                <p className="text-gray-600">
                  A dedicated team of educators, data scientists, and AI specialists working together to create 
                  the most accurate and helpful academic guidance platform.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Card>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Why Choose EduGuide AI?</h2>
                <p className="text-gray-600 mb-8">
                  Our platform combines advanced AI algorithms with educational expertise to provide you with 
                  the most accurate major recommendations based on your academic performance and personal interests.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">95%</div>
                    <div className="text-sm text-gray-600">Accuracy Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">10K+</div>
                    <div className="text-sm text-gray-600">Students Helped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">50+</div>
                    <div className="text-sm text-gray-600">Major Options</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
