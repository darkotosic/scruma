'use client';

import { useScriptText } from '@/components/ScriptToggle';

export default function HomePage() {
  const title = useScriptText('Добродошли у СК Рума');
  const desc = useScriptText('Статичка интернет презентација са модерним дизајном и API fallback механизмом.');

  return (
    <section>
      <h1>{title}</h1>
      <p>{desc}</p>
    </section>
  );
}
