import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

export function SpinnerBadge({
  variant = "outline",
  value = "Loading...",
  className

}: {
  variant?: "outline" | "default";
  value?: string;
  className?: string
}) {
  return (
    <div className={className}>
      <Badge variant={variant}>
        <Spinner />
        {value}
      </Badge>
    </div>
  );
}
