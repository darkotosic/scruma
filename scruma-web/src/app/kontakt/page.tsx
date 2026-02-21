'use client';

import { useScriptText } from '@/components/ScriptToggle';

export default function ContactPage() {
  return (
    <section>
      <h1>{useScriptText('Контакт')}</h1>
      <p>{useScriptText('Е-пошта: info@skruma.rs')}</p>
      <p>{useScriptText('Телефон: +381 22 000 000')}</p>
    </section>
  );
}
