"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/useAuth";
import { loadProgress, saveProgress, mergeProgress } from "@/lib/progress";

interface Props {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({ onClose, onSuccess }: Props) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const err = mode === "signup"
      ? await signUp(email, password)
      : await signIn(email, password);
    setLoading(false);
    if (err) { setError(err); return; }

    // After sign-in: pull server progress and merge with local
    try {
      const res = await fetch("/api/progress");
      const { data: serverData } = await res.json();
      if (serverData) {
        const local = loadProgress();
        const merged = mergeProgress(local, serverData);
        saveProgress(merged, true);
      } else {
        // First login — push local progress up
        saveProgress(loadProgress(), true);
      }
    } catch {}

    onSuccess?.();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{mode === "signin" ? "Sign in" : "Create account"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder={mode === "signup" ? "At least 8 characters" : "Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={mode === "signup" ? 8 : 1}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "..." : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
            <button
              type="button"
              onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); }}
              className="text-sm text-muted-foreground hover:text-foreground text-center"
            >
              {mode === "signin" ? "No account? Sign up free" : "Already have an account? Sign in"}
            </button>
          </form>
        </CardContent>
      </Card>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl leading-none"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}
