"use client";
import { useSession, signIn as nextSignIn, signOut as nextSignOut } from "next-auth/react";

export interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
}

export function useAuth() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const user: AuthUser | null = session?.user
    ? {
        id: session.user.id as string,
        email: session.user.email!,
        name: session.user.name,
        image: session.user.image,
      }
    : null;

  async function signUp(email: string, password: string): Promise<string | null> {
    const r = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await r.json();
    if (!r.ok) return json.error ?? "Sign up failed";
    const result = await nextSignIn("credentials", { email, password, redirect: false });
    if (result?.error) return "Sign in after signup failed";
    return null;
  }

  async function signIn(email: string, password: string): Promise<string | null> {
    const result = await nextSignIn("credentials", { email, password, redirect: false });
    if (result?.error) return "Invalid email or password";
    return null;
  }

  async function signOut() {
    await nextSignOut({ redirect: false });
  }

  return { user, loading, signIn, signUp, signOut };
}
