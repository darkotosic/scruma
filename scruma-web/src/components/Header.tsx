"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ScriptToggle from "./ScriptToggle";
import { useScript } from "@/context/ScriptContext";
import ThemeToggle from "./ThemeToggle";
import { fetchSiteSettings } from "@/lib/api";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";


export default function Header() {
  const { t } = useScript();
  const facebookUrl = "https://www.facebook.com/p/Ustanova-Sportski-centar-Ruma-100041307083076/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Насловна" },
    { href: "/velika-sala", label: "Велика сала (спортска хала)" },
    { href: "/sale", label: "Сале" },
    { href: "/kuglana", label: "Куглана" },
    { href: "/teretana", label: "Теретана" },
    { href: "/bazen-borkovac", label: "Базен Борковац" },
    { href: "/galerija", label: "Галерија" },
    { href: "/o-nama", label: "О нама" },
    { href: "/kontakt", label: "Контакт" },
  ];

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [facebookIconUrl, setFacebookIconUrl] = useState<string | null>(null);
  const [siteError, setSiteError] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const site = await fetchSiteSettings();
        if (!alive) return;

        setLogoUrl(site.logo || null);
        setFacebookIconUrl(site.social_facebook_icon || null);
      } catch {
        if (!alive) return;
        setSiteError(true);
        setLogoUrl(null);
        setFacebookIconUrl(null);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const Logo = ({ className }: { className?: string }) => {
    if (logoUrl === null && !siteError) {
      return <SkeletonBlock className={className || "h-9 w-28"} />;
    }
    if (!logoUrl) {
      return <div className={className || "h-9 w-28"} />;
    }
    return <img src={logoUrl} alt={t("Спортски центар Рума")} className={className} />;
  };

  return (
    <header id="navbar" className={`navbar${isScrolled ? " scrolled" : ""}`}>
      <div className="nav-shell">
        <div className="nav-container">
          <Link href="/" className="logo-wrapper" aria-label={t("Почетна страница")}>
            <Logo className="nav-logo" />
          </Link>

          <nav className="nav-links" aria-label={t("Главна навигација")}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {t(item.label)}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            {process.env.NODE_ENV !== "production" && siteError ? (
              <span className="rounded-md border border-amber-500/50 px-2 py-1 text-xs">
                API грешка (nav/site)
              </span>
            ) : null}
            <ScriptToggle className="glass-btn" id="langToggle" />
            <ThemeToggle className="glass-btn" id="themeToggle" />
            <a
              href={facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="glass-btn"
              aria-label={t("Фејсбук")}
            >
              {facebookIconUrl ? (
                <img
                  src={facebookIconUrl}
                  alt={t("Фејсбук")}
                  className="social-icon"
                />
              ) : (
                "📘"
              )}
            </a>
          </div>

          <button
            type="button"
            className="nav-burger"
            aria-label={t("Отвори мени")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`nav-mobile${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        <button
          type="button"
          className="nav-mobile-overlay"
          aria-label={t("Затвори мени")}
          onClick={() => setMenuOpen(false)}
        />
        <aside className="nav-mobile-drawer" aria-label={t("Мени")}>
          <div className="nav-mobile-header">
            <Link href="/" className="nav-mobile-logo" onClick={() => setMenuOpen(false)}>
              <Logo className="h-9 w-auto" />
            </Link>
            <button
              type="button"
              className="nav-mobile-close"
              aria-label={t("Затвори мени")}
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
          </div>

          <nav className="nav-mobile-links" aria-label={t("Навигација")}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {t(item.label)}
              </Link>
            ))}
          </nav>

          <div className="nav-mobile-actions">
            <ScriptToggle className="glass-btn" id="langToggleMobile" />
            <ThemeToggle className="glass-btn" id="themeToggleMobile" />
            <a
              href={facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="glass-btn"
              aria-label={t("Фејсбук")}
            >
              {facebookIconUrl ? (
                <img
                  src={facebookIconUrl}
                  alt={t("Фејсбук")}
                  className="social-icon"
                />
              ) : (
                "📘"
              )}
            </a>
          </div>
        </aside>
      </div>
    </header>
  );
}
