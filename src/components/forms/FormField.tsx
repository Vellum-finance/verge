type Props = {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

export default function FormField({
  label,
  hint,
  error,
  className = "",
  children,
}: Props) {
  return (
    <label className={`block ${className}`}>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[11px] mono uppercase tracking-widest text-muted-foreground">
          {label}
        </span>

        {hint && !error && (
          <span className="text-[10px] mono text-muted-foreground/70">
            {hint}
          </span>
        )}

        {error && (
          <span className="text-[10px] mono text-destructive">
            {error}
          </span>
        )}
      </div>

      {children}
    </label>
  );
}