
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type BaccalaureateSection } from "@/services/gradeAnalysisService";

interface SectionSelectorProps {
  section: BaccalaureateSection;
  onSectionChange: (section: BaccalaureateSection) => void;
}

const SectionSelector = ({ section, onSectionChange }: SectionSelectorProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold text-gray-900">Select your Baccalaureate Section</Label>
      <RadioGroup value={section} onValueChange={(value) => onSectionChange(value as BaccalaureateSection)}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="GS" id="GS" />
            <Label htmlFor="GS" className="cursor-pointer">General Sciences (GS)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="LS" id="LS" />
            <Label htmlFor="LS" className="cursor-pointer">Life Sciences (LS)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="SE" id="SE" />
            <Label htmlFor="SE" className="cursor-pointer">Sociology and Economics (SE)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="LH" id="LH" />
            <Label htmlFor="LH" className="cursor-pointer">Literature and Humanities (LH)</Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SectionSelector;
