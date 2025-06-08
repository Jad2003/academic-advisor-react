import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calculator, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import JobOpportunities from "@/components/JobOpportunities";

interface Grades {
  math: number;
  science: number;
  english: number;
  history: number;
  foreignLanguage: number;
  arts: number;
}

interface MajorRecommendation {
  major: string;
  match: number;
  description: string;
  reasons: string[];
}

const GradesAnalysis = () => {
  const [grades, setGrades] = useState<Grades>({
    math: 0,
    science: 0,
    english: 0,
    history: 0,
    foreignLanguage: 0,
    arts: 0,
  });
  const [recommendations, setRecommendations] = useState<MajorRecommendation[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleGradeChange = (subject: keyof Grades, value: string) => {
    const numValue = Math.max(0, Math.min(100, parseInt(value) || 0));
    setGrades(prev => ({ ...prev, [subject]: numValue }));
  };

  const analyzeGrades = () => {
    console.log("Analyzing grades:", grades);
    
    // Rule-based AI logic
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
        major: "English Literature",
        match: 0,
        description: "Analyze literature, writing, and communication.",
        reasons: []
      },
      history: {
        major: "History",
        match: 0,
        description: "Study past events, cultures, and their impact on society.",
        reasons: []
      },
      arts: {
        major: "Fine Arts",
        match: 0,
        description: "Express creativity through visual, performing, or digital arts.",
        reasons: []
      },
      psychology: {
        major: "Psychology",
        match: 0,
        description: "Study human behavior, mental processes, and social interactions.",
        reasons: []
      }
    };

    // Engineering - Strong in Math and Science
    if (grades.math >= 85 && grades.science >= 85) {
      rules.engineering.match += 40;
      rules.engineering.reasons.push("Excellent mathematics and science grades");
    } else if (grades.math >= 75 && grades.science >= 75) {
      rules.engineering.match += 30;
      rules.engineering.reasons.push("Strong mathematics and science performance");
    }

    // Computer Science - Math + logical thinking
    if (grades.math >= 80) {
      rules.computerScience.match += 35;
      rules.computerScience.reasons.push("Strong mathematical reasoning skills");
    }
    if (grades.science >= 75) {
      rules.computerScience.match += 25;
      rules.computerScience.reasons.push("Good analytical and scientific thinking");
    }

    // Medicine - Science + overall academic excellence
    if (grades.science >= 90 && (grades.math + grades.english) / 2 >= 85) {
      rules.medicine.match += 45;
      rules.medicine.reasons.push("Outstanding science performance with strong academics");
    } else if (grades.science >= 80) {
      rules.medicine.match += 35;
      rules.medicine.reasons.push("Strong science foundation");
    }

    // Business - Well-rounded with good communication
    const avgGrade = Object.values(grades).reduce((a, b) => a + b, 0) / Object.values(grades).length;
    if (avgGrade >= 80 && grades.english >= 75) {
      rules.business.match += 35;
      rules.business.reasons.push("Well-rounded academic performance with good communication skills");
    }
    if (grades.math >= 70) {
      rules.business.match += 20;
      rules.business.reasons.push("Adequate quantitative skills for business analysis");
    }

    // Literature - Strong English and Arts
    if (grades.english >= 85) {
      rules.literature.match += 40;
      rules.literature.reasons.push("Excellent language and communication skills");
    }
    if (grades.arts >= 75) {
      rules.literature.match += 25;
      rules.literature.reasons.push("Creative expression abilities");
    }
    if (grades.foreignLanguage >= 80) {
      rules.literature.match += 30;
      rules.literature.reasons.push("Strong language learning aptitude");
    }

    // History - English + History strong
    if (grades.history >= 85 && grades.english >= 75) {
      rules.history.match += 40;
      rules.history.reasons.push("Excellent historical analysis and writing skills");
    } else if (grades.history >= 75) {
      rules.history.match += 30;
      rules.history.reasons.push("Strong interest and ability in historical studies");
    }

    // Fine Arts - Arts primary with creativity
    if (grades.arts >= 85) {
      rules.arts.match += 45;
      rules.arts.reasons.push("Outstanding creative and artistic abilities");
    } else if (grades.arts >= 70) {
      rules.arts.match += 35;
      rules.arts.reasons.push("Good artistic skills and creative potential");
    }

    // Psychology - Good overall with people skills (inferred from language skills)
    if (grades.english >= 80 && grades.foreignLanguage >= 75) {
      rules.psychology.match += 35;
      rules.psychology.reasons.push("Strong communication skills essential for psychology");
    }
    if (avgGrade >= 75) {
      rules.psychology.match += 25;
      rules.psychology.reasons.push("Good overall academic foundation");
    }

    // Cap all scores at 100 and sort
    const sortedRecommendations = Object.values(rules)
      .map(rule => ({ ...rule, match: Math.min(100, rule.match) }))
      .filter(rule => rule.match > 0)
      .sort((a, b) => b.match - a.match)
      .slice(0, 5); // Top 5 recommendations

    // If no strong matches, provide general recommendations
    if (sortedRecommendations.length === 0) {
      sortedRecommendations.push({
        major: "General Studies",
        match: 60,
        description: "Explore various fields to discover your interests and strengths.",
        reasons: ["Consider taking more time to explore different subjects", "Focus on improving grades in areas of interest"]
      });
    }

    setRecommendations(sortedRecommendations);
    setShowResults(true);
    toast.success("Analysis complete! Check your recommendations below.");
  };

  const resetAnalysis = () => {
    setShowResults(false);
    setRecommendations([]);
    setGrades({
      math: 0,
      science: 0,
      english: 0,
      history: 0,
      foreignLanguage: 0,
      arts: 0,
    });
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
            {recommendations.map((rec, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-900">{rec.major}</CardTitle>
                    <div className="flex items-center">
                      <div className="text-2xl font-bold text-blue-600 mr-2">{rec.match}%</div>
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
            <p className="text-gray-600 mt-2">Enter your grades to get personalized major recommendations</p>
          </div>
        </div>

        {/* Grades Input Form */}
        <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <Calculator className="h-6 w-6 mr-2 text-blue-600" />
              Enter Your Grades
            </CardTitle>
            <p className="text-sm text-gray-600">Please enter your grades (0-100) for each subject</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="math">Mathematics</Label>
                <Input
                  id="math"
                  type="number"
                  min="0"
                  max="100"
                  value={grades.math || ''}
                  onChange={(e) => handleGradeChange('math', e.target.value)}
                  placeholder="Enter grade (0-100)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="science">Science</Label>
                <Input
                  id="science"
                  type="number"
                  min="0"
                  max="100"
                  value={grades.science || ''}
                  onChange={(e) => handleGradeChange('science', e.target.value)}
                  placeholder="Enter grade (0-100)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="english">English</Label>
                <Input
                  id="english"
                  type="number"
                  min="0"
                  max="100"
                  value={grades.english || ''}
                  onChange={(e) => handleGradeChange('english', e.target.value)}
                  placeholder="Enter grade (0-100)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="history">History/Social Studies</Label>
                <Input
                  id="history"
                  type="number"
                  min="0"
                  max="100"
                  value={grades.history || ''}
                  onChange={(e) => handleGradeChange('history', e.target.value)}
                  placeholder="Enter grade (0-100)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="foreignLanguage">Foreign Language</Label>
                <Input
                  id="foreignLanguage"
                  type="number"
                  min="0"
                  max="100"
                  value={grades.foreignLanguage || ''}
                  onChange={(e) => handleGradeChange('foreignLanguage', e.target.value)}
                  placeholder="Enter grade (0-100)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arts">Arts/Creative Subjects</Label>
                <Input
                  id="arts"
                  type="number"
                  min="0"
                  max="100"
                  value={grades.arts || ''}
                  onChange={(e) => handleGradeChange('arts', e.target.value)}
                  placeholder="Enter grade (0-100)"
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
