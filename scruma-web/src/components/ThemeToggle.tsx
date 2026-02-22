'use client';

import { useEffect, useState } from 'react';

type ThemeToggleProps = {
  className?: string;
  id?: string;
};

export default function ThemeToggle({ className, id }: ThemeToggleProps) {
  const [dark, setDark] = useState(false);

  const applyTheme = (isDark: boolean) => {
    setDark(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.body.classList.toggle('dark', isDark);
    document.body.classList.toggle('light', !isDark);
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved === 'dark');
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    applyTheme(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button id={id} className={className} onClick={toggle}>
      {dark ? 'Светла тема' : 'Тамна тема'}
    </button>
  );
}
