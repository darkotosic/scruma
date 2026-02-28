"use client";

import { useEffect, useId, useRef, useState } from "react";
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
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState<string | null>(null);
  const [activeMobileSection, setActiveMobileSection] = useState<string | null>(null);
  const burgerButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLElement>(null);
  const dropdownCloseTimeoutRef = useRef<number | null>(null);
  const wasMenuOpenRef = useRef(false);
  const dropdownIdPrefix = useId();

  const navItems = [
    { href: "/", label: "Насловна" },
    {
      href: "/sale",
      label: "Објекти",
      children: [
        { href: "/velika-sala", label: "Велика сала (спортска хала)" },
        { href: "/sale", label: "Све сале" },
        { href: "/sale/dzudo-sala", label: "Џудо сала" },
        { href: "/sale/plava-sala", label: "Плава сала (кик бокс и рехаб)" },
        { href: "/sale/crvena-sala", label: "Црвена сала (карате и фитнес)" },
        { href: "/sale/mala-sala", label: "Мала сала (савате бокс, теквондо)" },
        { href: "/kuglana", label: "Куглана" },
        { href: "/teretana", label: "Теретана" },
        { href: "/bazen-borkovac", label: "Базен Борковац" },
      ],
    },
    {
      href: "/obavestenja",
      label: "Садржај",
      children: [
        { href: "/obavestenja", label: "Обавештења" },
        { href: "/vesti", label: "Вести" },
        { href: "/dogadjaji", label: "Догађаји" },
        { href: "/galerija", label: "Галерија" },
      ],
    },
    {
      href: "/o-nama",
      label: "Информације",
      children: [
        { href: "/o-nama", label: "О нама" },
        { href: "/kontakt", label: "Контакт" },
      ],
    },
  ];

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [facebookIconUrl, setFacebookIconUrl] = useState<string | null>(null);
  const [siteError, setSiteError] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
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

    if (!menuOpen) {
      if (wasMenuOpenRef.current) {
        burgerButtonRef.current?.focus();
      }
      wasMenuOpenRef.current = false;
      return () => {
        document.body.style.overflow = "";
      };
    }

    wasMenuOpenRef.current = true;

    const drawer = mobileDrawerRef.current;
    if (!drawer) {
      return () => {
        document.body.style.overflow = "";
      };
    }

    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const getFocusableElements = () =>
      Array.from(drawer.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => !element.hasAttribute("disabled")
      );

    const focusableElements = getFocusableElements();
    focusableElements[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const currentFocusable = getFocusableElements();
      if (!currentFocusable.length) return;

      const first = currentFocusable[0];
      const last = currentFocusable[currentFocusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === first || !drawer.contains(activeElement)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);


  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  const toggleMobileSection = (href: string) => {
    setActiveMobileSection((current) => (current === href ? null : href));
  };

  useEffect(() => {
    return () => {
      if (dropdownCloseTimeoutRef.current) {
        window.clearTimeout(dropdownCloseTimeoutRef.current);
      }
    };
  }, []);
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
            {navItems.map((item, index) => {
              if (!item.children) {
                return (
                  <Link key={item.href} href={item.href}>
                    {t(item.label)}
                  </Link>
                );
              }

              const dropdownId = `${dropdownIdPrefix}-dropdown-${index}`;
              const isDesktopDropdownOpen = activeDesktopDropdown === item.href;

              const openDropdown = () => {
                if (dropdownCloseTimeoutRef.current) {
                  window.clearTimeout(dropdownCloseTimeoutRef.current);
                  dropdownCloseTimeoutRef.current = null;
                }
                setActiveDesktopDropdown(item.href);
              };

              const closeDropdownWithDelay = () => {
                if (dropdownCloseTimeoutRef.current) {
                  window.clearTimeout(dropdownCloseTimeoutRef.current);
                }
                dropdownCloseTimeoutRef.current = window.setTimeout(() => {
                  setActiveDesktopDropdown((current) => (current === item.href ? null : current));
                }, 120);
              };

              const toggleDropdown = () => {
                setActiveDesktopDropdown((current) => (current === item.href ? null : item.href));
              };

              return (
                <div
                  key={item.href}
                  className="nav-dropdown"
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdownWithDelay}
                >
                  <button
                    type="button"
                    className="nav-dropdown-trigger"
                    aria-haspopup="menu"
                    aria-expanded={isDesktopDropdownOpen}
                    aria-controls={dropdownId}
                    onClick={toggleDropdown}
                    onFocus={openDropdown}
                  >
                    {t(item.label)}
                  </button>
                  <div
                    id={dropdownId}
                    className={`nav-dropdown-menu${isDesktopDropdownOpen ? " open" : ""}`}
                    aria-label={t(`Подмени ${item.label}`)}
                    role="menu"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdownWithDelay}
                  >
                    <Link href={item.href} role="menuitem" onClick={() => setActiveDesktopDropdown(null)}>
                      {t(item.label)}
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        role="menuitem"
                        onClick={() => setActiveDesktopDropdown(null)}
                      >
                        {t(child.label)}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
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
            aria-controls="mobilni-meni"
            ref={burgerButtonRef}
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
          onClick={closeMobileMenu}
        />
        <aside
          id="mobilni-meni"
          className="nav-mobile-drawer"
          aria-label={t("Мени")}
          ref={mobileDrawerRef}
        >
          <div className="nav-mobile-header">
            <Link href="/" className="nav-mobile-logo" onClick={closeMobileMenu}>
              <Logo className="h-9 w-auto" />
            </Link>

            <div className="nav-mobile-tools" aria-label={t("Промене приказа")}>
              <ScriptToggle className="glass-btn glass-btn--compact" id="langToggleMobile" compact />
              <ThemeToggle className="glass-btn glass-btn--compact" id="themeToggleMobile" compact />
            </div>

            <button
              type="button"
              className="nav-mobile-close"
              aria-label={t("Затвори мени")}
              onClick={closeMobileMenu}
            >
              ✕
            </button>
          </div>

          <nav className="nav-mobile-links" aria-label={t("Навигација")}>
            {navItems.map((item) => {
              if (!item.children?.length) {
                return (
                  <div key={item.href} className="nav-mobile-card">
                    <Link href={item.href} onClick={closeMobileMenu}>
                      {t(item.label)}
                    </Link>
                  </div>
                );
              }

              const isOpen = activeMobileSection === item.href;
              const panelId = `mobile-panel-${item.href.replace(/\W+/g, "-")}`;

              return (
                <div key={item.href} className={`nav-mobile-card nav-mobile-accordion${isOpen ? " open" : ""}`}>
                  <button
                    type="button"
                    className="nav-mobile-section-btn"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleMobileSection(item.href)}
                  >
                    <span>{t(item.label)}</span>
                    <span className="nav-mobile-section-icon">{isOpen ? "−" : "+"}</span>
                  </button>

                  <div id={panelId} className="nav-mobile-section-panel" hidden={!isOpen}>
                    <Link href={item.href} onClick={closeMobileMenu} className="nav-mobile-subitem nav-mobile-subitem--parent">
                      {t(item.label)}
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={closeMobileMenu}
                        className="nav-mobile-subitem"
                      >
                        {t(child.label)}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            <div className="nav-mobile-card">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="nav-mobile-external"
                aria-label={t("Фејсбук")}
              >
                {facebookIconUrl ? (
                  <img src={facebookIconUrl} alt={t("Фејсбук")} className="social-icon" />
                ) : (
                  "📘"
                )}
                <span>{t("Фејсбук")}</span>
              </a>
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
}
