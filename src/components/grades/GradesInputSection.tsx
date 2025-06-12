
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
  french: number;
}

interface GradesInputSectionProps {
  section: BaccalaureateSection;
  grades: Grades;
  onGradeChange: (subject: keyof Grades, value: string) => void;
}

const GradesInputSection = ({ section, grades, onGradeChange }: GradesInputSectionProps) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    languages: true,
    sciences: true,
    humanities: true,
    social: true,
  });

  const toggleSection = (sectionKey: string) => {
    setOpenSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  const getSubjectsForSection = () => {
    const allSubjects = {
      languages: [
        { key: 'arabic' as keyof Grades, label: 'Arabic' },
        { key: 'english' as keyof Grades, label: 'English' },
        { key: 'french' as keyof Grades, label: 'French' },
      ],
      sciences: [
        { key: 'mathematics' as keyof Grades, label: 'Mathematics' },
        { key: 'physics' as keyof Grades, label: 'Physics' },
        { key: 'chemistry' as keyof Grades, label: 'Chemistry' },
        ...(section !== 'GS' ? [{ key: 'biology' as keyof Grades, label: 'Biology' }] : []),
      ],
      humanities: [
        { key: 'history' as keyof Grades, label: 'History' },
        { key: 'geography' as keyof Grades, label: 'Geography' },
        { key: 'philosophy' as keyof Grades, label: 'Philosophy' },
      ],
      social: [
        ...(section !== 'GS' && section !== 'LS' ? [
          { key: 'economics' as keyof Grades, label: 'Economics' },
          { key: 'sociology' as keyof Grades, label: 'Sociology' },
        ] : []),
      ],
    };

    return allSubjects;
  };

  const subjects = getSubjectsForSection();

  const renderSection = (sectionKey: string, title: string, subjectList: Array<{ key: keyof Grades; label: string }>) => {
    if (subjectList.length === 0) return null;

    return (
      <Collapsible open={openSections[sectionKey]} onOpenChange={() => toggleSection(sectionKey)}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-full justify-between p-0 font-semibold text-left hover:bg-transparent"
          >
            <span>{title}</span>
            {openSections[sectionKey] ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            {subjectList.map(({ key, label }) => (
              <GradeInput
                key={key}
                id={key}
                label={label}
                value={grades[key]}
                onChange={(value) => onGradeChange(key, value)}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <div className="space-y-6">
      {renderSection('languages', 'Languages', subjects.languages)}
      {renderSection('sciences', 'Sciences', subjects.sciences)}
      {renderSection('humanities', 'Humanities', subjects.humanities)}
      {renderSection('social', 'Social Sciences', subjects.social)}
    </div>
  );
};

export default GradesInputSection;
