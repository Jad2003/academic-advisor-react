
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Brain, ChevronRight, Cpu } from "lucide-react";
import { PersonalityAIAgent } from "@/services/personalityAIAgent";

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [agent] = useState(new PersonalityAIAgent());
  const [agentThinking, setAgentThinking] = useState(false);

  useEffect(() => {
    // Initialize first question through agent
    if (currentQuestionIndex === 0 && !currentQuestion) {
      generateNextQuestion();
    }
  }, []);

  const generateNextQuestion = () => {
    setAgentThinking(true);
    
    // Simulate agent thinking time
    setTimeout(() => {
      const environment = {
        answers,
        currentQuestionIndex,
        setNextQuestion: (question: Question) => {
          setCurrentQuestion(question);
          setAgentThinking(false);
        },
        setRecommendations: (recommendations: AssessmentResult[]) => {
          setAgentThinking(false);
          onComplete(recommendations);
        }
      };

      // Run the AI agent
      agent.run(environment);
    }, 1000);
  };

  const handleAnswer = (value: string) => {
    setCurrentAnswer(value);
  };

  const nextQuestion = () => {
    if (!currentQuestion) return;
    
    const answerIndex = parseInt(currentAnswer);
    
    // Store the answer
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answerIndex }));

    if (currentQuestionIndex >= 5) {
      // Final analysis
      setAgentThinking(true);
      setTimeout(() => {
        const environment = {
          answers: { ...answers, [currentQuestion.id]: answerIndex },
          currentQuestionIndex: currentQuestionIndex + 1,
          setRecommendations: (recommendations: AssessmentResult[]) => {
            setAgentThinking(false);
            onComplete(recommendations);
          }
        };

        agent.run(environment);
      }, 2000); // Longer thinking time for final analysis
    } else {
      // Continue to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentAnswer("");
      generateNextQuestion();
    }
  };

  const totalQuestions = 6;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  if (agentThinking) {
    return (
      <div>
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* AI Agent Thinking Card */}
        <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-white/80 backdrop-blur">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Cpu className="h-16 w-16 text-purple-600 mb-4 animate-pulse" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {currentQuestionIndex >= 5 ? "AI Agent Analyzing Personality" : "AI Agent Generating Question"}
            </h3>
            <p className="text-gray-600 text-center mb-4">
              {currentQuestionIndex >= 5 
                ? "Performing deep personality analysis and generating personalized major recommendations..."
                : "The AI agent is analyzing your previous responses and crafting the next adaptive question..."
              }
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <span className="ml-2">
                {currentQuestionIndex >= 5 ? "Processing personality patterns..." : "Adapting question strategy..."}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* AI Agent Info */}
      <Card className="max-w-2xl mx-auto mb-4 border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardContent className="py-3">
          <div className="flex items-center text-sm">
            <Brain className="h-5 w-5 mr-2" />
            <span>AI Agent Status: Question adapted based on your previous responses</span>
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <Cpu className="h-6 w-6 mr-2 text-purple-600" />
            {currentQuestion.question}
          </CardTitle>
          <p className="text-sm text-gray-500">Category: {currentQuestion.category}</p>
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
              disabled={currentAnswer === ""}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              {currentQuestionIndex >= 5 ? 'Get AI Analysis' : 'Next Question'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdaptivePersonalityAssessment;
