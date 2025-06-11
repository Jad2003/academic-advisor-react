
import { BaseAgent } from './agentCore';

interface PersonalityEnvironment {
  answers: { [questionId: string]: number };
  currentQuestionIndex: number;
  setNextQuestion?: (question: any) => void;
  setRecommendations?: (recommendations: any[]) => void;
}

interface PersonalityProfile {
  traits: { [trait: string]: number };
  interests: string[];
  strengths: string[];
  preferences: string[];
}

export class PersonalityAIAgent extends BaseAgent {
  private questionDatabase = {
    technical: [
      {
        id: "tech_approach",
        question: "When facing a technical challenge, you prefer to:",
        options: [
          "Break it down systematically",
          "Research existing solutions first", 
          "Experiment with creative approaches",
          "Collaborate with others",
          "Apply theoretical knowledge"
        ],
        category: "problem_solving"
      },
      {
        id: "tech_environment",
        question: "Your ideal work environment involves:",
        options: [
          "Cutting-edge technology and tools",
          "Structured development processes",
          "Innovation and experimentation",
          "Team-based problem solving",
          "Independent deep work"
        ],
        category: "work_style"
      }
    ],
    creative: [
      {
        id: "creative_expression",
        question: "Your creative process is driven by:",
        options: [
          "Emotional expression and meaning",
          "Visual aesthetics and design",
          "Innovative concepts and ideas",
          "Cultural and social impact",
          "Technical perfection and craft"
        ],
        category: "motivation"
      },
      {
        id: "creative_collaboration",
        question: "When working on creative projects:",
        options: [
          "You prefer complete artistic freedom",
          "You enjoy structured creative frameworks",
          "You thrive in collaborative environments",
          "You blend traditional and modern approaches",
          "You focus on audience impact"
        ],
        category: "work_style"
      }
    ],
    social: [
      {
        id: "social_impact",
        question: "To make a positive difference, you believe in:",
        options: [
          "Direct individual support and counseling",
          "Educational initiatives and teaching",
          "Systemic change and policy reform",
          "Community organizing and leadership",
          "Research-based solutions"
        ],
        category: "impact_style"
      },
      {
        id: "social_understanding",
        question: "You understand people best through:",
        options: [
          "Deep one-on-one conversations",
          "Observing group dynamics",
          "Studying behavioral patterns",
          "Cultural and historical context",
          "Empirical research and data"
        ],
        category: "analysis_style"
      }
    ]
  };

  sense(environment: PersonalityEnvironment): any {
    // Sensor: Collect personality data and context
    console.log("AI Agent Sensing: Analyzing personality responses and context");
    
    const context = this.knowledgeBase.getContext();
    return {
      answers: environment.answers,
      currentIndex: environment.currentQuestionIndex,
      previousInteractions: context.history || [],
      conversationState: context.memory || {}
    };
  }

  think(inputData: any): any {
    // Brain/Reasoning: LLM-like processing with personality analysis
    console.log("AI Agent Thinking: Processing personality patterns with advanced reasoning");
    
    const { answers, currentIndex } = inputData;
    
    // Store current state
    this.knowledgeBase.store('personality_answers', answers);
    this.knowledgeBase.store('analysis_stage', currentIndex);

    // If we need next question
    if (currentIndex < 6) {
      return this.generateNextQuestion(answers, currentIndex);
    }
    
    // Final analysis - LLM-like reasoning
    return this.performPersonalityAnalysis(answers);
  }

