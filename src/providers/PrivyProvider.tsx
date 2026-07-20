import { PrivyProvider } from "@privy-io/react-auth";
import type { ReactNode } from "react";

export function AppPrivyProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        loginMethods: ["wallet"],

        appearance: {
          theme: "dark",
          accentColor: "#B8FF00",
          logo: "/verge-logo.png",
        },

        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}