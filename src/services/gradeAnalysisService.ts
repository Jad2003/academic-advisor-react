
interface Grades {
  arabic: number;
  english: number;
  mathematics: number;
  physics: number;
  chemistry: number;
  biology: number;
  history: number;
  geography: number;
  philosophy: number;
  economics: number;
  sociology: number;
}

interface MajorRecommendation {
  major: string;
  match: number;
  description: string;
  reasons: string[];
}

type BaccalaureateSection = 'GS' | 'LS' | 'SE' | 'LH' | '';

export const analyzeGrades = (grades: Grades, section: BaccalaureateSection): MajorRecommendation[] => {
  console.log("Analyzing grades:", grades, "Section:", section);
  
  // Convert grades to percentage for easier calculation (Lebanese system is out of 20)
  const gradePercentages = Object.fromEntries(
    Object.entries(grades).map(([key, value]) => [key, (value / 20) * 100])
  );
  
  // Enhanced rule-based AI logic with better subject correlation
  const recommendations: MajorRecommendation[] = [];
  
  // Calculate subject group averages for better precision
  const stemAvg = (gradePercentages.mathematics + gradePercentages.physics + gradePercentages.chemistry) / 3;
  const bioMedAvg = (gradePercentages.biology + gradePercentages.chemistry + gradePercentages.physics) / 3;
  const languagesAvg = (gradePercentages.arabic + gradePercentages.english) / 2;
  const socialAvg = (gradePercentages.history + gradePercentages.geography + gradePercentages.sociology + gradePercentages.philosophy) / 4;
  const businessAvg = (gradePercentages.economics + gradePercentages.mathematics + gradePercentages.english) / 3;

  // Set minimum threshold for recommendations
  const MIN_THRESHOLD = 65;

  // Section-specific bonus multipliers
  const getSectionBonus = (majorType: string): number => {
    const bonuses: Record<string, Record<BaccalaureateSection, number>> = {
      'stem': { 'GS': 1.15, 'LS': 1.05, 'SE': 0.95, 'LH': 0.9, '': 1 },
      'medical': { 'GS': 1.1, 'LS': 1.2, 'SE': 0.9, 'LH': 0.85, '': 1 },
      'business': { 'GS': 0.95, 'LS': 0.9, 'SE': 1.2, 'LH': 1.0, '': 1 },
      'humanities': { 'GS': 0.9, 'LS': 0.85, 'SE': 1.1, 'LH': 1.25, '': 1 },
      'social': { 'GS': 0.9, 'LS': 0.9, 'SE': 1.15, 'LH': 1.1, '': 1 }
    };
    return bonuses[majorType]?.[section] || 1;
  };

  // Engineering - Requires strong Math + Physics combination
  if (gradePercentages.mathematics >= 75 && gradePercentages.physics >= 70 && stemAvg >= 72) {
    const engineeringScore = (stemAvg + (gradePercentages.mathematics - 70) * 0.3) * getSectionBonus('stem');
    recommendations.push({
      major: "Engineering",
      match: Math.min(95, engineeringScore),
      description: "Design and build solutions to technical problems using mathematics and science.",
      reasons: [
        `Strong mathematics foundation (${grades.mathematics}/20)`,
        `Excellent physics understanding (${grades.physics}/20)`,
        `STEM subjects average: ${Math.round(stemAvg)}%`,
        section === 'GS' ? 'Perfect match with General Sciences background' : `Good fit despite ${section} background`
      ]
    });
  }

  // Computer Science - Math + Logic focus
  if (gradePercentages.mathematics >= 70 && (gradePercentages.physics >= 65 || gradePercentages.economics >= 65)) {
    const csScore = (gradePercentages.mathematics * 0.6 + gradePercentages.physics * 0.25 + gradePercentages.english * 0.15) * getSectionBonus('stem');
    if (csScore >= MIN_THRESHOLD) {
      recommendations.push({
        major: "Computer Science",
        match: Math.min(92, csScore),
        description: "Develop software, algorithms, and computing systems.",
        reasons: [
          `Strong mathematical reasoning (${grades.mathematics}/20)`,
          `Logical problem-solving abilities`,
          gradePercentages.physics >= 65 ? `Physics foundation supports computational thinking` : `Economics background aids algorithmic thinking`,
          section === 'GS' ? 'Excellent alignment with General Sciences' : 'Strong potential despite different background'
        ]
      });
    }
  }

  // Medicine - Bio + Chem + Physics trinity (only for sections that have biology)
  if (section !== 'GS' && gradePercentages.biology >= 75 && gradePercentages.chemistry >= 70 && bioMedAvg >= 72) {
    const medScore = (bioMedAvg + (gradePercentages.biology - 70) * 0.4) * getSectionBonus('medical');
    recommendations.push({
      major: "Medicine",
      match: Math.min(97, medScore),
      description: "Study human health, disease prevention, and medical treatment.",
      reasons: [
        `Outstanding biology performance (${grades.biology}/20)`,
        `Strong chemistry foundation (${grades.chemistry}/20)`,
        `Medical sciences average: ${Math.round(bioMedAvg)}%`,
        section === 'LS' ? 'Perfect match with Life Sciences background' : 'Strong potential for medical studies'
      ]
    });
  }

  // Business Administration - Economics + Math + Languages (only for sections that have economics)
  if ((section === 'SE' || section === 'LH') && gradePercentages.economics >= 70 && businessAvg >= 68) {
    const businessScore = (businessAvg + (gradePercentages.economics - 65) * 0.3) * getSectionBonus('business');
    recommendations.push({
      major: "Business Administration",
      match: Math.min(88, businessScore),
      description: "Learn management, finance, and organizational leadership.",
      reasons: [
        `Strong economics understanding (${grades.economics}/20)`,
        `Good mathematical skills for financial analysis`,
        `Language skills for business communication`,
        section === 'SE' ? 'Perfect alignment with Sociology and Economics' : 'Good potential for business studies'
      ]
    });
  }

  // Law
  if (gradePercentages.arabic >= 70 && gradePercentages.history >= 68 && gradePercentages.philosophy >= 65) {
    const lawScore = (gradePercentages.arabic * 0.4 + gradePercentages.history * 0.3 + gradePercentages.philosophy * 0.3) * getSectionBonus('humanities');
    if (lawScore >= MIN_THRESHOLD) {
      recommendations.push({
        major: "Law",
        match: Math.min(85, lawScore),
        description: "Study legal systems and advocate for justice.",
        reasons: [
          `Strong Arabic language skills for legal documents`,
          `Historical knowledge for legal precedents`,
          `Philosophical thinking for legal analysis`,
          section === 'LH' ? 'Excellent match with Literature and Humanities' : section === 'SE' ? 'Good fit with social sciences background' : 'Strong potential for legal studies'
        ]
      });
    }
  }

  // Psychology - Social sciences with specific focus (only for sections that have sociology)
  if ((section === 'SE' || section === 'LH') && gradePercentages.sociology >= 70 && gradePercentages.philosophy >= 65 && socialAvg >= 68) {
    const psychScore = (gradePercentages.sociology * 0.4 + gradePercentages.philosophy * 0.3 + (section !== 'GS' ? gradePercentages.biology * 0.2 : 0) + gradePercentages.english * 0.1) * getSectionBonus('social');
    if (psychScore >= MIN_THRESHOLD) {
      recommendations.push({
        major: "Psychology",
        match: Math.min(83, psychScore),
        description: "Study human behavior, mental processes, and therapeutic techniques.",
        reasons: [
          `Strong understanding of human behavior (Sociology: ${grades.sociology}/20)`,
          `Philosophical thinking for psychological analysis`,
          section !== 'GS' && gradePercentages.biology >= 60 ? `Biology background supports neuropsychology` : `Strong social science foundation`,
          section === 'SE' || section === 'LH' ? 'Great alignment with your academic background' : 'Strong potential for psychology'
        ]
      });
    }
  }

  // Sort by match score and limit to meaningful recommendations
  const sortedRecommendations = recommendations
    .filter(rec => rec.match >= 60) // Only show strong matches
    .sort((a, b) => b.match - a.match)
    .slice(0, 4); // Limit to top 4 recommendations

  // Ensure we have at least one recommendation
  if (sortedRecommendations.length === 0) {
    const avgGrade = Object.values(gradePercentages).reduce((a, b) => a + b, 0) / Object.values(gradePercentages).length;
    sortedRecommendations.push({
      major: "Liberal Arts",
      match: Math.max(60, avgGrade),
      description: "A broad field that allows you to explore various interests while developing critical thinking skills.",
      reasons: [
        "Well-rounded academic performance",
        "Opportunity to explore multiple disciplines",
        "Foundation for various career paths",
        `Your ${section} background provides a good foundation for interdisciplinary studies`
      ]
    });
  }

  return sortedRecommendations;
};
