
// AI Agent Service - Autonomous decision-making and goal-driven behavior
export interface StudentProfile {
  id: string;
  grades?: Record<string, number>;
  personalityTraits?: string[];
  goals: string[];
  currentMajor?: string;
  careerInterests: string[];
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  academicLevel: 'high_school' | 'undergraduate' | 'graduate';
}

export interface AgentDecision {
  action: 'recommend_major' | 'suggest_courses' | 'identify_gaps' | 'provide_feedback';
  confidence: number;
  reasoning: string[];
  data: any;
  nextSteps: string[];
}

export interface LearningGoal {
  id: string;
  title: string;
  description: string;
  targetMajor: string;
  priority: 'high' | 'medium' | 'low';
  deadline?: Date;
  progress: number;
}

class AutonomousAIAgent {
  private studentProfiles: Map<string, StudentProfile> = new Map();
  private learningGoals: Map<string, LearningGoal[]> = new Map();
  
  // Goal-driven decision making
  async makeAutonomousDecision(studentId: string): Promise<AgentDecision> {
    console.log(`AI Agent making autonomous decision for student: ${studentId}`);
    
    const profile = this.studentProfiles.get(studentId);
    if (!profile) {
      return this.createNewStudentPath(studentId);
    }

    // Analyze current state and goals
    const currentState = this.analyzeStudentState(profile);
    const goals = this.learningGoals.get(studentId) || [];
    
    // Make decision based on AI logic
    if (currentState.needsMajorRecommendation) {
      return this.decideMajorRecommendation(profile);
    } else if (currentState.hasKnowledgeGaps) {
      return this.identifyLearningGaps(profile);
    } else if (currentState.needsCareerGuidance) {
      return this.provideCareerGuidance(profile);
    } else {
      return this.provideContinuousSupport(profile);
    }
  }

  private analyzeStudentState(profile: StudentProfile) {
    return {
      needsMajorRecommendation: !profile.currentMajor,
      hasKnowledgeGaps: this.detectKnowledgeGaps(profile),
      needsCareerGuidance: profile.careerInterests.length === 0,
      completionRate: this.calculateProfileCompleteness(profile)
    };
  }

  private detectKnowledgeGaps(profile: StudentProfile): boolean {
    if (!profile.grades) return true;
    
    const gradeValues = Object.values(profile.grades);
    const avgGrade = gradeValues.reduce((a, b) => a + b, 0) / gradeValues.length;
    const weakSubjects = Object.entries(profile.grades)
      .filter(([_, grade]) => grade < avgGrade * 0.8)
      .length;
    
    return weakSubjects > 2;
  }

  private calculateProfileCompleteness(profile: StudentProfile): number {
    let completeness = 0;
    if (profile.grades && Object.keys(profile.grades).length > 0) completeness += 30;
    if (profile.personalityTraits && profile.personalityTraits.length > 0) completeness += 25;
    if (profile.goals.length > 0) completeness += 20;
    if (profile.careerInterests.length > 0) completeness += 15;
    if (profile.currentMajor) completeness += 10;
    return completeness;
  }

  private async decideMajorRecommendation(profile: StudentProfile): Promise<AgentDecision> {
    const reasoning = [
      "Student lacks a chosen major",
      "Analyzing academic performance and personality traits",
      "Applying dual AI approach: rule-based + ML prediction"
    ];

    // Simulate advanced AI logic combining both approaches
    const ruleBasedScore = this.calculateRuleBasedRecommendation(profile);
    const mlScore = this.simulateMLRecommendation(profile);
    
    const combinedRecommendation = this.combineAIApproaches(ruleBasedScore, mlScore);

    return {
      action: 'recommend_major',
      confidence: combinedRecommendation.confidence,
      reasoning,
      data: {
        recommendedMajors: combinedRecommendation.majors,
        methodology: 'hybrid_ai_approach',
        ruleBasedWeight: 0.6,
        mlWeight: 0.4
      },
      nextSteps: [
        'Review recommended majors',
        'Complete personality assessment if not done',
        'Explore career opportunities',
        'Set learning goals'
      ]
    };
  }

