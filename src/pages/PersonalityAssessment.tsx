import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Brain, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import JobOpportunities from "@/components/JobOpportunities";

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface AssessmentResult {
  major: string;
  match: number;
  description: string;
  traits: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What type of activities do you enjoy most in your free time?",
    options: [
      "Solving puzzles and brain teasers",
      "Reading books and writing",
      "Drawing, painting, or creating art",
      "Playing sports or outdoor activities",
      "Helping friends with their problems"
    ]
  },
  {
    id: 2,
    question: "In group projects, you typically:",
    options: [
      "Take charge and organize the team",
      "Focus on research and analysis",
      "Come up with creative ideas",
      "Ensure everyone gets along well",
      "Handle the technical aspects"
    ]
  },
  {
    id: 3,
    question: "What motivates you most?",
    options: [
      "Making a positive impact on society",
      "Solving complex problems",
      "Creating something beautiful or meaningful",
      "Achieving financial success",
      "Gaining knowledge and understanding"
    ]
  },
  {
    id: 4,
    question: "Your ideal work environment would be:",
    options: [
      "A quiet office with minimal distractions",
      "A dynamic team setting",
      "A creative studio or workshop",
      "Outdoors or various locations",
      "A laboratory or research facility"
    ]
  },
  {
    id: 5,
    question: "When faced with a difficult decision, you:",
    options: [
      "Analyze all available data thoroughly",
      "Trust your intuition and feelings",
      "Ask for advice from others",
      "Consider the impact on everyone involved",
      "Look for creative alternatives"
    ]
  },
  {
    id: 6,
    question: "What subjects did you find most engaging in school?",
    options: [
      "Mathematics and Logic",
      "Literature and History",
      "Art and Music",
      "Science and Technology",
      "Psychology and Social Studies"
    ]
  },
  {
    id: 7,
    question: "Your communication style is best described as:",
    options: [
      "Clear and direct",
      "Thoughtful and detailed",
      "Expressive and emotional",
      "Persuasive and influential",
      "Supportive and empathetic"
    ]
  },
  {
    id: 8,
    question: "What kind of problems do you enjoy solving?",
    options: [
      "Technical and logical challenges",
      "Human relationship issues",
      "Creative design problems",
      "Strategic business challenges",
      "Scientific mysteries"
    ]
  }
];

const PersonalityAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [showAllResults, setShowAllResults] = useState(false);

  const handleAnswer = (value: string) => {
    const answerIndex = parseInt(value);
    setAnswers(prev => ({ ...prev, [currentQuestion]: answerIndex }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      analyzeAnswers();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const analyzeAnswers = () => {
    console.log("Analyzing personality assessment answers:", answers);
    
    // AI-based personality analysis with improved scoring
    const traits = {
      analytical: 0,
      creative: 0,
      social: 0,
      leadership: 0,
      technical: 0,
      empathetic: 0,
      practical: 0
    };

    // Analyze each answer and assign trait scores
    Object.entries(answers).forEach(([questionId, answerIndex]) => {
      const qId = parseInt(questionId);
      
      switch (qId) {
        case 0: // Free time activities
          if (answerIndex === 0) traits.analytical += 3;
          if (answerIndex === 1) traits.creative += 2;
          if (answerIndex === 2) traits.creative += 3;
          if (answerIndex === 3) traits.practical += 2;
          if (answerIndex === 4) traits.empathetic += 3;
          break;
        case 1: // Group projects
          if (answerIndex === 0) traits.leadership += 3;
          if (answerIndex === 1) traits.analytical += 3;
          if (answerIndex === 2) traits.creative += 3;
          if (answerIndex === 3) traits.social += 3;
          if (answerIndex === 4) traits.technical += 3;
          break;
        case 2: // Motivation
          if (answerIndex === 0) traits.empathetic += 3;
          if (answerIndex === 1) traits.analytical += 3;
          if (answerIndex === 2) traits.creative += 3;
          if (answerIndex === 3) traits.practical += 2;
          if (answerIndex === 4) traits.analytical += 2;
          break;
        case 3: // Work environment
          if (answerIndex === 0) traits.analytical += 2;
          if (answerIndex === 1) traits.social += 3;
          if (answerIndex === 2) traits.creative += 3;
          if (answerIndex === 3) traits.practical += 3;
          if (answerIndex === 4) traits.technical += 3;
          break;
        case 4: // Decision making
          if (answerIndex === 0) traits.analytical += 3;
          if (answerIndex === 1) traits.creative += 2;
          if (answerIndex === 2) traits.social += 2;
          if (answerIndex === 3) traits.empathetic += 3;
          if (answerIndex === 4) traits.creative += 3;
          break;
        case 5: // Favorite subjects
          if (answerIndex === 0) traits.analytical += 3;
          if (answerIndex === 1) traits.creative += 2;
          if (answerIndex === 2) traits.creative += 3;
          if (answerIndex === 3) traits.technical += 3;
          if (answerIndex === 4) traits.empathetic += 3;
          break;
        case 6: // Communication style
          if (answerIndex === 0) traits.practical += 2;
          if (answerIndex === 1) traits.analytical += 2;
          if (answerIndex === 2) traits.creative += 3;
          if (answerIndex === 3) traits.leadership += 3;
          if (answerIndex === 4) traits.empathetic += 3;
          break;
        case 7: // Problem solving
          if (answerIndex === 0) traits.technical += 3;
          if (answerIndex === 1) traits.empathetic += 3;
          if (answerIndex === 2) traits.creative += 3;
          if (answerIndex === 3) traits.leadership += 2;
          if (answerIndex === 4) traits.analytical += 3;
          break;
      }
    });

    // Generate major recommendations with better baseline scores
    const majorRecommendations: AssessmentResult[] = [];
    const baseScore = 45; // Minimum baseline score

    // Computer Science/Engineering
    const techScore = traits.technical + traits.analytical;
    if (techScore >= 8) {
      majorRecommendations.push({
        major: "Computer Science",
        match: Math.min(95, baseScore + (techScore * 4)),
        description: "Perfect for logical thinkers who enjoy solving technical problems and building systems.",
        traits: ["Strong analytical thinking", "Technical problem-solving", "Logical reasoning"]
      });
    } else if (techScore >= 5) {
      majorRecommendations.push({
        major: "Computer Science",
        match: Math.min(85, baseScore + (techScore * 3)),
        description: "Perfect for logical thinkers who enjoy solving technical problems and building systems.",
        traits: ["Analytical thinking", "Problem-solving", "Technical aptitude"]
      });
    }

    // Business/Management
    const businessScore = traits.leadership + traits.practical + traits.social;
    if (businessScore >= 10) {
      majorRecommendations.push({
        major: "Business Administration",
        match: Math.min(92, baseScore + (businessScore * 3)),
        description: "Ideal for natural leaders who want to manage teams and drive business success.",
        traits: ["Leadership qualities", "Practical thinking", "Social skills"]
      });
    } else if (businessScore >= 6) {
      majorRecommendations.push({
        major: "Business Administration",
        match: Math.min(80, baseScore + (businessScore * 2.5)),
        description: "Ideal for natural leaders who want to manage teams and drive business success.",
        traits: ["Leadership potential", "Practical approach", "Team-oriented"]
      });
    }

    // Psychology/Social Work
    const psychScore = traits.empathetic + traits.social;
    if (psychScore >= 8) {
      majorRecommendations.push({
        major: "Psychology",
        match: Math.min(90, baseScore + (psychScore * 4)),
        description: "Great for understanding human behavior and helping others overcome challenges.",
        traits: ["High empathy", "Strong social awareness", "Desire to help others"]
      });
    } else if (psychScore >= 5) {
      majorRecommendations.push({
        major: "Psychology",
        match: Math.min(78, baseScore + (psychScore * 3)),
        description: "Great for understanding human behavior and helping others overcome challenges.",
        traits: ["Empathetic nature", "Social understanding", "People skills"]
      });
    }

    // Fine Arts/Creative Fields
    if (traits.creative >= 6) {
      majorRecommendations.push({
        major: "Fine Arts",
        match: Math.min(88, baseScore + (traits.creative * 5)),
        description: "Perfect for expressing creativity and bringing artistic visions to life.",
        traits: ["Strong creative expression", "Artistic vision", "Innovative thinking"]
      });
    }

    // Engineering
    const engineeringScore = traits.technical + traits.analytical + traits.practical;
    if (engineeringScore >= 10) {
      majorRecommendations.push({
        major: "Engineering",
        match: Math.min(93, baseScore + (engineeringScore * 2.5)),
        description: "Excellent for applying scientific principles to solve real-world problems.",
        traits: ["Technical aptitude", "Problem-solving skills", "Practical application"]
      });
    } else if (engineeringScore >= 6) {
      majorRecommendations.push({
        major: "Engineering",
        match: Math.min(82, baseScore + (engineeringScore * 2)),
        description: "Excellent for applying scientific principles to solve real-world problems.",
        traits: ["Technical interest", "Analytical skills", "Problem-solving"]
      });
    }

    // Liberal Arts/Education
    const educationScore = traits.social + traits.empathetic + traits.creative;
    if (educationScore >= 9) {
      majorRecommendations.push({
        major: "Education",
        match: Math.min(87, baseScore + (educationScore * 2.5)),
        description: "Ideal for sharing knowledge and shaping future generations.",
        traits: ["Strong communication", "Empathetic nature", "Love of learning"]
      });
    }

    // Communications/Media
    const commScore = traits.creative + traits.social;
    if (commScore >= 7) {
      majorRecommendations.push({
        major: "Communications",
        match: Math.min(85, baseScore + (commScore * 3)),
        description: "Perfect for storytelling and connecting with diverse audiences.",
        traits: ["Creative communication", "Social awareness", "Media literacy"]
      });
    }

    // Sort by match score and take all recommendations
    let finalResults = majorRecommendations
      .sort((a, b) => b.match - a.match);

    // Ensure we have at least one strong recommendation
    if (finalResults.length === 0 || finalResults[0].match < 60) {
      finalResults.unshift({
        major: "Liberal Arts",
        match: 72,
        description: "A broad field that allows you to explore various interests while developing critical thinking skills.",
        traits: ["Well-rounded interests", "Adaptable", "Open to exploration"]
      });
    }

    // Boost top recommendation if needed
    if (finalResults[0].match < 65) {
      finalResults[0].match = Math.min(85, finalResults[0].match + 15);
      finalResults[0].traits.push("Best overall match for your personality");
    }

    setResults(finalResults);
    setShowResults(true);
    setShowAllResults(false);
    toast.success("Assessment complete! Your personality-based recommendations are ready.");
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResults([]);
    setShowAllResults(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
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
            <h1 className="text-3xl font-bold text-gray-900">Your Personality-Based Recommendations</h1>
          </div>

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
                      <h4 className="font-semibold text-gray-900 mb-2">Your personality traits that align:</h4>
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
                Try Grade Analysis
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
            <h1 className="text-3xl font-bold text-gray-900">Personality Assessment</h1>
            <p className="text-gray-600 mt-2">Answer these questions to discover your ideal major</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <Brain className="h-6 w-6 mr-2 text-purple-600" />
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup 
              value={answers[currentQuestion]?.toString() || ""} 
              onValueChange={handleAnswer}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button 
                onClick={prevQuestion} 
                disabled={currentQuestion === 0}
                variant="outline"
              >
                Previous
              </Button>
              <Button 
                onClick={nextQuestion}
                disabled={answers[currentQuestion] === undefined}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              >
                {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalityAssessment;
