import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AppBackground({ children }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] bg-brand/15 blur-[160px] rounded-full glow-move" />

        <div className="absolute top-20 -left-40 h-[500px] w-[500px] bg-brand/10 blur-[150px] rounded-full glow-left" />

        <div className="absolute top-20 -right-40 h-[500px] w-[500px] bg-brand/10 blur-[150px] rounded-full glow-right" />

      </div>

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10">

        {children}

      </div>

    </div>
  );
}