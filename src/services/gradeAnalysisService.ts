export type BaccalaureateSection = 'GS' | 'LS' | 'SE' | 'LH' | '';

export interface GradeData {
  mathematics: number;
  physics: number;
  chemistry: number;
  biology: number;
  arabic: number;
  english: number;
  french: number;
  philosophy: number;
  sociology: number;
  economics: number;
  history: number;
  geography: number;
}

export interface MajorRecommendation {
  major: string;
  matchPercentage: number;
  description: string;
  keyStrengths: string[];
  suggestedPath: string;
}

export const subjectsBySection: Record<Exclude<BaccalaureateSection, ''>, (keyof GradeData)[]> = {
  GS: ['mathematics', 'physics', 'chemistry', 'arabic', 'english', 'french', 'philosophy', 'history', 'geography'],
  LS: ['mathematics', 'physics', 'chemistry', 'biology', 'arabic', 'english', 'french', 'philosophy', 'history', 'geography'],
  SE: ['mathematics', 'physics', 'chemistry', 'biology', 'arabic', 'english', 'french', 'philosophy', 'sociology', 'economics', 'history', 'geography'],
  LH: ['mathematics', 'physics', 'chemistry', 'biology', 'arabic', 'english', 'french', 'philosophy', 'sociology', 'economics', 'history', 'geography']
};

export class GradeAnalysisService {
  static analyzeGrades(grades: Partial<GradeData>, section: BaccalaureateSection): MajorRecommendation[] {
    // Return empty array if section is empty
    if (section === '') {
      return [];
    }

    const recommendations: MajorRecommendation[] = [];
    
    // Get average of all entered grades
    const validGrades = Object.values(grades).filter((grade): grade is number => 
      typeof grade === 'number' && grade > 0
    );
    const overallAverage = validGrades.length > 0 
      ? validGrades.reduce((sum, grade) => sum + grade, 0) / validGrades.length 
      : 0;

    // Engineering recommendation
    const engineeringScore = this.calculateEngineeringScore(grades, section);
    if (engineeringScore > 0) {
      recommendations.push({
        major: "Engineering",
        matchPercentage: Math.min(engineeringScore, 95),
        description: "Strong analytical and mathematical skills make you well-suited for engineering disciplines.",
        keyStrengths: this.getEngineeringStrengths(grades),
        suggestedPath: "Consider specializations in Mechanical, Electrical, Civil, or Computer Engineering based on your interests."
      });
    }

    // Computer Science recommendation
    const csScore = this.calculateComputerScienceScore(grades, section);
    if (csScore > 0) {
      recommendations.push({
        major: "Computer Science",
        matchPercentage: Math.min(csScore, 95),
        description: "Your logical thinking and mathematical abilities align well with computer science.",
        keyStrengths: this.getComputerScienceStrengths(grades),
        suggestedPath: "Focus on programming, algorithms, and consider specializations in AI, cybersecurity, or software development."
      });
    }

    // Medicine recommendation
    const medicineScore = this.calculateMedicineScore(grades, section);
    if (medicineScore > 0) {
      recommendations.push({
        major: "Medicine/Pre-Med",
        matchPercentage: Math.min(medicineScore, 95),
        description: "Strong performance in sciences indicates potential for medical studies.",
        keyStrengths: this.getMedicineStrengths(grades),
        suggestedPath: "Maintain high grades and gain healthcare experience through volunteering or internships."
      });
    }

    // Business recommendation
    const businessScore = this.calculateBusinessScore(grades, section);
    if (businessScore > 0) {
      recommendations.push({
        major: "Business Administration",
        matchPercentage: Math.min(businessScore, 95),
        description: "Balanced academic performance with strong communication skills suit business studies.",
        keyStrengths: this.getBusinessStrengths(grades),
        suggestedPath: "Consider specializations in Management, Marketing, Finance, or Entrepreneurship."
      });
    }

    // Psychology recommendation
    const psychologyScore = this.calculatePsychologyScore(grades, section);
    if (psychologyScore > 0) {
      recommendations.push({
        major: "Psychology",
        matchPercentage: Math.min(psychologyScore, 95),
        description: "Strong analytical and communication skills are valuable for psychology.",
        keyStrengths: this.getPsychologyStrengths(grades),
        suggestedPath: "Explore areas like clinical, cognitive, or social psychology based on your interests."
      });
    }

    // Literature recommendation
    const literatureScore = this.calculateLiteratureScore(grades, section);
    if (literatureScore > 0) {
      recommendations.push({
        major: "English Literature",
        matchPercentage: Math.min(literatureScore, 95),
        description: "Strong language and analytical skills make you well-suited for literary studies.",
        keyStrengths: this.getLiteratureStrengths(grades),
        suggestedPath: "Consider combining with creative writing, journalism, or education for career flexibility."
      });
    }

    // Fine Arts recommendation
    if (overallAverage >= 12) {
      recommendations.push({
        major: "Fine Arts",
        matchPercentage: Math.min(60 + (overallAverage - 12) * 3, 85),
        description: "Creative expression combined with academic foundation opens artistic opportunities.",
        keyStrengths: ["Creative thinking", "Cultural awareness", "Visual communication"],
        suggestedPath: "Explore various mediums and consider combining art with technology or business."
      });
    }

    // History recommendation
    const historyScore = this.calculateHistoryScore(grades, section);
    if (historyScore > 0) {
      recommendations.push({
        major: "History",
        matchPercentage: Math.min(historyScore, 90),
        description: "Strong analytical and research skills are valuable for historical studies.",
        keyStrengths: this.getHistoryStrengths(grades),
        suggestedPath: "Consider specializations in specific periods or regions, and explore careers in education, research, or public history."
      });
    }

    // Sort by match percentage
    return recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }

