"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ScriptToggle, { useScriptText } from "./ScriptToggle";
import ThemeToggle from "./ThemeToggle";
import { fetchNav, fetchSiteSettings } from "@/lib/api";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";

type NavItem = { href: string; label: string };

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [navItems, setNavItems] = useState<NavItem[] | null>(null);
  const [navError, setNavError] = useState(false);

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
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
        const [nav, site] = await Promise.all([fetchNav(), fetchSiteSettings()]);
        if (!alive) return;

        setNavItems(nav.items || []);
        setLogoUrl(site.logo || null);
      } catch {
        if (!alive) return;
        setNavError(true);
        setSiteError(true);
        setNavItems([]);
        setLogoUrl(null);
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
    return <img src={logoUrl} alt={useScriptText("Спортски центар Рума")} className={className} />;
  };

  return (
    <header id="navbar" className={`navbar${isScrolled ? " scrolled" : ""}`}>
      <div className="nav-shell">
        <div className="nav-container">
          <Link href="/" className="logo-wrapper" aria-label={useScriptText("Почетна страница")}>
            <Logo className="nav-logo" />
          </Link>

          <nav className="nav-links" aria-label={useScriptText("Главна навигација")}>
            {navItems === null
              ? [1, 2, 3, 4].map((i) => <SkeletonBlock key={i} className="h-6 w-20" />)
              : navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {useScriptText(item.label)}
                  </Link>
                ))}
          </nav>

          <div className="nav-actions">
            {process.env.NODE_ENV !== "production" && (navError || siteError) ? (
              <span className="rounded-md border border-amber-500/50 px-2 py-1 text-xs">
                API грешка (nav/site)
              </span>
            ) : null}
            <ScriptToggle className="glass-btn" id="langToggle" />
            <ThemeToggle className="glass-btn" id="themeToggle" />
          </div>

          <button
            type="button"
            className="nav-burger"
            aria-label={useScriptText("Отвори мени")}
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
          aria-label={useScriptText("Затвори мени")}
          onClick={() => setMenuOpen(false)}
        />
        <aside className="nav-mobile-drawer" aria-label={useScriptText("Мени")}>
          <div className="nav-mobile-header">
            <Link href="/" className="nav-mobile-logo" onClick={() => setMenuOpen(false)}>
              <Logo className="h-9 w-auto" />
            </Link>
            <button
              type="button"
              className="nav-mobile-close"
              aria-label={useScriptText("Затвори мени")}
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
          </div>

          <nav className="nav-mobile-links" aria-label={useScriptText("Навигација")}>
            {(navItems || []).map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {useScriptText(item.label)}
              </Link>
            ))}
          </nav>

          <div className="nav-mobile-actions">
            <ScriptToggle className="glass-btn" id="langToggleMobile" />
            <ThemeToggle className="glass-btn" id="themeToggleMobile" />
          </div>
        </aside>
      </div>
    </header>
  );
}
