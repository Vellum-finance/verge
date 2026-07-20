import { usePrivy } from "@privy-io/react-auth";

export function ConnectWalletButton() {
  const {
    ready,
    authenticated,
    login,
    logout,
    user,
  } = usePrivy();

  if (!ready) {
    return (
      <button
        disabled
        className="text-sm font-medium bg-foreground text-background px-4 py-1.5 rounded-full opacity-60"
      >
        Loading...
      </button>
    );
  }

  if (!authenticated) {
    return (
      <button
        onClick={login}
        className="text-sm font-medium bg-foreground text-background px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
      >
        Connect
      </button>
    );
  }

  const wallet = user?.wallet?.address;

  return (
    <button
      onClick={logout}
      className="text-sm font-medium bg-brand text-brand-foreground px-4 py-1.5 rounded-full"
    >
      {wallet
        ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
        : "Connected"}
    </button>
  );
}