  private static calculateEngineeringScore(grades: Partial<GradeData>, section: Exclude<BaccalaureateSection, ''>): number {
    const mathGrade = grades.mathematics || 0;
    const physicsGrade = grades.physics || 0;
    const chemistryGrade = grades.chemistry || 0;
    
    if (mathGrade === 0 && physicsGrade === 0) return 0;
    
    let baseScore = (mathGrade * 0.4 + physicsGrade * 0.4 + chemistryGrade * 0.2);
    
    // Section-specific adjustments
    if (section === 'GS' || section === 'LS') {
      baseScore *= 1.1; // Boost for science sections
    }
    
    return Math.max(0, (baseScore - 10) * 5);
  }

  private static calculateComputerScienceScore(grades: Partial<GradeData>, section: Exclude<BaccalaureateSection, ''>): number {
    const mathGrade = grades.mathematics || 0;
    const physicsGrade = grades.physics || 0;
    const englishGrade = grades.english || 0;
    
    if (mathGrade === 0) return 0;
    
    let baseScore = (mathGrade * 0.5 + physicsGrade * 0.3 + englishGrade * 0.2);
    
    // Section-specific adjustments
    if (section === 'GS') {
      baseScore *= 1.15; // Higher boost for GS
    } else if (section === 'LS') {
      baseScore *= 1.05; // Slight boost for LS
    }
    
    return Math.max(0, (baseScore - 10) * 5);
  }

  private static calculateMedicineScore(grades: Partial<GradeData>, section: Exclude<BaccalaureateSection, ''>): number {
    const biologyGrade = grades.biology || 0;
    const chemistryGrade = grades.chemistry || 0;
    const physicsGrade = grades.physics || 0;
    const mathGrade = grades.mathematics || 0;
    
    // Biology required for medicine (only available in LS section)
    if (section !== 'LS' || biologyGrade === 0) return 0;
    
    let baseScore = (biologyGrade * 0.4 + chemistryGrade * 0.3 + physicsGrade * 0.2 + mathGrade * 0.1);
    
    return Math.max(0, (baseScore - 12) * 6);
  }

  private static calculateBusinessScore(grades: Partial<GradeData>, section: Exclude<BaccalaureateSection, ''>): number {
    const mathGrade = grades.mathematics || 0;
    const englishGrade = grades.english || 0;
    const economicsGrade = grades.economics || 0;
    const sociologyGrade = grades.sociology || 0;
    
    let baseScore = (mathGrade * 0.3 + englishGrade * 0.3);
    
    // Add economics and sociology if available (SE section)
    if (section === 'SE') {
      baseScore = (mathGrade * 0.25 + englishGrade * 0.25 + economicsGrade * 0.25 + sociologyGrade * 0.25);
    }
    
    return Math.max(0, (baseScore - 10) * 4);
  }

  private static calculatePsychologyScore(grades: Partial<GradeData>, section: Exclude<BaccalaureateSection, ''>): number {
    const mathGrade = grades.mathematics || 0;
    const englishGrade = grades.english || 0;
    const sociologyGrade = grades.sociology || 0;
    const biologyGrade = grades.biology || 0;
    
    let baseScore = (mathGrade * 0.3 + englishGrade * 0.4);
    
    // Add sociology if available
    if (section === 'SE' || section === 'LH') {
      baseScore = (mathGrade * 0.25 + englishGrade * 0.35 + sociologyGrade * 0.4);
    }
    
    // Add biology bonus if available (LS section)
    if (section === 'LS' && biologyGrade > 0) {
      baseScore = (mathGrade * 0.2 + englishGrade * 0.3 + biologyGrade * 0.5);
    }
    
    return Math.max(0, (baseScore - 10) * 4);
  }

