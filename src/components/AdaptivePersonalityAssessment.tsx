
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Brain, ChevronRight, Zap } from "lucide-react";
import AutonomousAIAgent from "@/services/aiAgentService";
import type { MajorRecommendation } from "@/services/aiAgentService";

interface Question {
  id: string;
  question: string;
  options: string[];
  category: string;
}

interface AssessmentResult {
  major: string;
  match: number;
  description: string;
  traits: string[];
}

interface AdaptivePersonalityAssessmentProps {
  onComplete: (results: AssessmentResult[]) => void;
  onPrevious: () => void;
}

const AdaptivePersonalityAssessment = ({ onComplete, onPrevious }: AdaptivePersonalityAssessmentProps) => {
  const [agent] = useState(() => new AutonomousAIAgent());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionFlow, setQuestionFlow] = useState<Question[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [agentStatus, setAgentStatus] = useState(agent.getStatus());
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Base questions to start the assessment
  const baseQuestions: Question[] = [
    {
      id: "q1_interest",
      question: "What type of activities naturally draw your attention?",
      options: [
        "Solving complex puzzles and logical problems",
        "Creating art, music, or written content", 
        "Understanding people and social dynamics",
        "Working with technology and systems",
        "Analyzing data and discovering patterns"
      ],
      category: "interest"
    },
    {
      id: "q2_environment",
      question: "In what type of environment do you feel most productive?",
      options: [
        "Quiet, structured spaces for deep thinking",
        "Collaborative, dynamic team settings",
        "Creative studios with flexibility and freedom",
        "Organized labs or technical workshops",
        "Outdoor or varied locations"
      ],
      category: "environment"
    }
  ];

  // Initialize assessment
  useEffect(() => {
    if (questionFlow.length === 0) {
      setQuestionFlow([baseQuestions[0]]);
      agent.reset();
      agent.startAutonomousMode();
    }

    // Update agent status periodically
    const interval = setInterval(() => {
      setAgentStatus(agent.getStatus());
    }, 1000);

    return () => {
      clearInterval(interval);
      agent.stopAutonomousMode();
    };
  }, [agent]);

  const handleAnswer = (value: string) => {
    setCurrentAnswer(value);
  };

  const nextQuestion = async () => {
    const answerIndex = parseInt(currentAnswer);
    const currentQuestion = questionFlow[currentQuestionIndex];
    const selectedOption = currentQuestion.options[answerIndex];
    
    // Record answer with AI agent
    agent.recordAnswer(currentQuestion.id, answerIndex, currentQuestion.question, selectedOption);

    setIsAnalyzing(true);
    
    if (currentQuestionIndex === 0) {
      // After first question, add second base question
      const newFlow = [baseQuestions[0], baseQuestions[1]];
      setQuestionFlow(newFlow);
      setCurrentQuestionIndex(1);
    } else if (currentQuestionIndex < 5) {
      // Generate next adaptive question using AI agent
      const nextAdaptiveQuestion = agent.generateNextQuestion(currentQuestionIndex);
      
      if (nextAdaptiveQuestion) {
        const adaptedQuestion: Question = {
          id: nextAdaptiveQuestion.id,
          question: nextAdaptiveQuestion.question,
          options: nextAdaptiveQuestion.options,
          category: nextAdaptiveQuestion.category
        };
        
        setQuestionFlow(prev => [...prev, adaptedQuestion]);
        setCurrentQuestionIndex(prev => prev + 1);
      }
    } else {
      // Assessment complete - get AI-generated recommendations
      await completeAssessment();
    }

    setCurrentAnswer("");
    setIsAnalyzing(false);
  };

  const completeAssessment = async () => {
    console.log("🎓 Completing AI-driven personality assessment...");
    
    // Get AI-generated recommendations
    const aiRecommendations = agent.generateMajorRecommendations();
    
    // Convert to expected format
    const results: AssessmentResult[] = aiRecommendations.map(rec => ({
      major: rec.major,
      match: rec.match,
      description: rec.description,
      traits: rec.traits
    }));

    console.log("🤖 AI Agent generated recommendations:", results);
    onComplete(results);
  };

  const currentQuestion = questionFlow[currentQuestionIndex];
  const totalQuestions = 6;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Brain className="h-8 w-8 mx-auto mb-4 text-purple-600 animate-pulse" />
          <p className="text-gray-600">AI Agent initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* AI Agent Status */}
      {agentStatus.isActive && (
        <div className="max-w-2xl mx-auto mb-6">
          <Card className="border-0 shadow-sm bg-gradient-to-r from-purple-50 to-indigo-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">AI Agent Active</span>
                </div>
                <div className="text-xs text-purple-600">
                  Analyzing: {agentStatus.answersRecorded} responses
                </div>
              </div>
              {agentStatus.recentDecisions.length > 0 && (
                <div className="mt-2 text-xs text-purple-700">
                  Latest: {agentStatus.recentDecisions[agentStatus.recentDecisions.length - 1]?.action.replace('_', ' ')}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <Brain className="h-6 w-6 mr-2 text-purple-600" />
            {currentQuestion.question}
          </CardTitle>
          {currentQuestionIndex > 1 && (
            <p className="text-sm text-purple-600 mt-2">
              ✨ This question was generated by AI based on your previous answers
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup 
            value={currentAnswer} 
            onValueChange={handleAnswer}
          >
            {currentQuestion.options.map((option, index) => (
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
              onClick={onPrevious} 
              variant="outline"
            >
              Previous
            </Button>
            <Button 
              onClick={nextQuestion}
              disabled={currentAnswer === "" || isAnalyzing}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-pulse" />
                  AI Analyzing...
                </>
              ) : (
                <>
                  {currentQuestionIndex >= 5 ? 'Get AI Results' : 'Next'}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdaptivePersonalityAssessment;
