import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DropdownSelectProps {
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const DropdownSelect = ({ 
  label, 
  options, 
  value, 
  onChange,
  placeholder = "Select..."
}: DropdownSelectProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-foreground whitespace-nowrap">{label}:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-48 h-8 text-sm">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropdownSelect;
