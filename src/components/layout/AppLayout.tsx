import { ReactNode } from "react";
import AppBackground from "./AppBackground";
import AppNavbar from "./AppNavbar";
import PageContainer from "./PageContainer";

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <AppBackground>

      <AppNavbar />

      <PageContainer>

        {children}

      </PageContainer>

    </AppBackground>
  );
}