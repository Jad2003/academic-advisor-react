
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calculator, BookOpen, ChevronDown, ChevronUp, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import JobOpportunities from "@/components/JobOpportunities";
import { RuleBasedGradesAgent } from "@/services/ruleBasedAgent";

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

const GradesAnalysis = () => {
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
  const [agent] = useState(new RuleBasedGradesAgent());
  const [agentThinking, setAgentThinking] = useState(false);

  const handleGradeChange = (subject: keyof Grades, value: string) => {
    const numValue = Math.max(0, Math.min(20, parseFloat(value) || 0));
    setGrades(prev => ({ ...prev, [subject]: numValue }));
  };

  const analyzeGrades = () => {
    console.log("Starting Rule-Based Agent Analysis...");
    setAgentThinking(true);
    
    // Simulate agent thinking time
    setTimeout(() => {
      // Create environment for the agent
      const environment = {
        grades,
        setRecommendations: (recs: MajorRecommendation[]) => {
          setRecommendations(recs);
          setShowResults(true);
          setShowAllRecommendations(false);
          setAgentThinking(false);
          toast.success("Rule-based agent analysis complete! Your recommendations are ready.");
        }
      };

      // Run the rule-based agent
      agent.run(environment);
    }, 1500); // Simulate thinking time
  };

  const resetAnalysis = () => {
    setShowResults(false);
    setRecommendations([]);
    setShowAllRecommendations(false);
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

  if (agentThinking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Link to="/" className="mr-4">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Rule-Based Agent Analysis</h1>
          </div>
          
          <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Brain className="h-16 w-16 text-blue-600 mb-4 animate-pulse" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Agent Analyzing Your Grades</h3>
              <p className="text-gray-600 text-center mb-4">
                The rule-based agent is processing your academic performance and applying specialized rules to determine your best major matches...
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <span className="ml-2">Applying decision rules...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Rule-Based Agent Results</h1>
          </div>

          {/* Agent Info Banner */}
          <Card className="max-w-4xl mx-auto mb-6 border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="py-4">
              <div className="flex items-center">
                <Brain className="h-6 w-6 mr-3" />
                <div>
                  <h3 className="font-semibold">Rule-Based AI Agent Analysis</h3>
                  <p className="text-blue-100 text-sm">Applied {recommendations.length} specialized rules based on your grade patterns</p>
                </div>
              </div>
            </CardContent>
          </Card>

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
                    <h4 className="font-semibold text-gray-900">Rule-based analysis shows:</h4>
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
                Try AI Agent Assessment
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
            <h1 className="text-3xl font-bold text-gray-900">Rule-Based Agent Analysis</h1>
            <p className="text-gray-600 mt-2">Enter your grades for intelligent rule-based major recommendations</p>
          </div>
        </div>

        {/* Grades Input Form */}
        <Card className="max-w-4xl mx-auto border-0 shadow-lg bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <Calculator className="h-6 w-6 mr-2 text-blue-600" />
              Enter Your Lebanese Baccalaureate Grades
            </CardTitle>
            <p className="text-sm text-gray-600">The rule-based agent will analyze your grades (0-20) using specialized decision rules</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(grades).map(([subject, value]) => (
                <div key={subject} className="space-y-2">
                  <Label htmlFor={subject} className="capitalize">
                    {subject === 'arabic' ? 'Arabic' : 
                     subject === 'english' ? 'English' :
                     subject === 'mathematics' ? 'Mathematics' :
                     subject === 'physics' ? 'Physics' :
                     subject === 'chemistry' ? 'Chemistry' :
                     subject === 'biology' ? 'Biology' :
                     subject === 'history' ? 'History' :
                     subject === 'geography' ? 'Geography' :
                     subject === 'philosophy' ? 'Philosophy' :
                     subject === 'economics' ? 'Economics' :
                     'Sociology'}
                  </Label>
                  <Input
                    id={subject}
                    type="number"
                    min="0"
                    max="20"
                    step="0.1"
                    value={value || ''}
                    onChange={(e) => handleGradeChange(subject as keyof Grades, e.target.value)}
                    placeholder="Grade (0-20)"
                  />
                </div>
              ))}
            </div>

            <Button 
              onClick={analyzeGrades} 
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3"
            >
              <Brain className="h-5 w-5 mr-2" />
              Start Rule-Based Agent Analysis
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GradesAnalysis;