  private generateNextQuestion(answers: { [key: string]: number }, currentIndex: number): any {
    // Dynamic question generation based on previous answers
    let nextQuestion;
    
    if (currentIndex === 0) {
      nextQuestion = {
        id: "q1_primary_interest",
        question: "What type of activities naturally draw your attention?",
        options: [
          "Solving complex puzzles and logical problems",
          "Creating art, music, or written content", 
          "Understanding people and social dynamics",
          "Working with technology and systems",
          "Analyzing data and discovering patterns"
        ],
        category: "interest"
      };
    } else if (currentIndex === 1) {
      nextQuestion = {
        id: "q2_work_environment",
        question: "In what type of environment do you feel most productive?",
        options: [
          "Quiet, structured spaces for deep thinking",
          "Collaborative, dynamic team settings",
          "Creative studios with flexibility",
          "Technical labs and workshops",
          "Varied, outdoor locations"
        ],
        category: "environment"
      };
    } else {
      // Adaptive question selection based on previous answers
      const firstAnswer = answers["q1_primary_interest"] || 0;
      let questionSet;
      
      if (firstAnswer === 0 || firstAnswer === 3 || firstAnswer === 4) {
        questionSet = this.questionDatabase.technical;
      } else if (firstAnswer === 1) {
        questionSet = this.questionDatabase.creative;
      } else {
        questionSet = this.questionDatabase.social;
      }
      
      const questionIndex = Math.min(currentIndex - 2, questionSet.length - 1);
      nextQuestion = questionSet[questionIndex];
    }

    return {
      action: 'provide_question',
      question: nextQuestion,
      reasoning: 'Generated adaptive question based on personality profile'
    };
  }

  private performPersonalityAnalysis(answers: { [key: string]: number }): any {
    // Advanced personality analysis with LLM-like reasoning
    console.log("Performing deep personality analysis...");
    
    // Build personality profile
    const profile = this.buildPersonalityProfile(answers);
    
    // Generate recommendations using multi-factor analysis
    const recommendations = this.generatePersonalityRecommendations(profile, answers);
    
    // Store final analysis
    this.knowledgeBase.store('personality_profile', profile);
    this.knowledgeBase.store('final_recommendations', recommendations);

    return {
      action: 'provide_recommendations',
      recommendations,
      reasoning: 'Completed comprehensive personality analysis',
      profile
    };
  }

  private buildPersonalityProfile(answers: { [key: string]: number }): PersonalityProfile {
    const traits: { [trait: string]: number } = {
      analytical: 0,
      creative: 0,
      social: 0,
      technical: 0,
      leadership: 0,
      empathetic: 0,
      systematic: 0,
      innovative: 0,
      collaborative: 0,
      independent: 0
    };

    // Analyze each answer with weighted scoring
    Object.entries(answers).forEach(([questionId, answerIndex]) => {
      this.updateTraitsFromAnswer(traits, questionId, answerIndex);
    });

    // Determine dominant traits and characteristics
    const sortedTraits = Object.entries(traits).sort(([,a], [,b]) => b - a);
    const dominantTraits = sortedTraits.slice(0, 3);

    return {
      traits,
      interests: this.inferInterests(traits),
      strengths: dominantTraits.map(([trait]) => trait),
      preferences: this.inferPreferences(traits)
    };
  }

  private updateTraitsFromAnswer(traits: { [trait: string]: number }, questionId: string, answerIndex: number): void {
    // Complex trait mapping based on question context and answer
    switch (questionId) {
      case "q1_primary_interest":
        if (answerIndex === 0) { traits.analytical += 4; traits.systematic += 2; }
        if (answerIndex === 1) { traits.creative += 4; traits.innovative += 2; }
        if (answerIndex === 2) { traits.social += 4; traits.empathetic += 3; }
        if (answerIndex === 3) { traits.technical += 4; traits.systematic += 2; }
        if (answerIndex === 4) { traits.analytical += 3; traits.technical += 2; }
        break;
      
      case "q2_work_environment":
        if (answerIndex === 0) { traits.independent += 3; traits.systematic += 2; }
        if (answerIndex === 1) { traits.collaborative += 4; traits.social += 2; }
        if (answerIndex === 2) { traits.creative += 3; traits.innovative += 2; }
        if (answerIndex === 3) { traits.technical += 3; traits.systematic += 2; }
        if (answerIndex === 4) { traits.independent += 2; traits.innovative += 2; }
        break;

      // Add more sophisticated mappings for other questions
      default:
        // Generic trait updates for adaptive questions
        if (answerIndex === 0) traits.systematic += 1;
        if (answerIndex === 1) traits.innovative += 1;
        if (answerIndex === 2) traits.collaborative += 1;
        if (answerIndex === 3) traits.empathetic += 1;
        if (answerIndex === 4) traits.analytical += 1;
    }
  }

