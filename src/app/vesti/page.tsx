'use client';

import { useScriptText } from '@/components/ScriptToggle';

const fallbackNews = [
  'Почињу припреме за пролећни део сезоне.',
  'Објављен је распоред тренинга за млађе категорије.',
  'Клуб позива волонтере за организацију догађаја.'
];

export default function NewsPage() {
  return (
    <section>
      <h1>{useScriptText('Вести')}</h1>
      <ul>
        {fallbackNews.map((item) => (
          <li key={item}>{useScriptText(item)}</li>
        ))}
      </ul>
    </section>
  );
}
