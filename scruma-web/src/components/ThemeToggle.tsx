'use client';

import { useEffect, useState } from 'react';

type ThemeToggleProps = {
  className?: string;
  id?: string;
  compact?: boolean;
};

type Theme = 'light' | 'dark';

export default function ThemeToggle({ className, id, compact = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>('light');

  const applyTheme = (next: Theme) => {
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  useEffect(() => {
    // 1) ако је већ сетовано pre-hydration скриптом → само синхронизуј state
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') {
      setTheme(attr);
      return;
    }

    // 2) fallback ако се из било ког разлога није поставило
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  };

  return (
    <button
      id={id}
      className={className}
      onClick={toggle}
      type="button"
      aria-label={compact ? (theme === 'dark' ? 'Пређи на светлу тему' : 'Пређи на тамну тему') : undefined}
      title={compact ? (theme === 'dark' ? 'Светла тема' : 'Тамна тема') : undefined}
    >
      {compact ? (theme === 'dark' ? '☀️' : '🌙') : theme === 'dark' ? 'Светла тема' : 'Тамна тема'}
    </button>
  );
}
