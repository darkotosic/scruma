"use client";

import { usePathname } from "next/navigation";
import { useScript } from "@/context/ScriptContext";

const PHONE_NUMBER = "+381605680004";

export default function CallToActionBar() {
  const pathname = usePathname();
  const { t } = useScript();

  if (pathname === "/") return null;

  return (
    <div className="cta-bar-wrap">
      <div className="container">
        <a className="cta-bar-button" href={`tel:${PHONE_NUMBER}`}>
          {t("ПОЗОВИТЕ 📞")} {PHONE_NUMBER}
        </a>
      </div>
    </div>
  );
}
