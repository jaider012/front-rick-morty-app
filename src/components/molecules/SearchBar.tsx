import { Search } from "lucide-react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Search characters..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1"
      />
      <Button onClick={onSearch}>
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}
