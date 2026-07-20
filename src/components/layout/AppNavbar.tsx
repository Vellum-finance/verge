import { Link } from "@tanstack/react-router";
import { ConnectWalletButton } from "../ConnectWalletButton";

export default function AppNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-hairline bg-surface/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src="/verge-logo.png"
            alt="Verge"
            className="h-12 w-12 object-contain"
          />

          <span className="mono text-lg font-medium tracking-tighter text-brand">
            VERGE<span className="text-brand">.</span>
          </span>
        </Link>

        <ConnectWalletButton />

      </div>
    </nav>
  );
}