  private calculateRuleBasedRecommendation(profile: StudentProfile) {
    // Enhanced rule-based logic
    const recommendations = [];
    
    if (profile.grades) {
      const stemAvg = this.calculateSTEMAverage(profile.grades);
      const humanitiesAvg = this.calculateHumanitiesAverage(profile.grades);
      
      if (stemAvg > 85) {
        recommendations.push({ major: 'Engineering', score: stemAvg });
        recommendations.push({ major: 'Computer Science', score: stemAvg * 0.9 });
      }
      
      if (humanitiesAvg > 80) {
        recommendations.push({ major: 'Literature', score: humanitiesAvg });
        recommendations.push({ major: 'Psychology', score: humanitiesAvg * 0.85 });
      }
    }

    return recommendations.sort((a, b) => b.score - a.score);
  }

  private simulateMLRecommendation(profile: StudentProfile) {
    // Simulate ML model prediction
    const features = this.extractFeatures(profile);
    const mlPredictions = [
      { major: 'Computer Science', probability: 0.78 },
      { major: 'Business Administration', probability: 0.65 },
      { major: 'Engineering', probability: 0.72 },
      { major: 'Psychology', probability: 0.58 }
    ];

    return mlPredictions.sort((a, b) => b.probability - a.probability);
  }

  private combineAIApproaches(ruleBasedResults: any[], mlResults: any[]) {
    // Combine both AI approaches for better accuracy
    const combinedScores = new Map();
    
    // Weight rule-based results
    ruleBasedResults.forEach(result => {
      combinedScores.set(result.major, (result.score / 100) * 0.6);
    });

    // Add ML results
    mlResults.forEach(result => {
      const existing = combinedScores.get(result.major) || 0;
      combinedScores.set(result.major, existing + (result.probability * 0.4));
    });

    const sortedResults = Array.from(combinedScores.entries())
      .map(([major, score]) => ({ major, score }))
      .sort((a, b) => b.score - a.score);

    return {
      majors: sortedResults.slice(0, 3),
      confidence: sortedResults[0]?.score || 0.5
    };
  }

  private extractFeatures(profile: StudentProfile): number[] {
    // Extract numerical features for ML model
    const features = [];
    
    if (profile.grades) {
      features.push(...Object.values(profile.grades));
    }
    
    features.push(profile.careerInterests.length);
    features.push(profile.goals.length);
    features.push(profile.personalityTraits?.length || 0);
    
    return features;
  }

  private calculateSTEMAverage(grades: Record<string, number>): number {
    const stemSubjects = ['mathematics', 'physics', 'chemistry', 'biology'];
    const stemGrades = stemSubjects
      .filter(subject => grades[subject])
      .map(subject => grades[subject]);
    
    return stemGrades.length > 0 
      ? stemGrades.reduce((a, b) => a + b, 0) / stemGrades.length 
      : 0;
  }

  private calculateHumanitiesAverage(grades: Record<string, number>): number {
    const humanitiesSubjects = ['arabic', 'english', 'history', 'philosophy'];
    const humanitiesGrades = humanitiesSubjects
      .filter(subject => grades[subject])
      .map(subject => grades[subject]);
    
    return humanitiesGrades.length > 0 
      ? humanitiesGrades.reduce((a, b) => a + b, 0) / humanitiesGrades.length 
      : 0;
  }

  private async identifyLearningGaps(profile: StudentProfile): Promise<AgentDecision> {
    const gaps = this.analyzeKnowledgeGaps(profile);
    
    return {
      action: 'identify_gaps',
      confidence: 0.85,
      reasoning: [
        'Detected knowledge gaps in student performance',
        'Analyzing weak subject areas',
        'Recommending targeted improvement strategies'
      ],
      data: {
        gaps,
        improvementPlan: this.createImprovementPlan(gaps)
      },
      nextSteps: [
        'Focus on identified weak areas',
        'Complete additional assessments',
        'Set specific learning goals'
      ]
    };
  }

