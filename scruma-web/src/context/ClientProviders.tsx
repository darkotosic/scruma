"use client";

import React from "react";
import { ScriptProvider } from "@/context/ScriptContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ScriptProvider>{children}</ScriptProvider>;
}
