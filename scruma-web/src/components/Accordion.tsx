'use client';

import { useState } from 'react';
import { useScriptText } from '@/components/ScriptToggle';

export default function Accordion({
  items
}: {
  items: { title: string; content: string }[];
}) {
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
              <span>{useScriptText(it.title)}</span>
              <span className="accIcon">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen ? <div className="accPanel">{useScriptText(it.content)}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
