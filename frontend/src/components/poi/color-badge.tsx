import { Badge } from "../ui/badge";

interface ColorBadgeProps {
  color: string;
  children: React.ReactNode;
}

export function ColorBadge({ color, children }: ColorBadgeProps) {
  return (
    <Badge className="flex items-center gap-2">
      {color && (
        <div
          className="size-3 rounded-full -ml-0.5"
          style={{ backgroundColor: color }}
        ></div>
      )}
      {children}
    </Badge>
  );
}
