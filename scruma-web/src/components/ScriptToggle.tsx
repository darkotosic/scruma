"use client";

import { useEffect } from "react";
import { useScript } from "@/context/ScriptContext";

type ScriptToggleProps = {
  className?: string;
  id?: string;
};

export default function ScriptToggle({ className, id }: ScriptToggleProps) {
  const { script, setScript } = useScript();

  useEffect(() => {
    document.documentElement.setAttribute("data-script", script);
  }, [script]);

  const toggle = () => {
    const next = script === "cyrl" ? "latn" : "cyrl";
    setScript(next);
  };

  return (
    <button id={id} className={className} onClick={toggle}>
      {script === "cyrl" ? "Латиница" : "Ћирилица"}
    </button>
  );
}