  private static calculateLiteratureScore(grades: Partial<GradeData>, section: Exclude<BaccalaureateSection, ''>): number {
    const englishGrade = grades.english || 0;
    const arabicGrade = grades.arabic || 0;
    const frenchGrade = grades.french || 0;
    const philosophyGrade = grades.philosophy || 0;
    
    if (englishGrade === 0 && arabicGrade === 0) return 0;
    
    let baseScore = (englishGrade * 0.3 + arabicGrade * 0.3 + frenchGrade * 0.2 + philosophyGrade * 0.2);
    
    // Boost for LH section
    if (section === 'LH') {
      baseScore *= 1.2;
    }
    
    return Math.max(0, (baseScore - 10) * 4);
  }

  private static calculateHistoryScore(grades: Partial<GradeData>, section: Exclude<BaccalaureateSection, ''>): number {
    const historyGrade = grades.history || 0;
    const geographyGrade = grades.geography || 0;
    const arabicGrade = grades.arabic || 0;
    const englishGrade = grades.english || 0;
    
    if (historyGrade === 0) return 0;
    
    let baseScore = (historyGrade * 0.4 + geographyGrade * 0.2 + arabicGrade * 0.2 + englishGrade * 0.2);
    
    // Boost for LH section
    if (section === 'LH') {
      baseScore *= 1.15;
    }
    
    return Math.max(0, (baseScore - 10) * 4);
  }

  // Helper methods for strengths
  private static getEngineeringStrengths(grades: Partial<GradeData>): string[] {
    const strengths = [];
    if ((grades.mathematics || 0) >= 15) strengths.push("Strong mathematical foundation");
    if ((grades.physics || 0) >= 15) strengths.push("Excellent physics understanding");
    if ((grades.chemistry || 0) >= 15) strengths.push("Solid chemistry knowledge");
    return strengths.length > 0 ? strengths : ["Analytical thinking", "Problem-solving skills"];
  }

  private static getComputerScienceStrengths(grades: Partial<GradeData>): string[] {
    const strengths = [];
    if ((grades.mathematics || 0) >= 15) strengths.push("Strong logical reasoning");
    if ((grades.physics || 0) >= 15) strengths.push("Good understanding of systems");
    if ((grades.english || 0) >= 15) strengths.push("Strong communication skills");
    return strengths.length > 0 ? strengths : ["Problem-solving", "Analytical thinking"];
  }

  private static getMedicineStrengths(grades: Partial<GradeData>): string[] {
    const strengths = [];
    if ((grades.biology || 0) >= 15) strengths.push("Excellent biological sciences");
    if ((grades.chemistry || 0) >= 15) strengths.push("Strong chemistry foundation");
    if ((grades.physics || 0) >= 15) strengths.push("Good scientific reasoning");
    return strengths.length > 0 ? strengths : ["Scientific aptitude", "Detail-oriented"];
  }

  private static getBusinessStrengths(grades: Partial<GradeData>): string[] {
    const strengths = [];
    if ((grades.mathematics || 0) >= 15) strengths.push("Strong analytical skills");
    if ((grades.english || 0) >= 15) strengths.push("Excellent communication");
    if ((grades.economics || 0) >= 15) strengths.push("Economic understanding");
    return strengths.length > 0 ? strengths : ["Leadership potential", "Strategic thinking"];
  }

  private static getPsychologyStrengths(grades: Partial<GradeData>): string[] {
    const strengths = [];
    if ((grades.english || 0) >= 15) strengths.push("Strong communication skills");
    if ((grades.sociology || 0) >= 15) strengths.push("Understanding of human behavior");
    if ((grades.biology || 0) >= 15) strengths.push("Scientific approach to behavior");
    return strengths.length > 0 ? strengths : ["Empathy", "Analytical thinking"];
  }

  private static getLiteratureStrengths(grades: Partial<GradeData>): string[] {
    const strengths = [];
    if ((grades.english || 0) >= 15) strengths.push("Excellent language skills");
    if ((grades.arabic || 0) >= 15) strengths.push("Strong linguistic foundation");
    if ((grades.philosophy || 0) >= 15) strengths.push("Critical thinking abilities");
    return strengths.length > 0 ? strengths : ["Creative writing", "Literary analysis"];
  }

  private static getHistoryStrengths(grades: Partial<GradeData>): string[] {
    const strengths = [];
    if ((grades.history || 0) >= 15) strengths.push("Strong historical knowledge");
    if ((grades.geography || 0) >= 15) strengths.push("Geographic understanding");
    if ((grades.arabic || 0) >= 15) strengths.push("Cultural awareness");
    return strengths.length > 0 ? strengths : ["Research skills", "Critical analysis"];
  }
}
