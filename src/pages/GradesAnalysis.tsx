
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calculator, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import JobOpportunities from "@/components/JobOpportunities";

interface Grades {
  arabic: number;
  english: number;
  french: number;
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

const GradesAnalysis = () => {
  const [grades, setGrades] = useState<Grades>({
    arabic: 0,
    english: 0,
    french: 0,
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
    
    // Convert grades to percentage for easier calculation (Lebanese system is out of 20)
    const gradePercentages = Object.fromEntries(
      Object.entries(grades).map(([key, value]) => [key, (value / 20) * 100])
    );
    
    // Rule-based AI logic with better scoring
    const rules: { [key: string]: MajorRecommendation } = {
      engineering: {
        major: "Engineering",
        match: 0,
        description: "Design and build solutions to technical problems using mathematics and science.",
        reasons: []
      },
      computerScience: {
        major: "Computer Science",
        match: 0,
        description: "Develop software, algorithms, and computing systems.",
        reasons: []
      },
      medicine: {
        major: "Medicine/Pre-Med",
        match: 0,
        description: "Study human health, disease prevention, and medical treatment.",
        reasons: []
      },
      business: {
        major: "Business Administration",
        match: 0,
        description: "Learn management, finance, and organizational leadership.",
        reasons: []
      },
      literature: {
        major: "Literature & Languages",
        match: 0,
        description: "Study languages, literature, and communication.",
        reasons: []
      },
      socialSciences: {
        major: "Social Sciences",
        match: 0,
        description: "Study human behavior, society, and social relationships.",
        reasons: []
      },
      economics: {
        major: "Economics",
        match: 0,
        description: "Analyze economic systems, markets, and financial behavior.",
        reasons: []
      },
      philosophy: {
        major: "Philosophy",
        match: 0,
        description: "Explore fundamental questions about existence, knowledge, and ethics.",
        reasons: []
      }
    };

    // Base score calculation - start with minimum viable scores
    const avgGrade = Object.values(gradePercentages).reduce((a, b) => a + b, 0) / Object.values(gradePercentages).length;
    const baseScore = Math.max(30, avgGrade * 0.4); // Minimum 30% base score

    // Apply base score to all majors
    Object.keys(rules).forEach(key => {
      rules[key].match = baseScore;
    });

    // Engineering - Strong in Math, Physics, Chemistry
    const engineeringScore = (gradePercentages.mathematics * 0.4 + gradePercentages.physics * 0.3 + gradePercentages.chemistry * 0.3);
    if (engineeringScore >= 70) {
      rules.engineering.match = Math.min(95, baseScore + (engineeringScore - 50) * 0.8);
      rules.engineering.reasons.push("Excellent performance in mathematics and sciences");
    } else if (engineeringScore >= 60) {
      rules.engineering.match = Math.min(85, baseScore + (engineeringScore - 50) * 0.6);
      rules.engineering.reasons.push("Strong mathematics and physics foundation");
    }

    // Computer Science - Math + logical thinking
    const csScore = (gradePercentages.mathematics * 0.5 + gradePercentages.physics * 0.3 + gradePercentages.english * 0.2);
    if (csScore >= 70) {
      rules.computerScience.match = Math.min(92, baseScore + (csScore - 50) * 0.7);
      rules.computerScience.reasons.push("Strong mathematical and logical reasoning skills");
    }

    // Medicine - Biology, Chemistry, Physics
    const medScore = (gradePercentages.biology * 0.4 + gradePercentages.chemistry * 0.3 + gradePercentages.physics * 0.3);
    if (medScore >= 75) {
      rules.medicine.match = Math.min(97, baseScore + (medScore - 50) * 0.9);
      rules.medicine.reasons.push("Outstanding performance in medical sciences");
    } else if (medScore >= 65) {
      rules.medicine.match = Math.min(85, baseScore + (medScore - 50) * 0.7);
      rules.medicine.reasons.push("Strong foundation in biological sciences");
    }

    // Business - Economics, Math, Languages
    const businessScore = (gradePercentages.economics * 0.4 + gradePercentages.mathematics * 0.3 + (gradePercentages.english + gradePercentages.french) / 2 * 0.3);
    if (businessScore >= 70) {
      rules.business.match = Math.min(90, baseScore + (businessScore - 50) * 0.6);
      rules.business.reasons.push("Strong economic understanding and communication skills");
    }

    // Literature - Languages and Philosophy
    const literatureScore = (gradePercentages.arabic * 0.3 + gradePercentages.english * 0.3 + gradePercentages.french * 0.25 + gradePercentages.philosophy * 0.15);
    if (literatureScore >= 70) {
      rules.literature.match = Math.min(88, baseScore + (literatureScore - 50) * 0.6);
      rules.literature.reasons.push("Excellent language and literary analysis skills");
    }

    // Social Sciences - History, Geography, Sociology, Philosophy
    const socialScore = (gradePercentages.history * 0.25 + gradePercentages.geography * 0.25 + gradePercentages.sociology * 0.25 + gradePercentages.philosophy * 0.25);
    if (socialScore >= 70) {
      rules.socialSciences.match = Math.min(85, baseScore + (socialScore - 50) * 0.5);
      rules.socialSciences.reasons.push("Strong understanding of social dynamics and human behavior");
    }

    // Economics
    const economicsScore = (gradePercentages.economics * 0.5 + gradePercentages.mathematics * 0.3 + gradePercentages.philosophy * 0.2);
    if (economicsScore >= 70) {
      rules.economics.match = Math.min(87, baseScore + (economicsScore - 50) * 0.6);
      rules.economics.reasons.push("Strong analytical and economic reasoning skills");
    }

    // Philosophy
    const philosophyScore = (gradePercentages.philosophy * 0.5 + gradePercentages.arabic * 0.25 + gradePercentages.history * 0.25);
    if (philosophyScore >= 70) {
      rules.philosophy.match = Math.min(83, baseScore + (philosophyScore - 50) * 0.5);
      rules.philosophy.reasons.push("Deep philosophical thinking and analytical skills");
    }

    // Sort by match score and ensure we have meaningful recommendations
    const sortedRecommendations = Object.values(rules)
      .filter(rule => rule.match >= 30) // Only show if above minimum threshold
      .sort((a, b) => b.match - a.match);

    // Boost the top recommendation if it's too low
    if (sortedRecommendations.length > 0 && sortedRecommendations[0].match < 60) {
      const boost = 65 - sortedRecommendations[0].match;
      sortedRecommendations[0].match = 65;
      sortedRecommendations[0].reasons.push("Best match based on your academic profile");
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
    setGrades({
      arabic: 0,
      english: 0,
      french: 0,
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
                <Label htmlFor="french">French</Label>
                <Input
                  id="french"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={grades.french || ''}
                  onChange={(e) => handleGradeChange('french', e.target.value)}
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
