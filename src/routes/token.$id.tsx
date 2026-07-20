import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import AppLayout from "../components/layout/AppLayout";

export const Route = createFileRoute("/token/$id")({
  component: TokenPage,
});

function formatMoney(value: number | null | undefined, decimals = 2) {
  return `$${Number(value ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

function TokenPage() {
  const { id } = Route.useParams();

  const [token, setToken] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadToken() {
      const { data, error } = await supabase
        .from("tokens")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setToken(data);
      }

      setLoading(false);
    }

    loadToken();
  }, [id]);

  if (loading) {
    return (
      <AppLayout>
        <div className="max-w-6xl mx-auto py-20 text-center">
          Loading...
        </div>
      </AppLayout>
    );
  }

  if (!token) {
    return (
      <AppLayout>
        <div className="max-w-6xl mx-auto py-20 text-center">
          Token not found.
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">

        <Link
          to="/"
          className="inline-flex mb-6 text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back
        </Link>

        <div className="rounded-2xl bg-card ring-1 ring-hairline p-8">

          <div className="flex flex-col md:flex-row gap-8">

            <img
              src={token.logo_url || "/verge-logo.png"}
              alt={token.name}
              className="w-32 h-32 rounded-full object-cover ring-1 ring-hairline"
            />

            <div className="flex-1">

              <div className="text-[10px] mono uppercase tracking-widest text-brand">
                Robinhood Network
              </div>

              <h1 className="mt-2 text-5xl font-semibold">
                {token.name}
              </h1>

              <div className="mt-2 text-lg mono text-muted-foreground">
                ${token.symbol}
              </div>

              <p className="mt-6 text-sm text-muted-foreground max-w-2xl">
                {token.description || "No description provided."}
              </p>

              <div className="mt-8 grid md:grid-cols-3 gap-4">

                <InfoCard
                  title="Creator"
                  value={token.creator_wallet}
                />

                <InfoCard
                  title="Created"
                  value={new Date(token.created_at).toLocaleString()}
                />

                <InfoCard
                  title="Contract"
                  value="Coming Soon"
                />

              </div>

            </div>

          </div>

        </div>

        <div className="mt-10">

          <div className="text-[10px] mono uppercase tracking-widest text-brand mb-4">
            Market Statistics
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            <StatCard
              title="Price"
              value={formatMoney(token.current_price, 8)}
            />

            <StatCard
              title="Market Cap"
              value={formatMoney(token.market_cap)}
            />

            <StatCard
              title="Liquidity"
              value={formatMoney(token.liquidity)}
            />

            <StatCard
              title="Volume"
              value={formatMoney(token.volume)}
            />

            <StatCard
              title="Holders"
              value={String(token.holders ?? 0)}
            />

            <StatCard
              title="Transactions"
              value={String(token.transactions ?? 0)}
            />

          </div>

        </div>

      </div>
    </AppLayout>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-surface-alt ring-1 ring-hairline p-4">
      <div className="text-[10px] mono uppercase tracking-widest text-muted-foreground">
        {title}
      </div>

      <div className="mt-2 break-all">
        {value}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl bg-card ring-1 ring-hairline p-5">

      <div className="text-[10px] mono uppercase tracking-widest text-muted-foreground">
        {title}
      </div>

      <div className="mt-3 text-2xl font-semibold">
        {value}
      </div>

    </div>
  );
}