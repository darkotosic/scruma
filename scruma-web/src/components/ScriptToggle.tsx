"use client";

import { useEffect } from "react";
import { useScript } from "@/context/ScriptContext";

type ScriptToggleProps = {
  className?: string;
  id?: string;
  compact?: boolean;
};

export default function ScriptToggle({ className, id, compact = false }: ScriptToggleProps) {
  const { script, setScript } = useScript();

  useEffect(() => {
    document.documentElement.setAttribute("data-script", script);
  }, [script]);

  const toggle = () => {
    const next = script === "cyrl" ? "latn" : "cyrl";
    setScript(next);
  };

  return (
    <button
      id={id}
      className={className}
      onClick={toggle}
      type="button"
      aria-label={compact ? (script === "cyrl" ? "Пређи на латиницу" : "Пређи на ћирилицу") : undefined}
      title={compact ? (script === "cyrl" ? "Латиница" : "Ћирилица") : undefined}
    >
      {compact ? (script === "cyrl" ? "ЛАТ" : "ЋИР") : script === "cyrl" ? "Латиница" : "Ћирилица"}
    </button>
  );
}
