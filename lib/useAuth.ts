"use client";
import { useState, useEffect, useCallback } from "react";

export interface AuthUser {
  id: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then(({ user }) => setUser(user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const signUp = useCallback(async (email: string, password: string): Promise<string | null> => {
    const r = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "signup", email, password }),
    });
    const json = await r.json();
    if (!r.ok) return json.error ?? "Sign up failed";
    setUser(json.user);
    return null;
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<string | null> => {
    const r = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "signin", email, password }),
    });
    const json = await r.json();
    if (!r.ok) return json.error ?? "Sign in failed";
    setUser(json.user);
    return null;
  }, []);

  const signOut = useCallback(async () => {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "signout" }),
    });
    setUser(null);
  }, []);

  return { user, loading, signIn, signUp, signOut };
}
