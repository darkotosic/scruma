'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import ScriptToggle, { useScriptText } from './ScriptToggle';

export default function Header() {
  const home = useScriptText('Почетна');
  const about = useScriptText('О нама');
  const news = useScriptText('Вести');
  const events = useScriptText('Догађаји');
  const contact = useScriptText('Контакт');

  return (
    <header>
      <nav>
        <Link href="/">{home}</Link>
        <Link href="/o-nama">{about}</Link>
        <Link href="/vesti">{news}</Link>
        <Link href="/dogadjaji">{events}</Link>
        <Link href="/kontakt">{contact}</Link>
      </nav>
      <div className="toggles">
        <ScriptToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
