'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import ScriptToggle, { useScriptText } from './ScriptToggle';
import Container from './Container';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header id="navbar" className={`navbar${isScrolled ? ' scrolled' : ''}`}>
      <Container>
        <div className="nav-container">
          <Link href="/" className="logo-wrapper" aria-label={useScriptText('Почетна страница')}>
            <img src="/images/logo.svg" alt={useScriptText('Спортски центар Рума')} className="nav-logo" />
          </Link>

          <nav className="nav-links" aria-label={useScriptText('Главна навигација')}>
            <Link href="/">{useScriptText('Почетна')}</Link>
            <Link href="/sale">{useScriptText('Сале')}</Link>
            <Link href="/galerija">{useScriptText('Галерија')}</Link>
            <Link href="/kontakt">{useScriptText('Контакт')}</Link>
          </nav>

          <div className="nav-actions">
            <ScriptToggle className="glass-btn" />
            <ThemeToggle className="glass-btn" id="themeToggle" />
          </div>
        </div>
      </Container>
    </header>
  );
}
