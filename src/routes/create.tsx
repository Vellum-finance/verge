import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { saveToken } from "../lib/tokens";

export const Route = createFileRoute("/create")({
  component: CreateToken,
  head: () => ({
    meta: [
      { title: "Create Token — Verge" },
      {
        name: "description",
        content:
          "Deploy a new token on Verge. Zero upfront liquidity, instant trading against a virtual AMM, automatic graduation to Uniswap v4.",
      },
    ],
  }),
});

type Form = {
  name: string;
  ticker: string;
  description: string;
  website: string;
  twitter: string;
  telegram: string;
};

const MAX_LOGO_MB = 2;
const MAX_DESC = 500;

function CreateToken() {
  const router = useRouter();
  const [form, setForm] = useState<Form>({
    name: "",
    ticker: "",
    description: "",
    website: "",
    twitter: "",
    telegram: "",
  });
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof Form | "logo", string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const set = <K extends keyof Form>(k: K, v: Form[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onLogo = (file: File | null) => {
    setErrors((e) => ({ ...e, logo: undefined }));
    if (!file) {
      setLogo(null);
      setLogoPreview(null);
      return;
    }
    if (!/^image\/(png|jpe?g|webp|gif|svg\+xml)$/.test(file.type)) {
      setErrors((e) => ({ ...e, logo: "Use PNG, JPG, WEBP, GIF, or SVG." }));
      return;
    }
    if (file.size > MAX_LOGO_MB * 1024 * 1024) {
      setErrors((e) => ({ ...e, logo: `Max ${MAX_LOGO_MB}MB.` }));
      return;
    }
    setLogo(file);
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
  };

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Required";
    else if (form.name.length > 32) next.name = "Max 32 characters";
    if (!form.ticker.trim()) next.ticker = "Required";
    else if (!/^[A-Z0-9]{2,10}$/.test(form.ticker))
      next.ticker = "2–10 uppercase letters or digits";
   if (form.description && form.description.length > MAX_DESC)
  next.description = `Max ${MAX_DESC} characters`;
    if (!logo) next.logo = "Logo required";
    const urlRe = /^https?:\/\/.+/i;
    if (form.website && !urlRe.test(form.website)) next.website = "Must start with https://";
    if (form.twitter && !urlRe.test(form.twitter)) next.twitter = "Must start with https://";
    if (form.telegram && !urlRe.test(form.telegram))
      next.telegram = "Must start with https://";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Placeholder — deployment pipeline wires in once the on-chain factory is live.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    alert("Connect your wallet to deploy. On-chain factory launching soon.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 w-full border-b border-hairline bg-surface/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="mono text-lg font-medium tracking-tighter text-brand">
              VERGE.
            </Link>
            <span className="hidden md:inline text-[10px] mono uppercase tracking-widest text-muted-foreground">
              Robinhood Network · 
            </span>
          </div>
          <button
            type="button"
            className="text-sm font-medium bg-foreground text-background px-4 py-1.5 rounded-full hover:opacity-90"
          >
            Connect
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              type="button"
              onClick={() => router.history.back()}
              className="text-[11px] mono uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              ← Back
            </button>
            <h1 className="mt-3 text-2xl md:text-3xl font-medium">Launch token</h1>
            <p className="mt-1 text-sm text-muted-foreground">
            </p>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="rounded-xl ring-1 ring-hairline bg-card p-6 md:p-8 space-y-6"
          noValidate
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Field label="Token name" error={errors.name} className="sm:col-span-2">
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Verge"
                maxLength={32}
                className={inputCls(!!errors.name)}
              />
            </Field>
            <Field label="Ticker" hint="2–10 chars" error={errors.ticker}>
              <input
                value={form.ticker}
                onChange={(e) => set("ticker", e.target.value.toUpperCase().slice(0, 10))}
                placeholder="VERGE"
                className={`${inputCls(!!errors.ticker)} mono uppercase tracking-wider`}
              />
            </Field>
          </div>

          <Field
            label="Description"
            error={errors.description}
            hint={`${form.description.length}/${MAX_DESC}`}
          >
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value.slice(0, MAX_DESC))}
              rows={4}
              placeholder="Explain what this token is for."
              className={inputCls(!!errors.description)}
            />
          </Field>

          <Field label="Logo" hint={`≤${MAX_LOGO_MB}MB`} error={errors.logo}>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="relative shrink-0 h-20 w-20 rounded-lg ring-1 ring-hairline bg-surface-alt hover:bg-accent grid place-items-center overflow-hidden"
              >
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo preview" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-muted-foreground text-2xl">+</span>
                )}
              </button>
              <div className="text-xs mono text-muted-foreground">
                {logo ? (
                  <>
                    <div className="text-foreground">{logo.name}</div>
                    <div>{(logo.size / 1024).toFixed(1)} KB</div>
                    <button
                      type="button"
                      onClick={() => onLogo(null)}
                      className="mt-1 underline hover:text-foreground"
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <>PNG / JPG / WebP · SVG · 1:1 recommended.</>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                className="hidden"
                onChange={(e) => onLogo(e.target.files?.[0] ?? null)}
              />
            </div>
          </Field>

          <div className="pt-2 border-t border-hairline">
            <div className="text-[10px] mono uppercase tracking-widest text-muted-foreground mb-3">
              Socials · optional
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Field label="Website" error={errors.website}>
                <input
                  value={form.website}
                  onChange={(e) => set("website", e.target.value)}
                  placeholder="https://"
                  className={inputCls(!!errors.website)}
                />
              </Field>
              <Field label="Twitter / X" error={errors.twitter}>
                <input
                  value={form.twitter}
                  onChange={(e) => set("twitter", e.target.value)}
                  placeholder="https://x.com/…"
                  className={inputCls(!!errors.twitter)}
                />
              </Field>
              <Field label="Telegram" error={errors.telegram}>
                <input
                  value={form.telegram}
                  onChange={(e) => set("telegram", e.target.value)}
                  placeholder="https://t.me/…"
                  className={inputCls(!!errors.telegram)}
                />
              </Field>
            </div>
          </div>

          <div className="rounded-lg bg-surface-alt ring-1 ring-hairline p-4 text-xs text-muted-foreground">
            <div className="mono uppercase tracking-widest text-[10px] text-foreground mb-1">
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-3 pt-2">
            <Link
              to="/"
              className="text-sm mono text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="bg-brand text-brand-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:hover:scale-100 inline-flex items-center gap-2"
            >
              {submitting ? "Deploying…" : "Deploy token"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

function Field({
  label,
  hint,
  error,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[11px] mono uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        {hint && !error && (
          <span className="text-[10px] mono text-muted-foreground/70">{hint}</span>
        )}
        {error && <span className="text-[10px] mono text-destructive">{error}</span>}
      </div>
      {children}
    </label>
  );
}

function inputCls(hasError: boolean) {
  return `w-full bg-surface-alt ring-1 ${
    hasError ? "ring-destructive/60" : "ring-hairline focus:ring-brand/50"
  } outline-none rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground/50`;
}
