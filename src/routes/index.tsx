import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: VergeApp,
});

function VergeApp() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"new" | "mcap" | "volume">("new");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 w-full border-b border-hairline bg-surface/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="mono text-lg font-medium tracking-tighter text-brand">VERGE.</span>
            <span className="hidden md:inline text-[10px] mono uppercase tracking-widest text-muted-foreground">
              Robinhood Network · Uniswap v4
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/create"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs mono px-3 py-1.5 rounded-md bg-surface-alt ring-1 ring-hairline hover:bg-accent transition-colors"
            >
              <span className="text-brand">+</span> Create token
            </Link>
            <button
              type="button"
              className="text-sm font-medium bg-foreground text-background px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Connect
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tokens by name, ticker, or contract address"
              className="w-full bg-surface-alt ring-1 ring-hairline focus:ring-brand/50 outline-none rounded-md pl-9 pr-3 py-2 text-sm mono placeholder:text-muted-foreground/60"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs mono">
              ⌕
            </span>
          </div>
          <div className="flex items-center gap-1 bg-surface-alt ring-1 ring-hairline rounded-md p-1 text-[11px] mono">
            {(["new", "mcap", "volume"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSort(s)}
                className={`px-3 py-1 rounded uppercase tracking-wider transition-colors ${
                  sort === s
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s === "new" ? "Newest" : s === "mcap" ? "Mkt Cap" : "Volume"}
              </button>
            ))}
          </div>
        </div>

        {/* Empty state — no tokens yet */}
        <section
          aria-labelledby="empty-state"
          className="rounded-xl ring-1 ring-hairline bg-card overflow-hidden"
        >
          <div className="grid grid-cols-4 gap-4 px-5 py-3 border-b border-hairline text-[10px] mono uppercase tracking-widest text-muted-foreground">
            <span>Token</span>
            <span className="text-right hidden sm:block">Market Cap</span>
            <span className="text-right hidden sm:block">Volume</span>
            <span className="text-right">Graduation</span>
          </div>

          <div className="px-6 py-24 flex flex-col items-center text-center">
            <h1 id="empty-state" className="text-2xl md:text-3xl font-medium mb-3 max-w-[38ch]">
              No tokens listed yet.
            </h1>
            <p className="text-sm text-muted-foreground max-w-[52ch] mb-8">
              The token launch is not yet available for now 
              Follow our official X account to receive the latest launch announcements and updates.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/create"
                className="bg-brand text-brand-foreground px-5 py-2.5 rounded-lg font-medium text-sm hover:scale-[1.02] transition-transform inline-flex items-center gap-2"
              >
                <span className="mono opacity-70">+</span> Create token
              </Link>
              <button
                type="button"
                className="bg-surface-alt text-foreground px-5 py-2.5 rounded-lg font-medium text-sm ring-1 ring-hairline hover:bg-accent transition-colors"

              >
                Connect wallet
              </button>
            </div>
          </div>
        </section>

        {/* Minimal footer strip */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-[10px] mono uppercase tracking-widest text-muted-foreground">
          <span>0 tokens · 0 graduated · $0 volume</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="hover:text-foreground transition-colors">Telegram</a>
            <a href="#" className="hover:text-foreground transition-colors">Docs</a>
          </div>
        </div>
      </main>
    </div>
  );
}
