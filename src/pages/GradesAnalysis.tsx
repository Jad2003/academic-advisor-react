import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calculator, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import JobOpportunities from "@/components/JobOpportunities";
import SectionSelector from "@/components/grades/SectionSelector";
import GradesInputSection from "@/components/grades/GradesInputSection";
import RecommendationCard from "@/components/grades/RecommendationCard";
import { GradeAnalysisService, type MajorRecommendation, type BaccalaureateSection, type GradeData } from "@/services/gradeAnalysisService";

interface Grades {
  arabic: number;
  english: number;
  mathematics: number;
  physics: number;
  chemistry: number;
  biology: number;
  history: number;
  geography: number;
  philosophy: number;
  economics: number;
  sociology: number;
}

const GradesAnalysis = () => {
  const [section, setSection] = useState<BaccalaureateSection>('');
  const [grades, setGrades] = useState<Grades>({
    arabic: 0,
    english: 0,
    mathematics: 0,
    physics: 0,
    chemistry: 0,
    biology: 0,
    history: 0,
    geography: 0,
    philosophy: 0,
    economics: 0,
    sociology: 0,
  });
  const [recommendations, setRecommendations] = useState<MajorRecommendation[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);

  const handleGradeChange = (subject: keyof Grades, value: string) => {
    const numValue = Math.max(0, Math.min(20, parseFloat(value) || 0));
    setGrades(prev => ({ ...prev, [subject]: numValue }));
  };

  const handleAnalyzeGrades = () => {
    if (!section || section === '') {
      toast.error("Please select your Baccalaureate section first");
      return;
    }

    const analysisResults = GradeAnalysisService.analyzeGrades(grades, section);
    setRecommendations(analysisResults);
    setShowResults(true);
    setShowAllRecommendations(false);
    toast.success("Analysis complete! Check your recommendations below.");
  };

  const resetAnalysis = () => {
    setShowResults(false);
    setRecommendations([]);
    setShowAllRecommendations(false);
    setSection('');
    setGrades({
      arabic: 0,
      english: 0,
      mathematics: 0,
      physics: 0,
      chemistry: 0,
      biology: 0,
      history: 0,
      geography: 0,
      philosophy: 0,
      economics: 0,
      sociology: 0,
    });
  };

  const displayedRecommendations = showAllRecommendations ? recommendations : recommendations.slice(0, 3);

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Link to="/" className="mr-4">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Your Major Recommendations</h1>
          </div>

          {/* Results */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {displayedRecommendations.map((rec, index) => (
              <RecommendationCard key={index} recommendation={rec} index={index} />
            ))}

            {/* Show More/Less Button */}
            {recommendations.length > 3 && (
              <div className="flex justify-center">
                <Button
                  onClick={() => setShowAllRecommendations(!showAllRecommendations)}
                  variant="outline"
                  className="flex items-center"
                >
                  {showAllRecommendations ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-2" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-2" />
                      Show More ({recommendations.length - 3} more)
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Job Opportunities for Top Recommendation */}
            {recommendations.length > 0 && (
              <JobOpportunities majorName={recommendations[0].major} />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <Button onClick={resetAnalysis} variant="outline">
              Try Again
            </Button>
            <Link to="/personality-assessment">
              <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                Try Personality Assessment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/" className="mr-4">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back Home
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Grade-Based Analysis</h1>
            <p className="text-gray-600 mt-2">Enter your Lebanese Baccalaureate grades to get personalized major recommendations</p>
          </div>
        </div>

        {/* Grades Input Form */}
        <Card className="max-w-4xl mx-auto border-0 shadow-lg bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <Calculator className="h-6 w-6 mr-2 text-blue-600" />
              Enter Your Lebanese Baccalaureate Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Baccalaureate Section Selection */}
            <SectionSelector section={section} onSectionChange={setSection} />

            {/* Grades Input */}
            {section && section !== '' && (
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-gray-900">Enter Your Grades (0-20)</h3>
                <GradesInputSection 
                  section={section}
                  grades={grades}
                  onGradeChange={handleGradeChange}
                />
              </div>
            )}

            <Button 
              onClick={handleAnalyzeGrades} 
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3"
              disabled={!section || section === ''}
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Analyze My Grades
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GradesAnalysis;
