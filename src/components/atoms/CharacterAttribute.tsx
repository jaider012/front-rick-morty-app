import { Typography } from "./Typography";

interface CharacterAttributeProps {
  label: string;
  value: string;
}

export function CharacterAttribute({ label, value }: CharacterAttributeProps) {
  return (
    <div className="border-b border-gray-100 py-4">
      <Typography as="h3" variant="h4" className="text-gray-900">
        {label}
      </Typography>
      <Typography variant="p" className="mt-1 text-gray-500">
        {value}
      </Typography>
    </div>
  );
}
