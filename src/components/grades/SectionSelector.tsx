
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type BaccalaureateSection } from "@/services/gradeAnalysisService";

interface SectionSelectorProps {
  section: BaccalaureateSection | null;
  onSectionChange: (section: BaccalaureateSection | null) => void;
}

const SectionSelector = ({ section, onSectionChange }: SectionSelectorProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold text-gray-900">Select your Baccalaureate Section</Label>
      <RadioGroup 
        value={section || ''} 
        onValueChange={(value) => onSectionChange(value as BaccalaureateSection || null)}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="General Sciences" id="General Sciences" />
            <Label htmlFor="General Sciences" className="cursor-pointer">General Sciences</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Life Sciences" id="Life Sciences" />
            <Label htmlFor="Life Sciences" className="cursor-pointer">Life Sciences</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Sociology and Economics" id="Sociology and Economics" />
            <Label htmlFor="Sociology and Economics" className="cursor-pointer">Sociology and Economics</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Literature and Humanities" id="Literature and Humanities" />
            <Label htmlFor="Literature and Humanities" className="cursor-pointer">Literature and Humanities</Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SectionSelector;
