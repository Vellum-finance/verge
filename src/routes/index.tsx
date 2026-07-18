import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: VergeApp,
});

function VergeApp() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"new" | "mcap" | "volume">("new");

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
        <section
          aria-labelledby="empty-state"
          className="rounded-xl ring-1 ring-hairline bg-card overflow-hidden"
        >
          <div className="grid grid-cols-4 gap-4 px-5 py-3 border-b border-hairline text-[10px] mono uppercase tracking-widest text-muted-foreground">
            <span> </span>
            <span className="text-right hidden sm:block"> </span>
            <span className="text-right hidden sm:block"> </span>
            <span className="text-right"> </span>
          </div>

          <div className="px-6 py-24 flex flex-col items-center text-center">
            <h1 id="empty-state" className="text-2xl md:text-3xl font-medium mb-3 max-w-[38ch]">
               The token launcher currently being prepared.
              
            </h1>
            <p className="text-sm text-muted-foreground max-w-[52ch] mb-8">
               Make sure to follow the official Verge X account for all future updates and announcements.
            </p>
           <div className="flex items-center justify-center">
             <Link
               to="/create"
               className="bg-brand text-brand-foreground px-5 py-2.5 rounded-lg font-medium text-sm hover:scale-[1.02] transition-transform inline-flex items-center gap-2"
               >
               <span className="mono opacity-70">+</span> Create token
             </Link>
           </div>
          </div>
        </section>
        <section className="mt-8 rounded-xl ring-1 ring-hairline bg-card p-8">
  <div className="max-w-2xl mx-auto text-center">

    <div className="text-[10px] mono uppercase tracking-widest text-brand mb-3">
      Coming Soon
    </div>

    <h2 className="text-xl md:text-2xl font-medium mb-3">
      Verge is under development
    </h2>

    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
      The next generation token launch platform built for the Robinhood Network.
      Create, launch and grow your community with Verge.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">

      <div className="rounded-lg bg-surface-alt ring-1 ring-hairline p-4">
        <div className="text-sm font-medium mb-1">
          Instant Token Deployment
        </div>
        <div className="text-xs text-muted-foreground">
          Launch tokens with a simple and seamless creation flow.
        </div>
      </div>

      <div className="rounded-lg bg-surface-alt ring-1 ring-hairline p-4">
        <div className="text-sm font-medium mb-1">
          Designed For Communities
        </div>
        <div className="text-xs text-muted-foreground">
          Give creators the tools to build and grow together.
        </div>
      </div>

      <div className="rounded-lg bg-surface-alt ring-1 ring-hairline p-4">
        <div className="text-sm font-medium mb-1">
          Community Launches
        </div>
        <div className="text-xs text-muted-foreground">
          Built for creators and communities launching new ideas.
        </div>
      </div>

      <div className="rounded-lg bg-surface-alt ring-1 ring-hairline p-4">
        <div className="text-sm font-medium mb-1">
          Market Starts Here
        </div>
        <div className="text-xs text-muted-foreground">
          Every idea begins with a token. Verge provides the foundation to bring it into the market.
        </div>
      </div>

    </div>

  </div>
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
