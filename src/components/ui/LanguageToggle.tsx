import * as React from "react";
import { cn } from "../../lib/cn";

export type ToggleLanguage = "es" | "en";
export interface LanguageToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: ToggleLanguage;
  onChange: (language: ToggleLanguage) => void;
  label: string;
  labels: Record<ToggleLanguage, string>;
}

/** National flag artwork uses its own colors; the surrounding control uses theme tokens. */
function Flag({ language }: { language: ToggleLanguage }) {
  if (language === "es") return <svg viewBox="0 0 30 18" aria-hidden="true" className="h-4 w-6 overflow-hidden rounded-sm">
    <path fill="#002B7F" d="M0 0h30v18H0z" />
    <path fill="#fff" d="M0 3h30v12H0z" />
    <path fill="#CE1126" d="M0 6h30v6H0z" />
  </svg>;
  return <svg viewBox="0 0 38 20" aria-hidden="true" className="h-4 w-6 overflow-hidden rounded-sm">
    <path fill="#fff" d="M0 0h38v20H0z" />
    {Array.from({ length: 7 }, (_, row) => <rect key={row} y={row * 40 / 13} width="38" height={20 / 13} fill="#B22234" />)}
    <path fill="#3C3B6E" d="M0 0h15.2v10.77H0z" />
    {Array.from({ length: 9 }, (_, row) => Array.from({ length: row % 2 ? 5 : 6 }, (_, col) =>
      <path key={`${row}-${col}`} fill="#fff" d="M0 -.65 L.15 -.2 L.62 -.2 L.24 .08 L.38 .53 L0 .25 L-.38 .53 L-.24 .08 L-.62 -.2 L-.15 -.2 Z"
        transform={`translate(${row % 2 ? 2.53 + col * 2.53 : 1.27 + col * 2.53},${.6 + row * 1.2})`} />))}
  </svg>;
}

/** One button shows the language available on the next click. */
export const LanguageToggle = React.forwardRef<HTMLDivElement, LanguageToggleProps>(
  ({ value, onChange, label, labels, className, ...props }, ref) => {
    const next = value === "es" ? "en" : "es";
    return <div ref={ref} role="group" aria-label={label}
      className={cn("inline-flex shrink-0 rounded-full border border-border bg-card p-1", className)} {...props}>
      <button type="button" aria-label={labels[next]} title={labels[next]} onClick={() => onChange(next)}
        className="inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <Flag language={next} /><span>{next.toUpperCase()}</span>
      </button>
    </div>;
  }
);
LanguageToggle.displayName = "LanguageToggle";
