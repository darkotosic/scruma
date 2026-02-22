"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toLatin } from "@/lib/translit";

type Script = "cyrl" | "latn";

type ScriptContextValue = {
  script: Script;
  setScript: (next: Script) => void;
  t: (text: string) => string;
};

const ScriptContext = createContext<ScriptContextValue | null>(null);

function readScript(): Script {
  if (typeof window === "undefined") return "cyrl";
  const saved = localStorage.getItem("script");
  return saved === "latn" ? "latn" : "cyrl";
}

export function ScriptProvider({ children }: { children: React.ReactNode }) {
  const [script, setScriptState] = useState<Script>("cyrl");

  const setScript = (next: Script) => {
    setScriptState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("script", next);
      document.documentElement.setAttribute("data-script", next);
    }
  };

  useEffect(() => {
    const current = readScript();
    setScriptState(current);
    document.documentElement.setAttribute("data-script", current);

    const onStorage = (e: StorageEvent) => {
      if (e.key === "script") {
        const next = readScript();
        setScriptState(next);
        document.documentElement.setAttribute("data-script", next);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo<ScriptContextValue>(() => {
    const t = (text: string) => (script === "latn" ? toLatin(text) : text);
    return { script, setScript, t };
  }, [script]);

  return <ScriptContext.Provider value={value}>{children}</ScriptContext.Provider>;
}

export function useScript() {
  const ctx = useContext(ScriptContext);
  if (!ctx) throw new Error("useScript мора бити коришћен унутар <ScriptProvider>.");
  return ctx;
}
