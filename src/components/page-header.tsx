import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 space-y-2">
      {eyebrow && (
        <p className="text-xs font-semibold tracking-widest text-brand-coral uppercase">
          {eyebrow}
        </p>
      )}
      <h1 className="font-heading text-3xl font-bold text-brand-navy md:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="max-w-3xl text-base text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  variant?: "default" | "coral" | "teal" | "amber";
  className?: string;
}

export function StatCard({
  label,
  value,
  description,
  icon: Icon,
  variant = "default",
  className,
}: StatCardProps) {
  const variantStyles = {
    default: "border-l-brand-navy",
    coral: "border-l-brand-coral",
    teal: "border-l-brand-teal",
    amber: "border-l-brand-amber",
  };

  const iconColor = {
    default: "text-brand-navy",
    coral: "text-brand-coral",
    teal: "text-brand-teal",
    amber: "text-brand-amber",
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-l-4 border-border bg-card p-5 ring-1 ring-foreground/5",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {label}
          </p>
          <p className="font-heading text-3xl font-bold text-brand-navy">
            {value}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {Icon && (
          <div className={cn("shrink-0", iconColor[variant])}>
            <Icon className="h-7 w-7" />
          </div>
        )}
      </div>
    </div>
  );
}
