import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-canvas hover:bg-accent/90 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-accent)_40%,transparent)]",
  secondary:
    "bg-elevated text-content hover:bg-border-subtle border border-border-subtle",
  outline:
    "border border-border-subtle text-content hover:bg-elevated",
  ghost: "text-muted hover:text-content hover:bg-elevated",
  danger: "bg-red-500/90 text-white hover:bg-red-500",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
};

export function buttonVariants(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string
): string {
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return <button className={buttonVariants(variant, size, className)} {...props} />;
}
