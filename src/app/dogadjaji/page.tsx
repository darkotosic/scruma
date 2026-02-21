'use client';

import { useScriptText } from '@/components/ScriptToggle';

const fallbackEvents = [
  'Недеља 17:00 — Припремна утакмица на домаћем терену.',
  'Среда 19:30 — Хуманитарни спортски турнир.',
  'Петак 18:00 — Отворени тренинг за децу.'
];

export default function EventsPage() {
  return (
    <section>
      <h1>{useScriptText('Догађаји')}</h1>
      <ul>
        {fallbackEvents.map((event) => (
          <li key={event}>{useScriptText(event)}</li>
        ))}
      </ul>
    </section>
  );
}
