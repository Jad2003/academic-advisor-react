import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Brain, ChevronRight } from "lucide-react";

type AssessmentEngineType = "rule" | "ml";

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
  onComplete: (assessmentResults: any) => void;
  onPrevious?: () => void;
}

const AdaptivePersonalityAssessment = ({
  onComplete,
  onPrevious,
}: AdaptivePersonalityAssessmentProps) => {
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
      },
      {
        id: "q5_technical_career",
        question: "In your ideal career, you would:",
        options: [
          "Design and build innovative products",
          "Lead technical teams and projects",
          "Research cutting-edge technologies",
          "Solve real-world engineering problems",
          "Develop algorithms and software systems"
        ],
        category: "career_preference"
      },
      {
        id: "q6_technical_impact",
        question: "The impact you want to make through technology is:",
        options: [
          "Improving healthcare and medicine",
          "Advancing space exploration and science",
          "Creating sustainable energy solutions",
          "Developing artificial intelligence",
          "Building communication technologies"
        ],
        category: "impact_area"
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
      },
      {
        id: "q5_creative_work",
        question: "When working on creative projects, you prefer:",
        options: [
          "Complete artistic freedom",
          "Collaborative creative processes",
          "Structured creative frameworks",
          "Technology-enhanced creativity",
          "Traditional artistic methods"
        ],
        category: "creative_process"
      },
      {
        id: "q6_creative_goal",
        question: "Your ultimate creative goal is to:",
        options: [
          "Express deep personal truths",
          "Entertain and bring joy to others",
          "Challenge social conventions",
          "Preserve cultural heritage",
          "Innovate new forms of expression"
        ],
        category: "creative_mission"
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
      },
      {
        id: "q5_social_approach",
        question: "Your approach to understanding people is:",
        options: [
          "Through deep one-on-one conversations",
          "By studying group dynamics and behavior",
          "Through research and data analysis",
          "By observing cultural patterns",
          "Through historical and philosophical study"
        ],
        category: "understanding_method"
      },
      {
        id: "q6_social_change",
        question: "To create positive change, you believe in:",
        options: [
          "Grassroots community organizing",
          "Education and awareness campaigns",
          "Policy reform and legislation",
          "Individual empowerment and therapy",
          "Research and evidence-based solutions"
        ],
        category: "change_philosophy"
      }
    ]
  };

  // Initialize question flow with exactly 6 questions
  useEffect(() => {
    if (questionFlow.length === 0) {
      setQuestionFlow([baseQuestions[0]]);
    }
  }, []);

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
      // After first question, add second base question and determine path
      const firstAnswer = answerIndex;
      let adaptivePath: string;

      if (firstAnswer === 0 || firstAnswer === 3 || firstAnswer === 4) {
        adaptivePath = "technical";
      } else if (firstAnswer === 1) {
        adaptivePath = "creative";
      } else {
        adaptivePath = "social";
      }

      // Build the complete flow: base questions + 4 adaptive questions = 6 total
      const newFlow = [
        baseQuestions[0],
        baseQuestions[1],
        ...adaptiveQuestions[adaptivePath]
      ];
      setQuestionFlow(newFlow);
      setCurrentQuestionIndex(1);
    } else if (currentQuestionIndex < 5) {
      // Continue through the predetermined flow
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Assessment complete (after 6 questions)
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
      research: 0,
      innovative: 0,
      collaborative: 0
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
          if (answerIndex === 1) { traits.social += 3; traits.leadership += 2; traits.collaborative += 3; }
          if (answerIndex === 2) { traits.creative += 3; traits.innovative += 2; }
          if (answerIndex === 3) { traits.technical += 3; traits.practical += 2; }
          if (answerIndex === 4) { traits.practical += 3; traits.social += 1; }
          break;

        case "q3_technical":
          if (answerIndex === 0) { traits.technical += 4; traits.practical += 3; }
          if (answerIndex === 1) { traits.technical += 4; traits.analytical += 2; traits.innovative += 2; }
          if (answerIndex === 2) { traits.analytical += 4; traits.research += 2; }
          if (answerIndex === 3) { traits.research += 4; traits.analytical += 2; }
          if (answerIndex === 4) { traits.creative += 2; traits.technical += 3; }
          break;

        case "q3_creative":
          if (answerIndex === 0) { traits.creative += 4; traits.practical += 1; }
          if (answerIndex === 1) { traits.creative += 4; traits.empathetic += 2; }
          if (answerIndex === 2) { traits.creative += 4; traits.social += 1; }
          if (answerIndex === 3) { traits.creative += 3; traits.technical += 2; traits.innovative += 2; }
          if (answerIndex === 4) { traits.creative += 3; traits.practical += 2; }
          break;

        case "q3_social":
          if (answerIndex === 0) { traits.empathetic += 4; traits.social += 2; }
          if (answerIndex === 1) { traits.social += 3; traits.leadership += 2; }
          if (answerIndex === 2) { traits.leadership += 3; traits.social += 3; }
          if (answerIndex === 3) { traits.leadership += 4; traits.social += 2; traits.collaborative += 2; }
          if (answerIndex === 4) { traits.research += 3; traits.social += 2; }
          break;

        // Additional scoring for questions 4-6
        case "q4_problem_solving":
        case "q4_inspiration":
        case "q4_impact":
          // Add scoring based on the specific question context
          if (answerIndex === 0) { traits.analytical += 2; }
          if (answerIndex === 1) { traits.practical += 2; }
          if (answerIndex === 2) { traits.creative += 2; traits.innovative += 1; }
          if (answerIndex === 3) { traits.research += 2; }
          if (answerIndex === 4) { traits.collaborative += 2; }
          break;
      }
    });

    // Generate recommendations based on dominant traits
    const recommendations: AssessmentResult[] = [];

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

    // Architecture
    if (traits.creative >= 4 && traits.technical >= 3 && traits.practical >= 3) {
      recommendations.push({
        major: "Architecture",
        match: Math.min(88, 60 + (traits.creative + traits.technical) * 2.5),
        description: "Design buildings and spaces that blend creativity with technical precision.",
        traits: ["Creative design skills", "Technical understanding", "Spatial reasoning"]
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

    // Medicine
    if (traits.empathetic >= 4 && traits.analytical >= 4 && traits.practical >= 3) {
      recommendations.push({
        major: "Medicine",
        match: Math.min(93, 65 + (traits.empathetic + traits.analytical) * 2.8),
        description: "Combine scientific knowledge with compassionate patient care.",
        traits: ["Empathetic nature", "Analytical thinking", "Practical problem-solving"]
      });
    }

    // Creative Fields (Fine Arts, Graphic Design)
    if (traits.creative >= 6) {
      const artField = traits.innovative >= 3 ? "Graphic Design" : "Fine Arts";
      recommendations.push({
        major: artField,
        match: Math.min(88, 60 + traits.creative * 4),
        description: traits.innovative >= 3 ? 
          "Create visual communications that blend artistry with technology." :
          "Express creativity and bring artistic visions to life through traditional and contemporary media.",
        traits: ["Strong creative expression", "Artistic vision", "Innovative thinking"]
      });
    }

    // Business Administration
    if (traits.leadership >= 4 && (traits.practical >= 3 || traits.social >= 3)) {
      recommendations.push({
        major: "Business Administration",
        match: Math.min(85, 58 + (traits.leadership + traits.practical) * 2.5),
        description: "Lead organizations and drive business innovation.",
        traits: ["Leadership qualities", "Strategic thinking", "Business acumen"]
      });
    }

    // International Relations
    if (traits.social >= 4 && traits.collaborative >= 3 && traits.analytical >= 3) {
      recommendations.push({
        major: "International Relations",
        match: Math.min(82, 60 + (traits.social + traits.collaborative) * 2.5),
        description: "Navigate global politics and foster international cooperation.",
        traits: ["Global perspective", "Collaborative skills", "Political analysis"]
      });
    }

    // Research Sciences
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
      .slice(0, 3); // Limit to top 3 for precision

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
  const totalQuestions = 6;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const [engine, setEngine] = useState<AssessmentEngineType>("rule");
  const [isLoading, setIsLoading] = useState(false);

  const handleEngineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEngine(e.target.value as AssessmentEngineType);
  };

  const submitAssessment = (assessmentPayload: any) => {
    setIsLoading(true);
    fetch(`/api/personality-analysis?engine=${engine}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(assessmentPayload),
    })
    .then((res) => res.json())
    .then((data) => {
      onComplete(data.recommendations ?? []);
    })
    .catch(() => {/* error toast handled by parent */})
    .finally(() => setIsLoading(false));
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <label htmlFor="engine" className="font-semibold text-gray-800">
          Select Engine:
        </label>
        <select
          id="engine"
          value={engine}
          onChange={handleEngineChange}
          className="border border-gray-300 rounded py-1 px-3"
        >
          <option value="rule">Rule-based</option>
          <option value="ml">ML-based</option>
        </select>
      </div>
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
              {currentQuestionIndex >= 5 ? 'Get Results' : 'Next'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdaptivePersonalityAssessment;
