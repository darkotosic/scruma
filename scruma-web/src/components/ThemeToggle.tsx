'use client';

import { useEffect, useState } from 'react';

type ThemeToggleProps = {
  className?: string;
  id?: string;
};

export default function ThemeToggle({ className, id }: ThemeToggleProps) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const isDark = saved === 'dark';
    setDark(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  };

  return (
    <button id={id} className={className} onClick={toggle}>
      {dark ? 'Светла тема' : 'Тамна тема'}
    </button>
  );
}
