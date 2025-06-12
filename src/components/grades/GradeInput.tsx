
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GradeInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: string) => void;
}

const GradeInput = ({ id, label, value, onChange }: GradeInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        min="0"
        max="20"
        step="0.1"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Grade (0-20)"
      />
    </div>
  );
};

export default GradeInput;
