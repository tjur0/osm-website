import { Badge } from "../ui/badge";

interface ColorBadgeProps {
  color: string;
  children: React.ReactNode;
}

export function ColorBadge({ color, children }: ColorBadgeProps) {
  return (
    <Badge className="flex items-center gap-2" variant="glass">
      {color && (
        <div
          className="size-3 rounded-full -ml-0.5 border dark:border-white/20 border-black/20"
          style={{
            backgroundColor: color,
          }}
        ></div>
      )}
      {children}
    </Badge>
  );
}
