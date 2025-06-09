
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Brain, ChevronRight } from "lucide-react";

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
  const [questionFlow, setQuestionFlow] = useState<Question[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");

  // Base questions that determine the flow
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

  // Follow-up questions based on previous answers
  const adaptiveQuestions: { [key: string]: Question[] } = {
    // Technical/Analytical path
    "technical": [
      {
        id: "q3_technical",
        question: "When working on technical challenges, you prefer:",
        options: [
          "Building and engineering physical systems",
          "Developing software and digital solutions",
          "Analyzing data to find insights",
          "Researching scientific phenomena",
          "Designing user-friendly interfaces"
        ],
        category: "technical_focus"
      },
      {
        id: "q4_problem_solving",
        question: "Your approach to complex problems is:",
        options: [
          "Break down into mathematical components",
          "Use systematic, step-by-step methods",
          "Apply creative, unconventional solutions",
          "Research existing solutions and improve them",
          "Collaborate with others to find answers"
        ],
        category: "problem_approach"
      }
    ],
    
    // Creative path
    "creative": [
      {
        id: "q3_creative",
        question: "Your creative expression tends toward:",
        options: [
          "Visual arts and design",
          "Writing and storytelling",
          "Music and performance",
          "Digital media and technology",
          "Crafts and hands-on creation"
        ],
        category: "creative_focus"
      },
      {
        id: "q4_inspiration",
        question: "You find inspiration primarily from:",
        options: [
          "Human emotions and experiences",
          "Nature and the physical world",
          "Cultural and historical contexts",
          "Future possibilities and innovation",
          "Personal introspection and philosophy"
        ],
        category: "inspiration_source"
      }
    ],

    // Social/People path
    "social": [
      {
        id: "q3_social",
        question: "When helping others, you prefer to:",
        options: [
          "Provide direct counseling and support",
          "Teach and share knowledge",
          "Advocate for systemic change",
          "Lead and organize group efforts",
          "Research solutions to social problems"
        ],
        category: "helping_style"
      },
      {
        id: "q4_impact",
        question: "The kind of impact you want to make is:",
        options: [
          "Individual healing and personal growth",
          "Educational advancement and learning",
          "Social justice and policy change",
          "Community building and organization",
          "Cultural preservation and development"
        ],
        category: "desired_impact"
      }
    ]
  };

  // Initialize question flow
  useState(() => {
    if (questionFlow.length === 0) {
      setQuestionFlow([baseQuestions[0]]);
    }
  });

  const handleAnswer = (value: string) => {
    setCurrentAnswer(value);
  };

  const nextQuestion = () => {
    const answerIndex = parseInt(currentAnswer);
    const currentQuestion = questionFlow[currentQuestionIndex];
    
    // Store the answer
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answerIndex }));

    // Determine next questions based on current answer and flow
    if (currentQuestionIndex === 0) {
      // After first question, add second base question
      const newFlow = [...questionFlow, baseQuestions[1]];
      setQuestionFlow(newFlow);
      setCurrentQuestionIndex(1);
    } else if (currentQuestionIndex === 1) {
      // After second question, determine adaptive path
      const firstAnswer = answers["q1_interest"];
      let adaptivePath: string;

      if (firstAnswer === 0 || firstAnswer === 3 || firstAnswer === 4) {
        adaptivePath = "technical";
      } else if (firstAnswer === 1) {
        adaptivePath = "creative";
      } else {
        adaptivePath = "social";
      }

      // Add adaptive questions
      const newFlow = [...questionFlow, ...adaptiveQuestions[adaptivePath]];
      setQuestionFlow(newFlow);
      setCurrentQuestionIndex(2);
    } else if (currentQuestionIndex < questionFlow.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Assessment complete
      analyzeResults();
    }

    setCurrentAnswer("");
  };

  const analyzeResults = () => {
    console.log("Analyzing adaptive personality assessment:", answers);
    
    // Enhanced analysis based on adaptive responses
    const traits = {
      analytical: 0,
      creative: 0,
      social: 0,
      technical: 0,
      leadership: 0,
      empathetic: 0,
      practical: 0,
      research: 0
    };

    // Analyze answers with weighted scoring
    Object.entries(answers).forEach(([questionId, answerIndex]) => {
      switch (questionId) {
        case "q1_interest":
          if (answerIndex === 0) { traits.analytical += 4; traits.technical += 2; }
          if (answerIndex === 1) { traits.creative += 4; traits.empathetic += 1; }
          if (answerIndex === 2) { traits.social += 4; traits.empathetic += 2; }
          if (answerIndex === 3) { traits.technical += 4; traits.practical += 2; }
          if (answerIndex === 4) { traits.analytical += 3; traits.research += 3; }
          break;

        case "q2_environment":
          if (answerIndex === 0) { traits.analytical += 3; traits.research += 2; }
          if (answerIndex === 1) { traits.social += 3; traits.leadership += 2; }
          if (answerIndex === 2) { traits.creative += 3; traits.empathetic += 1; }
          if (answerIndex === 3) { traits.technical += 3; traits.practical += 2; }
          if (answerIndex === 4) { traits.practical += 3; traits.social += 1; }
          break;

        case "q3_technical":
          if (answerIndex === 0) { traits.technical += 4; traits.practical += 3; }
          if (answerIndex === 1) { traits.technical += 4; traits.analytical += 2; }
          if (answerIndex === 2) { traits.analytical += 4; traits.research += 2; }
          if (answerIndex === 3) { traits.research += 4; traits.analytical += 2; }
          if (answerIndex === 4) { traits.creative += 2; traits.technical += 3; }
          break;

        case "q3_creative":
          if (answerIndex === 0) { traits.creative += 4; traits.practical += 1; }
          if (answerIndex === 1) { traits.creative += 4; traits.empathetic += 2; }
          if (answerIndex === 2) { traits.creative += 4; traits.social += 1; }
          if (answerIndex === 3) { traits.creative += 3; traits.technical += 2; }
          if (answerIndex === 4) { traits.creative += 3; traits.practical += 2; }
          break;

        case "q3_social":
          if (answerIndex === 0) { traits.empathetic += 4; traits.social += 2; }
          if (answerIndex === 1) { traits.social += 3; traits.leadership += 2; }
          if (answerIndex === 2) { traits.leadership += 3; traits.social += 3; }
          if (answerIndex === 3) { traits.leadership += 4; traits.social += 2; }
          if (answerIndex === 4) { traits.research += 3; traits.social += 2; }
          break;
      }
    });

    // Generate recommendations based on dominant traits
    const recommendations: AssessmentResult[] = [];
    const maxScore = Math.max(...Object.values(traits));
    const threshold = Math.max(6, maxScore * 0.7);

    // Engineering
    if (traits.technical + traits.analytical >= 8 && traits.practical >= 3) {
      recommendations.push({
        major: "Engineering",
        match: Math.min(95, 65 + (traits.technical + traits.analytical) * 3),
        description: "Design and build innovative solutions to complex technical challenges.",
        traits: ["Strong technical aptitude", "Analytical problem-solving", "Practical application skills"]
      });
    }

    // Computer Science
    if (traits.technical >= 5 && traits.analytical >= 4) {
      recommendations.push({
        major: "Computer Science", 
        match: Math.min(92, 62 + (traits.technical + traits.analytical) * 2.5),
        description: "Develop cutting-edge software and computational solutions.",
        traits: ["Technical expertise", "Logical reasoning", "System design thinking"]
      });
    }

    // Psychology
    if (traits.empathetic >= 5 && traits.social >= 4) {
      recommendations.push({
        major: "Psychology",
        match: Math.min(90, 63 + (traits.empathetic + traits.social) * 3),
        description: "Understand human behavior and help people overcome challenges.",
        traits: ["High empathy", "Social understanding", "Research interest in human behavior"]
      });
    }

    // Creative Fields
    if (traits.creative >= 6) {
      recommendations.push({
        major: "Fine Arts",
        match: Math.min(88, 60 + traits.creative * 4),
        description: "Express creativity and bring artistic visions to life.",
        traits: ["Strong creative expression", "Artistic vision", "Innovative thinking"]
      });
    }

    // Business
    if (traits.leadership >= 4 && (traits.practical >= 3 || traits.social >= 3)) {
      recommendations.push({
        major: "Business Administration",
        match: Math.min(85, 58 + (traits.leadership + traits.practical) * 2.5),
        description: "Lead organizations and drive business innovation.",
        traits: ["Leadership qualities", "Strategic thinking", "Business acumen"]
      });
    }

    // Research-focused fields
    if (traits.research >= 5 && traits.analytical >= 4) {
      recommendations.push({
        major: "Research Sciences",
        match: Math.min(87, 61 + (traits.research + traits.analytical) * 2.8),
        description: "Conduct research to advance human knowledge and understanding.",
        traits: ["Research methodology", "Analytical thinking", "Scientific curiosity"]
      });
    }

    // Sort and limit recommendations
    const finalResults = recommendations
      .sort((a, b) => b.match - a.match)
      .slice(0, 4); // Limit to top 4 for precision

    // Ensure we have at least one recommendation
    if (finalResults.length === 0) {
      finalResults.push({
        major: "Liberal Arts",
        match: 70,
        description: "Explore diverse interests while developing critical thinking and communication skills.",
        traits: ["Well-rounded interests", "Adaptable mindset", "Broad intellectual curiosity"]
      });
    }

    onComplete(finalResults);
  };

  const currentQuestion = questionFlow[currentQuestionIndex];
  const progress = questionFlow.length > 0 ? ((currentQuestionIndex + 1) / Math.min(questionFlow.length, 6)) * 100 : 0;

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {Math.min(questionFlow.length, 6)}</span>
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
              {currentQuestionIndex >= questionFlow.length - 1 ? 'Get Results' : 'Next'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdaptivePersonalityAssessment;
