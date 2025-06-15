import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Calculator, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import JobOpportunities from "@/components/JobOpportunities";

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

interface MajorRecommendation {
  major: string;
  match: number;
  description: string;
  reasons: string[];
}

type BaccalaureateClass = "general-sciences" | "life-sciences" | "sociology-economics" | "literature-humanities";

const GradesAnalysis = () => {
  const [baccalaureateClass, setBaccalaureateClass] = useState<BaccalaureateClass>("general-sciences");
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

  // Define which subjects are available for each baccalaureate class
  const getAvailableSubjects = (baccClass: BaccalaureateClass): (keyof Grades)[] => {
    const allSubjects: (keyof Grades)[] = [
      'arabic', 'english', 'mathematics', 'physics', 'chemistry', 
      'biology', 'history', 'geography', 'philosophy', 'economics', 'sociology'
    ];

    switch (baccClass) {
      case "general-sciences":
        // All courses except biology, economics, sociology
        return allSubjects.filter(subject => 
          !['biology', 'economics', 'sociology'].includes(subject)
        );
      case "life-sciences":
        // All courses except economics, sociology
        return allSubjects.filter(subject => 
          !['economics', 'sociology'].includes(subject)
        );
      case "sociology-economics":
      case "literature-humanities":
        // All courses (no exclusions mentioned for these classes)
        return allSubjects;
      default:
        return allSubjects;
    }
  };

  const handleBaccalaureateClassChange = (newClass: BaccalaureateClass) => {
    setBaccalaureateClass(newClass);
    
    // Reset grades for subjects that are not available in the new class
    const availableSubjects = getAvailableSubjects(newClass);
    const newGrades = { ...grades };
    
    // Set grades to 0 for subjects not available in the new class
    Object.keys(newGrades).forEach(subject => {
      if (!availableSubjects.includes(subject as keyof Grades)) {
        newGrades[subject as keyof Grades] = 0;
      }
    });
    
    setGrades(newGrades);
  };

  const handleGradeChange = (subject: keyof Grades, value: string) => {
    const numValue = Math.max(0, Math.min(20, parseFloat(value) || 0));
    setGrades(prev => ({ ...prev, [subject]: numValue }));
  };

  const analyzeGrades = async () => {
    console.log("Sending grades for analysis:", { grades, baccalaureateClass });
    toast.info("Analyzing your grades...");

    try {
      // This is where you would call your Python backend.
      // You need to create this API endpoint.
      const response = await fetch('/api/grade-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ grades, baccalaureateClass }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: MajorRecommendation[] = await response.json();

      console.log("Received recommendations:", data);

      if (data && data.length > 0) {
        setRecommendations(data);
        setShowResults(true);
        setShowAllRecommendations(false);
        toast.success("Analysis complete! Check your recommendations below.");
      } else {
        toast.warning("No specific recommendations could be generated from your grades.");
        setRecommendations([]);
      }
    } catch (error) {
      console.error("Failed to analyze grades:", error);
      toast.error("An error occurred while analyzing your grades. Please check the console for details.");
    }
  };

  const resetAnalysis = () => {
    setShowResults(false);
    setRecommendations([]);
    setShowAllRecommendations(false);
    setBaccalaureateClass("general-sciences");
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

  const subjectLabels: Record<keyof Grades, string> = {
    arabic: "Arabic",
    english: "English",
    mathematics: "Mathematics",
    physics: "Physics",
    chemistry: "Chemistry",
    biology: "Biology",
    history: "History",
    geography: "Geography",
    philosophy: "Philosophy",
    economics: "Economics",
    sociology: "Sociology"
  };

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
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-3">
                        #{index + 1}
                      </span>
                      <CardTitle className="text-xl text-gray-900">{rec.major}</CardTitle>
                    </div>
                    <div className="flex items-center">
                      <div className="text-2xl font-bold text-blue-600 mr-2">{Math.round(rec.match)}%</div>
                      <div className="text-sm text-gray-500">Match</div>
                    </div>
                  </div>
                  <p className="text-gray-600">{rec.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Why this major fits you:</h4>
                    <ul className="space-y-1">
                      {rec.reasons.map((reason, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 bg-blue-50 rounded-lg p-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000" 
                        style={{ width: `${rec.match}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Show More/Less Button - Only show if there are more than 3 recommendations */}
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

        {/* Baccalaureate Class Selection */}
        <Card className="max-w-4xl mx-auto border-0 shadow-lg bg-white/80 backdrop-blur mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <BookOpen className="h-6 w-6 mr-2 text-purple-600" />
              Select Your Baccalaureate Class
            </CardTitle>
            <p className="text-sm text-gray-600">Choose your academic track to get more targeted recommendations</p>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={baccalaureateClass} 
              onValueChange={(value) => handleBaccalaureateClassChange(value as BaccalaureateClass)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="general-sciences" id="general-sciences" />
                <div className="flex-1">
                  <Label htmlFor="general-sciences" className="font-medium cursor-pointer">
                    General Sciences
                  </Label>
                  <p className="text-sm text-gray-600">Focus on mathematics, physics, and chemistry</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="life-sciences" id="life-sciences" />
                <div className="flex-1">
                  <Label htmlFor="life-sciences" className="font-medium cursor-pointer">
                    Life Sciences
                  </Label>
                  <p className="text-sm text-gray-600">Emphasis on biology, chemistry, and health sciences</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="sociology-economics" id="sociology-economics" />
                <div className="flex-1">
                  <Label htmlFor="sociology-economics" className="font-medium cursor-pointer">
                    Sociology and Economics
                  </Label>
                  <p className="text-sm text-gray-600">Social sciences, economics, and human behavior</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="literature-humanities" id="literature-humanities" />
                <div className="flex-1">
                  <Label htmlFor="literature-humanities" className="font-medium cursor-pointer">
                    Literature and Humanities
                  </Label>
                  <p className="text-sm text-gray-600">Languages, literature, philosophy, and arts</p>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Grades Input Form */}
        <Card className="max-w-4xl mx-auto border-0 shadow-lg bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <Calculator className="h-6 w-6 mr-2 text-blue-600" />
              Enter Your Lebanese Baccalaureate Grades
            </CardTitle>
            <p className="text-sm text-gray-600">
              Please enter your grades (0-20) for the subjects in your {baccalaureateClass.replace('-', ' ')} track
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {getAvailableSubjects(baccalaureateClass).map((subject) => (
                <div key={subject} className="space-y-2">
                  <Label htmlFor={subject}>{subjectLabels[subject]}</Label>
                  <Input
                    id={subject}
                    type="number"
                    min="0"
                    max="20"
                    step="0.1"
                    value={grades[subject] || ''}
                    onChange={(e) => handleGradeChange(subject, e.target.value)}
                    placeholder="Grade (0-20)"
                  />
                </div>
              ))}
            </div>

            <Button 
              onClick={analyzeGrades} 
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3"
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
