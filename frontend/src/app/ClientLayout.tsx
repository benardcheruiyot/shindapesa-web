"use client";
import StyledComponentsRegistry from "../utils/registry";
import { UserProvider } from "@/context/UserContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <UserProvider>
        {children}
      </UserProvider>
    </StyledComponentsRegistry>
  );
}
