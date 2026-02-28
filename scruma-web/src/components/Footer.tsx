"use client";

import Image from "next/image";
import Link from "next/link";
import { useScript } from "@/context/ScriptContext";

export default function Footer() {
  const { t } = useScript();
  const facebookUrl = "https://www.facebook.com/p/Ustanova-Sportski-centar-Ruma-100041307083076/";

  return (
    <footer className="footer" aria-labelledby="footer-title">
      <div className="footer-inner">
        <div className="footer-brand">
          <Image src="/logo.svg" alt="Спортски центар Рума" width={120} height={120} />
          <h3 id="footer-title">{t("СЦ Рума")}</h3>
          <p>{t("Организујемо спортске, рекреативне и јавне програме за све генерације.")}</p>
        </div>

        <nav className="footer-links" aria-label={t("Брза навигација")}>
          <h4>{t("Брзи линкови")}</h4>
          <ul>
            <li><Link href="/">{t("Почетна")}</Link></li>
            <li><Link href="/sale">{t("Сале")}</Link></li>
            <li><Link href="/dogadjaji">{t("Догађаји")}</Link></li>
            <li><Link href="/vesti">{t("Вести")}</Link></li>
            <li><Link href="/kontakt">{t("Контакт")}</Link></li>
          </ul>
        </nav>

        <div className="footer-contact">
          <h4>{t("Контакт")}</h4>
          <p>{t("Вељка Дугошевић 100, Рума, Србија, 22400")}</p>
          <p>
            <a href="tel:+381605680004">+381605680004</a>
          </p>
          <p>
            <a href="mailto:scracunovodstvo@yahoo.com">scracunovodstvo@yahoo.com</a>
          </p>
          <p>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="footer-facebook"
              aria-label={t("Фејсбук")}
            >
              📘 {t("Фејсбук")}
            </a>
          </p>
        </div>
      </div>

      <div className="footer-copy">
        <p>{t("© 2026 Спортски центар Рума. Сва права задржана.")}</p>
      </div>
    </footer>
  );
}
