import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "../lib/supabase";
import { ConnectWalletButton } from "../components/ConnectWalletButton";
import { useEffect, useState } from "react";
import type { Token } from "../types/token";

export const Route = createFileRoute("/")({
  component: VergeApp,
});

function VergeApp() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"new" | "mcap" | "volume">("new");
  
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

useEffect(() => {
  async function loadTokens() {
    const { data, error } = await supabase
      .from("tokens")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setTokens(data ?? []);
    setLoading(false);
  }

  loadTokens();

  const interval = setInterval(loadTokens, 5000);

  return () => clearInterval(interval);

}, []);

useEffect(() => {
  const interval = setInterval(() => {
    setNow(Date.now());
  }, 1000);

  return () => clearInterval(interval);
}, []);

function timeAgo(date: string) {
  const seconds = Math.floor(
    (now - new Date(date).getTime()) / 1000
  );

  if (seconds < 60) return `${seconds}s`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`;

  return `${Math.floor(days / 365)}y`;
}

const filteredTokens = [...tokens]
  .filter((token) => {
    const q = query.toLowerCase();

    return (
      (token.name ?? "").toLowerCase().includes(q) ||
      (token.symbol ?? "").toLowerCase().includes(q) ||
      (token.creator_wallet ?? "").toLowerCase().includes(q)
    );
  })
  .sort((a, b) => {
    switch (sort) {
      case "mcap":
        return (b.market_cap ?? 0) - (a.market_cap ?? 0);

      case "volume":
        return (b.volume ?? 0) - (a.volume ?? 0);

      case "new":
      default:
        return (
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
        );
    }
  });

  return (
   <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
     
     <div className="absolute inset-0 pointer-events-none overflow-hidden">
       <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] bg-brand/15 blur-[160px] rounded-full glow-move" />

       <div className="absolute top-20 -left-40 h-[500px] w-[500px] bg-brand/10 blur-[150px] rounded-full glow-left" />

       <div className="absolute top-20 -right-40 h-[500px] w-[500px] bg-brand/10 blur-[150px] rounded-full glow-right" />
     </div>

     <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
       style={{
         backgroundImage:
          "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
         backgroundSize: "40px 40px",
        }}
     />
     
      <nav className="sticky top-0 z-50 w-full border-b border-hairline bg-surface/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">

            <Link 
              to="/" 
              className="flex items-center gap-3"
            >

              <img
                src="/verge-logo.png"
                alt="Verge logo"
                className="h-12 w-12 object-contain"
              />

              <span className="mono text-lg font-medium tracking-tighter text-brand">
                VERGE<span className="text-brand">.</span>
              </span>

           </Link>

        </div>
          <div className="flex items-center gap-3">
            <ConnectWalletButton />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-10 text-center">
          <div className="text-[10px] mono uppercase tracking-[0.3em] text-brand mb-4">
            Robinhood
           </div>

          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">
             Build the next market.
            </h1>

             <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Verge gives creators a simple way to introduce new tokens
                and bring ideas into the market.
          </p>
         </div>
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
                {s === "new" ? "New" : s === "mcap" ? "MCap" : "Volume"}
              </button>
            ))}
          </div>
        </div>

        {/* Empty state — no tokens yet */}
        <section className="rounded-xl ring-1 ring-hairline bg-card overflow-hidden">

  <div className="grid grid-cols-4 gap-4 px-5 py-3 border-b border-hairline text-[10px] mono uppercase tracking-widest text-muted-foreground">
    <span>Token</span>
    <span className="text-right hidden sm:block">Creator</span>
    <span className="text-right hidden sm:block">Market Cap</span>
    <span className="text-right">Status</span>
  </div>

  {loading ? (
    <div className="py-16 text-center text-muted-foreground">
      Loading tokens...
    </div>
  ) : filteredTokens.length === 0 ? (
    <div className="py-16 text-center text-muted-foreground">
      No tokens found.
    </div>
  ) : (
    filteredTokens.map((token) => (
      <Link
        key={token.id}
        to="/token/$id"
        params={{ id: token.id }}
        className="
          grid grid-cols-4 gap-4 px-5 py-4
          border-b border-hairline
          items-center
          hover:bg-white/[0.03]
          transition-colors
          cursor-pointer
       "
      >
        <div className="flex items-center gap-3">
          <img
            src={token.logo_url || "/verge-logo.png"}
            alt={token.name}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <div className="font-medium">
              {token.name}
            </div>

            <div className="text-xs text-muted-foreground">
              ${token.symbol}
            </div>

            <div className="mt-1 text-[11px] mono text-brand">
              ${Number(token.current_price).toFixed(8)}
            </div>
          </div>
        </div>

        <div className="text-right hidden sm:block text-xs mono">
          {token.creator_wallet?.slice(0,6)}...
          {token.creator_wallet?.slice(-4)}
        </div>

        <div className="text-right hidden sm:block">
          <div className="text-sm font-medium">
            $
            {Number(token.market_cap).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </div>

          <div className="text-[10px] mono text-muted-foreground">
             MCAP
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />

          <span className="text-xs mono text-muted-foreground">
            {timeAgo(token.created_at)}
          </span>
        </div>
      </Link>
    ))
  )}

</section>

        {/* Minimal footer strip */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-[10px] mono uppercase tracking-widest text-muted-foreground">
          <span>0 tokens · 0 graduated · $0 volume</span>
          <div className="flex gap-5">
            <a
             href="https://x.com/verge_rh"
             target="_blank"
             rel="noopener noreferrer"
             className="hover:text-foreground transition-colors"
             aria-label="X"
            >
             <svg
               viewBox="0 0 24 24"
               className="h-4 w-4"
               fill="currentColor"
             >
               <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/>
              </svg>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
