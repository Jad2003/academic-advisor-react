
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ChevronDown, ChevronUp, Brain, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import JobOpportunities from "@/components/JobOpportunities";
import AdaptivePersonalityAssessment from "@/components/AdaptivePersonalityAssessment";

interface AssessmentResult {
  major: string;
  match: number;
  description: string;
  traits: string[];
}

const PersonalityAssessment = () => {
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [showAllResults, setShowAllResults] = useState(false);

  const handleAssessmentComplete = (assessmentResults: AssessmentResult[]) => {
    setResults(assessmentResults);
    setShowResults(true);
    setShowAllResults(false);
    toast.success("AI Agent analysis complete! Your personality-based recommendations are ready.");
  };

  const resetAssessment = () => {
    setShowResults(false);
    setResults([]);
    setShowAllResults(false);
  };

  const handlePrevious = () => {
    window.history.back();
  };

  const displayedResults = showAllResults ? results : results.slice(0, 3);

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Link to="/" className="mr-4">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">AI Agent Personality Results</h1>
          </div>

          {/* AI Agent Info Banner */}
          <Card className="max-w-4xl mx-auto mb-6 border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="py-4">
              <div className="flex items-center">
                <Cpu className="h-6 w-6 mr-3" />
                <div>
                  <h3 className="font-semibold">Advanced AI Agent Analysis</h3>
                  <p className="text-purple-100 text-sm">LLM-powered reasoning with adaptive question generation and deep personality insights</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {displayedResults.map((result, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full mr-3">
                        #{index + 1}
                      </span>
                      <CardTitle className="text-xl text-gray-900">{result.major}</CardTitle>
                    </div>
                    <div className="flex items-center">
                      <div className="text-2xl font-bold text-purple-600 mr-2">{Math.round(result.match)}%</div>
                      <div className="text-sm text-gray-500">Match</div>
                    </div>
                  </div>
                  <p className="text-gray-600">{result.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">AI agent identified these personality traits:</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.traits.map((trait, idx) => (
                          <span 
                            key={idx} 
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-1000" 
                          style={{ width: `${result.match}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Show More/Less Button */}
            {results.length > 3 && (
              <div className="flex justify-center">
                <Button
                  onClick={() => setShowAllResults(!showAllResults)}
                  variant="outline"
                  className="flex items-center"
                >
                  {showAllResults ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-2" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-2" />
                      Show More ({results.length - 3} more)
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Job Opportunities for Top Recommendation */}
            {results.length > 0 && (
              <JobOpportunities majorName={results[0].major} />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <Button onClick={resetAssessment} variant="outline">
              Retake Assessment
            </Button>
            <Link to="/grades-analysis">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                Try Rule-Based Analysis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8">
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
            <h1 className="text-3xl font-bold text-gray-900">AI Agent Personality Assessment</h1>
            <p className="text-gray-600 mt-2">Advanced AI agent with adaptive reasoning and LLM-powered analysis</p>
          </div>
        </div>

        <AdaptivePersonalityAssessment 
          onComplete={handleAssessmentComplete}
          onPrevious={handlePrevious}
        />
      </div>
    </div>
  );
};

export default PersonalityAssessment;
