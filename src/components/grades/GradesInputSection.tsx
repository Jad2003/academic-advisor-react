
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import GradeInput from "./GradeInput";
import { type BaccalaureateSection } from "@/services/gradeAnalysisService";

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

interface GradesInputSectionProps {
  section: BaccalaureateSection;
  grades: Grades;
  onGradeChange: (subject: keyof Grades, value: string) => void;
}

const GradesInputSection = ({ section, grades, onGradeChange }: GradesInputSectionProps) => {
  const getSubjectsForSection = () => {
    const allSubjects = [
      { key: 'arabic' as keyof Grades, label: 'Arabic' },
      { key: 'english' as keyof Grades, label: 'English' },
      { key: 'mathematics' as keyof Grades, label: 'Mathematics' },
      { key: 'physics' as keyof Grades, label: 'Physics' },
      { key: 'chemistry' as keyof Grades, label: 'Chemistry' },
      ...(section !== 'GS' ? [{ key: 'biology' as keyof Grades, label: 'Biology' }] : []),
      { key: 'history' as keyof Grades, label: 'History' },
      { key: 'geography' as keyof Grades, label: 'Geography' },
      { key: 'philosophy' as keyof Grades, label: 'Philosophy' },
      ...(section === 'SE' || section === 'LH' ? [
        { key: 'economics' as keyof Grades, label: 'Economics' },
        { key: 'sociology' as keyof Grades, label: 'Sociology' },
      ] : []),
    ];

    return allSubjects;
  };

  const subjects = getSubjectsForSection();

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {subjects.map(({ key, label }) => (
        <GradeInput
          key={key}
          id={key}
          label={label}
          value={grades[key]}
          onChange={(value) => onGradeChange(key, value)}
        />
      ))}
    </div>
  );
};

export default GradesInputSection;
