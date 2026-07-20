import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useRef, useState } from "react";
import type React from "react";
import { usePrivy } from "@privy-io/react-auth";
import CreateTokenForm from "../components/forms/CreateTokenForm";
import { supabase } from "../lib/supabase";
import { ConnectWalletButton } from "../components/ConnectWalletButton";
import { v4 as uuid } from "uuid";
import { uploadTokenLogo } from "../services/upload";
import { createToken } from "../services/token";
import FormField from "../components/forms/FormField";

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

const MAX_TOKEN_LOGO_MB = 2;
const MAX_DESC = 500;

function CreateToken() {
  const router = useRouter();

  const {
  authenticated,
  user,
  login,
} = usePrivy();

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
    if (file.size > MAX_TOKEN_LOGO_MB * 1024 * 1024) {
      setErrors((e) => ({ ...e, logo: `Max ${MAX_TOKEN_LOGO_MB}MB.` }));
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
    if (form.description.length > MAX_DESC)
      if (form.description.length > MAX_DESC)
  next.description = `Max ${MAX_DESC} characters`;
    if (!logo) next.logo = "logo required";
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

  if (!authenticated) {
    login();
    return;
  }

  if (!logo) {
    alert("Please upload a token logo.");
    return;
  }

  setSubmitting(true);

  try {
    // Upload image
    const imageUrl = await uploadTokenLogo(logo);

    // Save token
    await createToken({
      creator_wallet: user!.wallet!.address,
      name: form.name,
      symbol: form.ticker,
      description: form.description,
      logo_url: imageUrl,
      website: form.website,
      twitter: form.twitter,
      telegram: form.telegram,
    });

    alert("Token created successfully!");

    router.navigate({
      to: "/",
    });

  } catch (err) {
    console.error("FULL ERROR:", err);
    alert("Lihat Console");
  } finally {
    setSubmitting(false);
  }
};

  return (
     <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
       <div className="absolute inset-0 pointer-events-none overflow-hidden">

         <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] bg-brand/15 blur-[160px] rounded-full glow-move" />

         <div className="absolute top-40 -left-40 h-[450px] w-[450px] bg-brand/10 blur-[150px] rounded-full" />

         <div className="absolute top-40 -right-40 h-[450px] w-[450px] bg-brand/10 blur-[150px] rounded-full" />

    </div>

       <div
         className="absolute inset-0 opacity-[0.05] pointer-events-none"
         style={{
           backgroundImage:
             "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
           backgroundSize: "32px 32px"
         }}
       />
      <nav className="sticky top-0 z-50 w-full border-b border-hairline bg-surface/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
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
 
      <span className="hidden md:inline text-[10px] mono uppercase tracking-widest text-muted-foreground">
    
      </span>
     </div>
          <ConnectWalletButton />
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-10 text-center animate-in fade-in duration-700">

          <div className="text-[10px] mono uppercase tracking-[0.3em] text-brand mb-4">
            Launch Your Token
        </div>

        <h1 className="text-4xl md:text-5xl font-medium tracking-tight">
            Create your market.
        </h1>

        <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto">
            Define your token identity and prepare your launch on Verge.
  </p>

</div>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              type="button"
              onClick={() => router.history.back()}
              className="text-[11px] mono uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              ← Back
            </button>
            <h1 className="mt-3 text-2xl md:text-3xl font-medium">Token Details</h1>
            <p className="mt-1 text-sm text-muted-foreground">
            </p>
          </div>
        </div>

        <form
         onSubmit={submit}
         className="
         rounded-2xl
         bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent
         ring-1 ring-white/10
         shadow-[0_0_80px_rgba(184,255,0,0.08)]
         backdrop-blur-xl
         p-6 md:p-8
         space-y-6
         shadow-[0_0_80px_rgba(184,255,0,0.06)]
         animate-in fade-in slide-in-from-bottom-4 duration-700
         "
         noValidate
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Field label="Name" error={errors.name} className="sm:col-span-2">
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Verge Protocol Token"
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
            label="Description · Optional"
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

          <Field label="Token Image" hint={`≤${MAX_TOKEN_LOGO_MB}MB`} error={errors.logo}>
            <div className="flex items-center gap-4">
              <button
  type="button"
  onClick={() => fileRef.current?.click()}
  className="
    h-28
    w-28
    rounded-2xl
    border
    border-dashed
    border-white/20
    bg-white/[0.04]
    hover:bg-brand/10
    hover:border-brand/50
    transition-all
    grid
    place-items-center
    overflow-hidden
  "
>
  {logoPreview ? (
    <img
      src={logoPreview}
      alt="token preview"
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="text-center">
      <div className="text-3xl text-muted-foreground">
        +
      </div>
      <div className="text-[9px] mono uppercase">
        Upload
      </div>
    </div>
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
                  <>PNG · JPG · WEBP · SVG .</>
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

          <div className="pt-6 mt-2 border-t border-white/10">
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
              {submitting ? "Deploying…" : "Launch Token"}
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

function inputCls(hasError:boolean){
 return `
 w-full
 bg-white/[0.04]
 backdrop-blur-md
 border
 ${
 hasError
 ? "border-red-500/50"
 : "border-white/10 focus:border-brand/60"
 }
 rounded-xl
 px-4
 py-3
 text-sm
 outline-none
 transition-all
 duration-200
 placeholder:text-white/30
 focus:bg-white/[0.06]
 `;
}
    
