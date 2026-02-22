"use client";

import Image from "next/image";
import { useScript } from "@/context/ScriptContext";

export default function Footer() {
  const { t } = useScript();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <Image
            src="/logo.svg"
            alt="Спортски центар Рума"
            width={150}
            height={150}
          />
        </div>

        <div className="footer-links">
          <h4>{t("СЦ Рума")}</h4>
          <ul>
            <li>{t("Велика сала")}</li>
            <li>{t("Сале")}</li>
            <li>{t("Куглана")}</li>
            <li>{t("Теретана")}</li>
            <li>{t("Базен Борковац")}</li>
          </ul>
        </div>

        <div className="footer-copy">
          <p>{t("© 2026 Спортски центар Рума")}</p>
          <p>{t("Израда и дизајн: Дарко Тошић")}</p>
        </div>
      </div>
    </footer>
  );
}
