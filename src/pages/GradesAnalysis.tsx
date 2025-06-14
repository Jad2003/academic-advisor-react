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

  const handleGradeChange = (subject: keyof Grades, value: string) => {
    const numValue = Math.max(0, Math.min(20, parseFloat(value) || 0));
    setGrades(prev => ({ ...prev, [subject]: numValue }));
  };

  const analyzeGrades = () => {
    console.log("Analyzing grades:", grades);
    console.log("Baccalaureate class:", baccalaureateClass);
    
    // Convert grades to percentage for easier calculation (Lebanese system is out of 20)
    const gradePercentages = Object.fromEntries(
      Object.entries(grades).map(([key, value]) => [key, (value / 20) * 100])
    );
    
    // Enhanced rule-based AI logic with better subject correlation and class-specific weighting
    const recommendations: MajorRecommendation[] = [];
    
    // Calculate subject group averages for better precision
    const stemAvg = (gradePercentages.mathematics + gradePercentages.physics + gradePercentages.chemistry) / 3;
    const bioMedAvg = (gradePercentages.biology + gradePercentages.chemistry + gradePercentages.physics) / 3;
    const languagesAvg = (gradePercentages.arabic + gradePercentages.english) / 2;
    const socialAvg = (gradePercentages.history + gradePercentages.geography + gradePercentages.sociology + gradePercentages.philosophy) / 4;
    const businessAvg = (gradePercentages.economics + gradePercentages.mathematics + gradePercentages.english) / 3;

    // Set minimum threshold for recommendations
    const MIN_THRESHOLD = 65;

    // Class-specific bonus multiplier
    const getClassBonus = (major: string) => {
      switch (baccalaureateClass) {
        case "general-sciences":
          if (["Engineering", "Computer Science", "Mathematics", "Physics", "Architecture"].includes(major)) return 1.1;
          break;
        case "life-sciences":
          if (["Medicine", "Pharmacy", "Dentistry", "Nursing", "Biology", "Biotechnology"].includes(major)) return 1.1;
          break;
        case "sociology-economics":
          if (["Business Administration", "Economics", "Psychology", "International Relations", "Sociology"].includes(major)) return 1.1;
          break;
        case "literature-humanities":
          if (["Literature & Languages", "Law", "Philosophy", "History", "Journalism"].includes(major)) return 1.1;
          break;
      }
      return 1.0;
    };

    // Engineering - Requires strong Math + Physics combination
    if (gradePercentages.mathematics >= 75 && gradePercentages.physics >= 70 && stemAvg >= 72) {
      const engineeringScore = (stemAvg + (gradePercentages.mathematics - 70) * 0.3) * getClassBonus("Engineering");
      recommendations.push({
        major: "Engineering",
        match: Math.min(95, engineeringScore),
        description: "Design and build solutions to technical problems using mathematics and science.",
        reasons: [
          `Strong mathematics foundation (${grades.mathematics}/20)`,
          `Excellent physics understanding (${grades.physics}/20)`,
          `STEM subjects average: ${Math.round(stemAvg)}%`,
          baccalaureateClass === "general-sciences" ? "Perfect match for your General Sciences background" : ""
        ].filter(Boolean)
      });
    }

    // Computer Science - Math + Logic focus
    if (gradePercentages.mathematics >= 70 && (gradePercentages.physics >= 65 || gradePercentages.economics >= 65)) {
      const csScore = (gradePercentages.mathematics * 0.6 + gradePercentages.physics * 0.25 + gradePercentages.english * 0.15) * getClassBonus("Computer Science");
      if (csScore >= MIN_THRESHOLD) {
        recommendations.push({
          major: "Computer Science",
          match: Math.min(92, csScore),
          description: "Develop software, algorithms, and computing systems.",
          reasons: [
            `Strong mathematical reasoning (${grades.mathematics}/20)`,
            `Logical problem-solving abilities`,
            gradePercentages.physics >= 65 ? `Physics foundation supports computational thinking` : `Economics background aids algorithmic thinking`,
            baccalaureateClass === "general-sciences" ? "Ideal for your technical background" : ""
          ].filter(Boolean)
        });
      }
    }

    // Medicine - Bio + Chem + Physics trinity
    if (gradePercentages.biology >= 75 && gradePercentages.chemistry >= 70 && bioMedAvg >= 72) {
      const medScore = (bioMedAvg + (gradePercentages.biology - 70) * 0.4) * getClassBonus("Medicine");
      recommendations.push({
        major: "Medicine",
        match: Math.min(97, medScore),
        description: "Study human health, disease prevention, and medical treatment.",
        reasons: [
          `Outstanding biology performance (${grades.biology}/20)`,
          `Strong chemistry foundation (${grades.chemistry}/20)`,
          `Medical sciences average: ${Math.round(bioMedAvg)}%`,
          baccalaureateClass === "life-sciences" ? "Perfect alignment with your Life Sciences track" : ""
        ].filter(Boolean)
      });
    }

    // Pharmacy - Chemistry focused with Biology
    if (gradePercentages.chemistry >= 75 && gradePercentages.biology >= 65 && gradePercentages.mathematics >= 60) {
      const pharmScore = (gradePercentages.chemistry * 0.5 + gradePercentages.biology * 0.3 + gradePercentages.mathematics * 0.2) * getClassBonus("Pharmacy");
      if (pharmScore >= MIN_THRESHOLD) {
        recommendations.push({
          major: "Pharmacy",
          match: Math.min(90, pharmScore),
          description: "Study drug development, medication management, and pharmaceutical sciences.",
          reasons: [
            `Excellent chemistry mastery (${grades.chemistry}/20)`,
            `Strong biological sciences foundation`,
            `Mathematical skills for pharmaceutical calculations`,
            baccalaureateClass === "life-sciences" ? "Great fit for your scientific background" : ""
          ].filter(Boolean)
        });
      }
    }

    // Business Administration - Economics + Math + Languages
    if (gradePercentages.economics >= 70 && businessAvg >= 68) {
      const businessScore = (businessAvg + (gradePercentages.economics - 65) * 0.3) * getClassBonus("Business Administration");
      recommendations.push({
        major: "Business Administration",
        match: Math.min(88, businessScore),
        description: "Learn management, finance, and organizational leadership.",
        reasons: [
          `Strong economics understanding (${grades.economics}/20)`,
          `Good mathematical skills for financial analysis`,
          `Language skills for business communication`,
          baccalaureateClass === "sociology-economics" ? "Excellent match for your academic background" : ""
        ].filter(Boolean)
      });
    }

    // Law
    if (gradePercentages.arabic >= 70 && gradePercentages.history >= 68 && gradePercentages.philosophy >= 65) {
      const lawScore = (gradePercentages.arabic * 0.4 + gradePercentages.history * 0.3 + gradePercentages.philosophy * 0.3) * getClassBonus("Law");
      if (lawScore >= MIN_THRESHOLD) {
        recommendations.push({
          major: "Law",
          match: Math.min(85, lawScore),
          description: "Study legal systems and advocate for justice.",
          reasons: [
            `Strong Arabic language skills for legal documents`,
            `Historical knowledge for legal precedents`,
            `Philosophical thinking for legal analysis`,
            baccalaureateClass === "literature-humanities" ? "Perfect for your humanities background" : ""
          ].filter(Boolean)
        });
      }
    }

    // Literature & Languages - Strong in multiple languages
    if (languagesAvg >= 72 && (gradePercentages.arabic >= 70 || gradePercentages.english >= 70)) {
      const litScore = (languagesAvg + (Math.max(gradePercentages.arabic, gradePercentages.english) - 70) * 0.2) * getClassBonus("Literature & Languages");
      recommendations.push({
        major: "Literature & Languages",
        match: Math.min(85, litScore),
        description: "Study languages, literature, and communication.",
        reasons: [
          `Strong language abilities (Avg: ${Math.round(languagesAvg)}%)`,
          `Excellent communication skills`,
          gradePercentages.philosophy >= 65 ? `Philosophy enhances literary analysis` : `Strong foundation in language studies`,
          baccalaureateClass === "literature-humanities" ? "Ideal for your literary background" : ""
        ].filter(Boolean)
      });
    }

    // Psychology - Social sciences with specific focus
    if (gradePercentages.sociology >= 70 && gradePercentages.philosophy >= 65 && socialAvg >= 68) {
      const psychScore = (gradePercentages.sociology * 0.4 + gradePercentages.philosophy * 0.3 + gradePercentages.biology * 0.2 + gradePercentages.english * 0.1) * getClassBonus("Psychology");
      if (psychScore >= MIN_THRESHOLD) {
        recommendations.push({
          major: "Psychology",
          match: Math.min(83, psychScore),
          description: "Study human behavior, mental processes, and therapeutic techniques.",
          reasons: [
            `Strong understanding of human behavior (Sociology: ${grades.sociology}/20)`,
            `Philosophical thinking for psychological analysis`,
            gradePercentages.biology >= 60 ? `Biology background supports neuropsychology` : `Strong social science foundation`,
            baccalaureateClass === "sociology-economics" ? "Great match for your social sciences track" : ""
          ].filter(Boolean)
        });
      }
    }

    // Economics (Specialized) - Economics + Math + Philosophy
    if (gradePercentages.economics >= 75 && gradePercentages.mathematics >= 70) {
      const econScore = (gradePercentages.economics * 0.5 + gradePercentages.mathematics * 0.3 + gradePercentages.philosophy * 0.2) * getClassBonus("Economics");
      if (econScore >= MIN_THRESHOLD) {
        recommendations.push({
          major: "Economics",
          match: Math.min(87, econScore),
          description: "Analyze economic systems, markets, and financial behavior.",
          reasons: [
            `Outstanding economics performance (${grades.economics}/20)`,
            `Strong mathematical foundation for economic modeling`,
            gradePercentages.philosophy >= 65 ? `Philosophical thinking enhances economic theory` : `Analytical skills for market analysis`,
            baccalaureateClass === "sociology-economics" ? "Perfect for your economics background" : ""
          ].filter(Boolean)
        });
      }
    }

    // Sort by match score and limit to meaningful recommendations
    const sortedRecommendations = recommendations
      .filter(rec => rec.match >= 60) // Only show strong matches
      .sort((a, b) => b.match - a.match)
      .slice(0, 4); // Limit to top 4 recommendations

    // Ensure we have at least one recommendation
    if (sortedRecommendations.length === 0) {
      const avgGrade = Object.values(gradePercentages).reduce((a, b) => a + b, 0) / Object.values(gradePercentages).length;
      sortedRecommendations.push({
        major: "Liberal Arts",
        match: Math.max(60, avgGrade),
        description: "A broad field that allows you to explore various interests while developing critical thinking skills.",
        reasons: [
          "Well-rounded academic performance",
          "Opportunity to explore multiple disciplines",
          "Foundation for various career paths"
        ]
      });
    }

    setRecommendations(sortedRecommendations);
    setShowResults(true);
    setShowAllRecommendations(false);
    toast.success("Analysis complete! Check your recommendations below.");
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
              onValueChange={(value) => setBaccalaureateClass(value as BaccalaureateClass)}
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
            <p className="text-sm text-gray-600">Please enter your grades (0-20) for each subject</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="arabic">Arabic</Label>
                <Input
                  id="arabic"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={grades.arabic || ''}
                  onChange={(e) => handleGradeChange('arabic', e.target.value)}
                  placeholder="Grade (0-20)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="english">English</Label>
                <Input
                  id="english"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={grades.english || ''}
                  onChange={(e) => handleGradeChange('english', e.target.value)}
                  placeholder="Grade (0-20)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mathematics">Mathematics</Label>
                <Input
                  id="mathematics"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={grades.mathematics || ''}
                  onChange={(e) => handleGradeChange('mathematics', e.target.value)}
                  placeholder="Grade (0-20)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="physics">Physics</Label>
                <Input
                  id="physics"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={grades.physics || ''}
                  onChange={(e) => handleGradeChange('physics', e.target.value)}
                  placeholder="Grade (0-20)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chemistry">Chemistry</Label>
                <Input
                  id="chemistry"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={grades.chemistry || ''}
                  onChange={(e) => handleGradeChange('chemistry', e.target.value)}
                  placeholder="Grade (0-20)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="biology">Biology</Label>
                <Input
                  id="biology"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={grades.biology || ''}
                  onChange={(e) => handleGradeChange('biology', e.target.value)}
                  placeholder="Grade (0-20)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="history">History</Label>
                <Input
                  id="history"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={grades.history || ''}
                  onChange={(e) => handleGradeChange('history', e.target.value)}
                  placeholder="Grade (0-20)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="geography">Geography</Label>
                <Input
                  id="geography"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={grades.geography || ''}
                  onChange={(e) => handleGradeChange('geography', e.target.value)}
                  placeholder="Grade (0-20)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="philosophy">Philosophy</Label>
                <Input
                  id="philosophy"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={grades.philosophy || ''}
                  onChange={(e) => handleGradeChange('philosophy', e.target.value)}
                  placeholder="Grade (0-20)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="economics">Economics</Label>
                <Input
                  id="economics"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={grades.economics || ''}
                  onChange={(e) => handleGradeChange('economics', e.target.value)}
                  placeholder="Grade (0-20)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sociology">Sociology</Label>
                <Input
                  id="sociology"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={grades.sociology || ''}
                  onChange={(e) => handleGradeChange('sociology', e.target.value)}
                  placeholder="Grade (0-20)"
                />
              </div>
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
