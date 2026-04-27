"use client";
import { useState, useEffect } from "react";

const KEY = "jp_tts_enabled";

export function useTTSPreference() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored !== null) setEnabled(stored === "true");
  }, []);

  function toggle() {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(KEY, String(next));
      return next;
    });
  }

  return { enabled, toggle };
}
