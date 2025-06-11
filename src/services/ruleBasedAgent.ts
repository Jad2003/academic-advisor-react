
import { BaseAgent } from './agentCore';

interface GradesEnvironment {
  grades: { [subject: string]: number };
  getCurrentAnalysis?: () => any;
  setRecommendations?: (recommendations: any[]) => void;
}

interface MajorRule {
  major: string;
  condition: (grades: { [subject: string]: number }) => boolean;
  calculateMatch: (grades: { [subject: string]: number }) => number;
  description: string;
  getReasons: (grades: { [subject: string]: number }) => string[];
}

export class RuleBasedGradesAgent extends BaseAgent {
  private rules: MajorRule[] = [
    {
      major: "Engineering",
      condition: (grades) => grades.mathematics >= 15 && grades.physics >= 14,
      calculateMatch: (grades) => Math.min(95, ((grades.mathematics + grades.physics + grades.chemistry) / 3) * 5),
      description: "Design and build solutions to technical problems using mathematics and science.",
      getReasons: (grades) => [
        `Strong mathematics foundation (${grades.mathematics}/20)`,
        `Excellent physics understanding (${grades.physics}/20)`,
        `STEM subjects alignment`
      ]
    },
    {
      major: "Medicine",
      condition: (grades) => grades.biology >= 15 && grades.chemistry >= 14,
      calculateMatch: (grades) => Math.min(97, ((grades.biology + grades.chemistry + grades.physics) / 3) * 5.2),
      description: "Study human health, disease prevention, and medical treatment.",
      getReasons: (grades) => [
        `Outstanding biology performance (${grades.biology}/20)`,
        `Strong chemistry foundation (${grades.chemistry}/20)`,
        `Medical sciences aptitude`
      ]
    },
    {
      major: "Computer Science",
      condition: (grades) => grades.mathematics >= 14 && (grades.physics >= 13 || grades.economics >= 13),
      calculateMatch: (grades) => Math.min(92, (grades.mathematics * 0.6 + grades.physics * 0.25 + grades.english * 0.15) * 4.6),
      description: "Develop software, algorithms, and computing systems.",
      getReasons: (grades) => [
        `Strong mathematical reasoning (${grades.mathematics}/20)`,
        `Logical problem-solving abilities`,
        `Technical aptitude`
      ]
    },
    {
      major: "Business Administration",
      condition: (grades) => grades.economics >= 14 && grades.mathematics >= 12,
      calculateMatch: (grades) => Math.min(88, ((grades.economics + grades.mathematics + grades.english) / 3) * 4.4),
      description: "Learn management, finance, and organizational leadership.",
      getReasons: (grades) => [
        `Strong economics understanding (${grades.economics}/20)`,
        `Mathematical skills for analysis`,
        `Business acumen indicators`
      ]
    },
    {
      major: "Psychology",
      condition: (grades) => grades.sociology >= 14 && grades.philosophy >= 13,
      calculateMatch: (grades) => Math.min(83, ((grades.sociology + grades.philosophy + grades.biology + grades.english) / 4) * 4.15),
      description: "Study human behavior, mental processes, and therapeutic techniques.",
      getReasons: (grades) => [
        `Understanding of human behavior (${grades.sociology}/20)`,
        `Philosophical thinking abilities`,
        `Social science foundation`
      ]
    }
  ];

  sense(environment: GradesEnvironment): any {
    // Sensor: Collect grades data from environment
    console.log("Rule-based Agent Sensing: Collecting grades data");
    return {
      grades: environment.grades,
      context: this.knowledgeBase.getContext()
    };
  }

  think(inputData: any): any {
    // Brain/Reasoning: Apply rule-based logic
    console.log("Rule-based Agent Thinking: Applying major selection rules");
    
    const { grades } = inputData;
    const recommendations: any[] = [];

    // Store current analysis in knowledge base
    this.knowledgeBase.store('current_grades', grades);
    this.knowledgeBase.store('analysis_timestamp', Date.now());

    // Apply each rule
    for (const rule of this.rules) {
      if (rule.condition(grades)) {
        const match = rule.calculateMatch(grades);
        if (match >= 60) { // Minimum threshold
          recommendations.push({
            major: rule.major,
            match: Math.round(match),
            description: rule.description,
            reasons: rule.getReasons(grades),
            ruleApplied: true
          });
        }
      }
    }

    // Sort by match score
    recommendations.sort((a, b) => b.match - a.match);
    
    // Store recommendations in knowledge base
    this.knowledgeBase.store('recommendations', recommendations);

    return {
      action: 'provide_recommendations',
      recommendations: recommendations.slice(0, 4), // Top 4 recommendations
      reasoning: 'Applied rule-based analysis to grades'
    };
  }

  act(action: any, environment: GradesEnvironment): void {
    // Actuator: Provide recommendations to environment
    console.log("Rule-based Agent Acting: Providing major recommendations");
    
    if (action.action === 'provide_recommendations' && environment.setRecommendations) {
      environment.setRecommendations(action.recommendations);
    }
  }

  // Public method to get agent's knowledge
  getAgentMemory(): any {
    return this.knowledgeBase.getContext();
  }
}
