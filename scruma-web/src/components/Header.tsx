'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import ScriptToggle, { useScriptText } from './ScriptToggle';
import { fetchNav } from '@/lib/cmsApi';

type NavItem = { href: string; label: string };

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchNav();
        if (!alive) return;
        setNavItems(data.items || []);
      } catch {
        setNavItems([
          { href: '/', label: 'Почетна' },
          { href: '/o-nama', label: 'О нама' },
          { href: '/kontakt', label: 'Контакт' },
        ]);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header id="navbar" className={`navbar${isScrolled ? ' scrolled' : ''}`}>
      <div className="nav-shell">
        <div className="nav-container">
          <Link href="/" className="logo-wrapper" aria-label={useScriptText('Почетна страница')}>
            <img src="/images/logo.svg" alt={useScriptText('Спортски центар Рума')} className="nav-logo" />
          </Link>

          <nav className="nav-links" aria-label={useScriptText('Главна навигација')}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {useScriptText(item.label)}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <ScriptToggle className="glass-btn" id="langToggle" />
            <ThemeToggle className="glass-btn" id="themeToggle" />
          </div>

          <button type="button" className="nav-burger" aria-label={useScriptText('Отвори мени')} aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`nav-mobile${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <button type="button" className="nav-mobile-overlay" aria-label={useScriptText('Затвори мени')} onClick={() => setMenuOpen(false)} />

        <aside className="nav-mobile-drawer" aria-label={useScriptText('Мени')}>
          <div className="nav-mobile-header">
            <Link href="/" className="nav-mobile-logo" onClick={() => setMenuOpen(false)}>
              <img src="/images/logo.svg" alt={useScriptText('Спортски центар Рума')} />
            </Link>
            <button type="button" className="nav-mobile-close" aria-label={useScriptText('Затвори мени')} onClick={() => setMenuOpen(false)}>
              ✕
            </button>
          </div>

          <nav className="nav-mobile-links" aria-label={useScriptText('Навигација')}>
            {navItems.map((item) => (
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
