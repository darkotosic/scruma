"use client";

import { useEffect, useState } from "react";
import { useScript } from "@/context/ScriptContext";

export default function BackToTopButton() {
  const { t } = useScript();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 260);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " visible" : ""}`}
      aria-label={t("Назад на врх")}
      onClick={scrollToTop}
    >
      ↑ {t("Назад на врх")}
    </button>
  );
}
