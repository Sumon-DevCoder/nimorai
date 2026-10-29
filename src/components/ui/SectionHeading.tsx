import type { ReactNode } from "react";
import { NimoraiIcon, type IconName } from "./NimoraiIcon";
import { cn } from "@/lib/utils";

export function EyebrowBadge({
  children,
  icon,
  dark = false,
  className,
}: {
  children: ReactNode;
  icon?: IconName;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2 rounded-full px-3.5 py-2 backdrop-blur-md",
        dark
          ? "border border-aqua-400/30 bg-white/6 text-aqua-200 shadow-[inset_0_1px_0_rgb(255_255_255/0.15)]"
          : "border border-teal-600/15 bg-white/80 text-teal-700 shadow-xs",
        className,
      )}
    >
      {icon && <NimoraiIcon name={icon} size={15} className={dark ? "invert" : ""} />}
      <span>{children}</span>
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  icon,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: IconName;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl space-y-4", className)}>
      <span className="eyebrow inline-flex items-center gap-2 text-teal-700">
        {icon && <NimoraiIcon name={icon} size={15} />}
        <span>{eyebrow}</span>
      </span>
      <h2 className="text-h2 text-ink">{title}</h2>
      {description && <p className="text-lead text-muted">{description}</p>}
    </div>
  );
}

