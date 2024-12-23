import { Typography } from "./Typography";

interface CharacterAttributeProps {
  label: string;
  value: string;
}

export function CharacterAttribute({ label, value }: CharacterAttributeProps) {
  return (
    <div className="space-y-1">
      <Typography variant="small" className="text-gray-500">
        {label}
      </Typography>
      <Typography>{value}</Typography>
    </div>
  );
}