  private inferInterests(traits: { [trait: string]: number }): string[] {
    const interests = [];
    if (traits.technical >= 8) interests.push("Technology & Engineering");
    if (traits.creative >= 8) interests.push("Arts & Design");
    if (traits.social >= 8) interests.push("Human Relations & Society");
    if (traits.analytical >= 8) interests.push("Research & Analysis");
    if (traits.leadership >= 6) interests.push("Leadership & Management");
    return interests;
  }

  private inferPreferences(traits: { [trait: string]: number }): string[] {
    const preferences = [];
    if (traits.collaborative > traits.independent) {
      preferences.push("Team-based work");
    } else {
      preferences.push("Independent work");
    }
    
    if (traits.systematic > traits.innovative) {
      preferences.push("Structured approaches");
    } else {
      preferences.push("Creative freedom");
    }
    
    return preferences;
  }

  private generatePersonalityRecommendations(profile: PersonalityProfile, answers: { [key: string]: number }): any[] {
    const recommendations = [];
    const { traits } = profile;

    // Engineering recommendation
    if (traits.technical >= 8 && traits.analytical >= 6) {
      recommendations.push({
        major: "Engineering",
        match: Math.min(95, 65 + (traits.technical + traits.analytical) * 2.5),
        description: "Design innovative solutions combining technical expertise with analytical thinking.",
        traits: ["Technical aptitude", "Analytical problem-solving", "Systematic approach"]
      });
    }

    // Computer Science recommendation  
    if (traits.technical >= 7 && traits.systematic >= 6) {
      recommendations.push({
        major: "Computer Science",
        match: Math.min(92, 62 + (traits.technical + traits.systematic) * 2.8),
        description: "Develop cutting-edge software and computational solutions.",
        traits: ["Technical expertise", "Systematic thinking", "Problem-solving skills"]
      });
    }

    // Psychology recommendation
    if (traits.empathetic >= 8 && traits.social >= 7) {
      recommendations.push({
        major: "Psychology",
        match: Math.min(90, 63 + (traits.empathetic + traits.social) * 3),
        description: "Understand human behavior and help people overcome challenges.",
        traits: ["High empathy", "Social understanding", "Human-centered thinking"]
      });
    }

    // Creative Arts recommendation
    if (traits.creative >= 8 && traits.innovative >= 6) {
      recommendations.push({
        major: "Fine Arts",
        match: Math.min(88, 60 + (traits.creative + traits.innovative) * 3.2),
        description: "Express creativity and bring artistic visions to life.",
        traits: ["Creative expression", "Innovative thinking", "Artistic vision"]
      });
    }

    // Business recommendation
    if (traits.leadership >= 7 && (traits.social >= 6 || traits.analytical >= 6)) {
      recommendations.push({
        major: "Business Administration",
        match: Math.min(85, 58 + (traits.leadership + Math.max(traits.social, traits.analytical)) * 2.5),
        description: "Lead organizations and drive business innovation.",
        traits: ["Leadership qualities", "Strategic thinking", "Business acumen"]
      });
    }

    // Ensure we have at least one recommendation
    if (recommendations.length === 0) {
      recommendations.push({
        major: "Liberal Arts",
        match: 70,
        description: "Explore diverse interests while developing critical thinking skills.",
        traits: ["Well-rounded interests", "Adaptable mindset", "Intellectual curiosity"]
      });
    }

    return recommendations.sort((a, b) => b.match - a.match).slice(0, 3);
  }

  act(action: any, environment: PersonalityEnvironment): void {
    // Actuator: Provide output to environment
    console.log("AI Agent Acting: Delivering personality-based insights");
    
    if (action.action === 'provide_question' && environment.setNextQuestion) {
      environment.setNextQuestion(action.question);
    } else if (action.action === 'provide_recommendations' && environment.setRecommendations) {
      environment.setRecommendations(action.recommendations);
    }
  }

  // Public method to get agent's reasoning and memory
  getAgentInsights(): any {
    const context = this.knowledgeBase.getContext();
    return {
      personalityProfile: context.memory?.personality_profile,
      analysisHistory: context.history,
      currentState: context.memory
    };
  }
}
