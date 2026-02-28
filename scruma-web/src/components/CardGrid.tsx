'use client';

import Link from 'next/link';
import { useScript } from '@/context/ScriptContext';

type Item = {
  title: string;
  subtitle?: string;
  date?: string;
  href?: string;
  image?: string;
  tag?: string;
};

export default function CardGrid({ items }: { items: Item[] }) {
  const { t } = useScript();
  return (
    <div className="grid">
      {items.map((it) => {
        const CardInner = (
          <div className="card">
            {it.image ? (
              <div className="cardMedia">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={it.image}
                  alt={t(it.title)}
                  loading="lazy"
                  width={1200}
                  height={675}
                  style={{ aspectRatio: "16 / 9", objectFit: "cover" }}
                />
              </div>
            ) : null}

            <div className="cardBody">
              <div className="cardTop">
                {it.tag ? <span className="badge">{t(it.tag)}</span> : null}
                {it.date ? <span className="muted">{t(it.date)}</span> : null}
              </div>

              <h3 className="cardTitle">{t(it.title)}</h3>
              {it.subtitle ? <p className="cardSubtitle">{t(it.subtitle)}</p> : null}

              {it.href ? <span className="cardLink">{t('Сазнајте више')}</span> : null}
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
