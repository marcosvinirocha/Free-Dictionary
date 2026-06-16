import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-accent text-accent-foreground",
        variant === "secondary" && "bg-muted text-muted-foreground",
        variant === "outline" && "border border-border text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