  private analyzeKnowledgeGaps(profile: StudentProfile) {
    if (!profile.grades) return [];
    
    const avgGrade = Object.values(profile.grades).reduce((a, b) => a + b, 0) / Object.values(profile.grades).length;
    
    return Object.entries(profile.grades)
      .filter(([_, grade]) => grade < avgGrade * 0.8)
      .map(([subject, grade]) => ({
        subject,
        currentGrade: grade,
        targetGrade: Math.min(20, avgGrade),
        improvementNeeded: Math.min(20, avgGrade) - grade
      }));
  }

  private createImprovementPlan(gaps: any[]) {
    return gaps.map(gap => ({
      subject: gap.subject,
      recommendedActions: [
        `Focus on ${gap.subject} fundamentals`,
        `Practice additional ${gap.subject} problems`,
        `Seek tutoring in ${gap.subject}`
      ],
      timeframe: '4-6 weeks',
      expectedImprovement: gap.improvementNeeded
    }));
  }

  private async provideCareerGuidance(profile: StudentProfile): Promise<AgentDecision> {
    return {
      action: 'provide_feedback',
      confidence: 0.75,
      reasoning: [
        'Student needs career direction',
        'Analyzing academic strengths',
        'Matching with career opportunities'
      ],
      data: {
        recommendedCareers: this.suggestCareers(profile),
        nextSteps: 'Complete interest assessment'
      },
      nextSteps: [
        'Explore career options',
        'Complete interest surveys',
        'Research job market trends'
      ]
    };
  }

  private async provideContinuousSupport(profile: StudentProfile): Promise<AgentDecision> {
    return {
      action: 'provide_feedback',
      confidence: 0.90,
      reasoning: [
        'Student profile is well-developed',
        'Providing ongoing optimization',
        'Monitoring progress toward goals'
      ],
      data: {
        status: 'on_track',
        recommendations: 'Continue current path with minor optimizations'
      },
      nextSteps: [
        'Monitor progress',
        'Update goals as needed',
        'Explore advanced opportunities'
      ]
    };
  }

  private suggestCareers(profile: StudentProfile): string[] {
    // Simplified career suggestion logic
    const careers = [];
    
    if (profile.grades?.mathematics > 15) {
      careers.push('Data Scientist', 'Engineer', 'Financial Analyst');
    }
    
    if (profile.grades?.english > 15) {
      careers.push('Technical Writer', 'Content Manager', 'Communications Specialist');
    }
    
    return careers;
  }

  private async createNewStudentPath(studentId: string): Promise<AgentDecision> {
    return {
      action: 'suggest_courses',
      confidence: 0.60,
      reasoning: [
        'New student detected',
        'Initiating comprehensive assessment',
        'Building initial profile'
      ],
      data: {
        recommendedAssessments: ['grade_analysis', 'personality_test'],
        priority: 'high'
      },
      nextSteps: [
        'Complete initial assessments',
        'Provide academic history',
        'Set initial goals'
      ]
    };
  }

  // Public methods for profile management
  public updateStudentProfile(studentId: string, profileData: Partial<StudentProfile>) {
    const existing = this.studentProfiles.get(studentId) || {
      id: studentId,
      goals: [],
      careerInterests: [],
      learningStyle: 'mixed',
      academicLevel: 'high_school'
    };
    
    this.studentProfiles.set(studentId, { ...existing, ...profileData });
    console.log(`Updated profile for student: ${studentId}`);
  }

  public getStudentProfile(studentId: string): StudentProfile | undefined {
    return this.studentProfiles.get(studentId);
  }

  public addLearningGoal(studentId: string, goal: LearningGoal) {
    const goals = this.learningGoals.get(studentId) || [];
    goals.push(goal);
    this.learningGoals.set(studentId, goals);
  }

  public async processStudentInteraction(studentId: string, interactionData: any): Promise<AgentDecision> {
    // Update student profile based on interaction
    this.updateStudentProfile(studentId, interactionData);
    
    // Make autonomous decision
    return await this.makeAutonomousDecision(studentId);
  }
}

// Export singleton instance
export const aiAgent = new AutonomousAIAgent();
