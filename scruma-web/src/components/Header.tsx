'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import ScriptToggle, { useScriptText } from './ScriptToggle';
import Container from './Container';
import { NAV_LINKS } from '@/lib/content';

export default function Header() {
  return (
    <header>
      <Container>
        <div className="headerInner">
          <nav aria-label={useScriptText('Главна навигација')}>
            {NAV_LINKS.map((l) => (
              <Link key={l.href} className="navLink" href={l.href}>
                {useScriptText(l.title)}
              </Link>
            ))}
          </nav>

          <div className="toggles">
            <ScriptToggle />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
