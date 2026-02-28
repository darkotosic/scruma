"use client";

import { useScript } from "@/context/ScriptContext";

const PHONE_NUMBER = "+381605680004";

export default function CallToActionBar() {
  const { t } = useScript();

  return (
    <a
      className="sticky-call"
      href={`tel:${PHONE_NUMBER}`}
      aria-label={t("Позовите телефоном")}
      title={t("Позовите")}
    >
      <img
        src="/call.webp"
        alt={t("Позовите")}
        width={56}
        height={56}
        loading="eager"
      />
    </a>
  );
}
