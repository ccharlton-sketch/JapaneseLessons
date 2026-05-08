"use client";
import { SessionProvider } from "next-auth/react";
import GamificationProvider from "@/components/GamificationProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <GamificationProvider>{children}</GamificationProvider>
    </SessionProvider>
  );
}
