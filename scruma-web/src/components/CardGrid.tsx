'use client';

import Link from 'next/link';
import { useScriptText } from '@/components/ScriptToggle';

type Item = {
  title: string;
  subtitle?: string;
  date?: string;
  href?: string;
  image?: string;
  tag?: string;
};

export default function CardGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid">
      {items.map((it) => {
        const CardInner = (
          <div className="card">
            {it.image ? (
              <div className="cardMedia">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.image} alt={useScriptText(it.title)} loading="lazy" />
              </div>
            ) : null}

            <div className="cardBody">
              <div className="cardTop">
                {it.tag ? <span className="badge">{useScriptText(it.tag)}</span> : null}
                {it.date ? <span className="muted">{useScriptText(it.date)}</span> : null}
              </div>

              <h3 className="cardTitle">{useScriptText(it.title)}</h3>
              {it.subtitle ? <p className="cardSubtitle">{useScriptText(it.subtitle)}</p> : null}

              {it.href ? <span className="cardLink">{useScriptText('Сазнајте више')}</span> : null}
            </div>
          </div>
        );

        return it.href ? (
          <Link key={`${it.title}-${it.href}`} className="cardLinkWrap" href={it.href}>
            {CardInner}
          </Link>
        ) : (
          <div key={`${it.title}-${it.date ?? ''}`}>{CardInner}</div>
        );
      })}
    </div>
  );
}
