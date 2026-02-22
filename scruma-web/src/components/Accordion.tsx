'use client';

import { useState } from 'react';
import { useScript } from '@/context/ScriptContext';

export default function Accordion({
  items
}: {
  items: { title: string; content: string }[];
}) {
  const { t } = useScript();
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="accordion">
      {items.map((it, idx) => {
        const isOpen = idx === open;
        return (
          <div key={it.title} className={`accItem ${isOpen ? 'open' : ''}`}>
            <button
              className="accBtn"
              onClick={() => setOpen(isOpen ? -1 : idx)}
              aria-expanded={isOpen}
            >
              <span>{t(it.title)}</span>
              <span className="accIcon">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen ? <div className="accPanel">{t(it.content)}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
