
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, BookOpen, MessageSquare, Video } from "lucide-react";
import { Link } from "react-router-dom";

const Help = () => {
  const faqs = [
    {
      question: "How accurate are the major recommendations?",
      answer: "Our AI algorithms have a 95% accuracy rate based on extensive testing and student feedback."
    },
    {
      question: "How long does the assessment take?",
      answer: "The personality assessment takes about 10-15 minutes, while the grade analysis is instant."
    },
    {
      question: "Can I retake the assessments?",
      answer: "Yes, you can retake both assessments at any time to get updated recommendations."
    },
    {
      question: "Are my results private?",
      answer: "Absolutely. All your data and results are kept completely confidential and secure."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions and get the support you need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/80 backdrop-blur shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center mb-4">
                  Learn how to use our platform and get the most accurate results
                </p>
                <Link to="/grades-analysis">
                  <Button className="w-full">Start Assessment</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Video className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Video Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center mb-4">
                  Watch step-by-step guides on how to use our AI agents
                </p>
                <Button variant="outline" className="w-full">Watch Videos</Button>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Live Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center mb-4">
                  Get instant help from our support team
                </p>
                <Link to="/contact">
                  <Button variant="outline" className="w-full">Contact Us</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/80 backdrop-blur shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-6 w-6 mr-2 text-blue-600" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Help;
