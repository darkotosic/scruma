'use client';

import Link from 'next/link';
import { useScript } from '@/context/ScriptContext';
import Container from './Container';

type Cta = { title: string; href: string };
type HeroFit = 'cover' | 'contain';

export default function Hero({
  title,
  subtitle,
  image,
  ctas,
  fit = 'cover'
}: {
  title: string;
  subtitle: string;
  image: string;
  ctas: Cta[];
  fit?: HeroFit;
}) {
  const { t } = useScript();
  const normalizedSubtitle = subtitle
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .trim();

  const sectionClass = fit === 'contain' ? 'hero hero--contain' : 'hero';

  return (
    <section className={sectionClass} aria-label={t('Херо секција')}>
      <div className="heroMedia" style={{ backgroundImage: `url(${image})` }} />
      <div className="heroOverlay" />
      <Container>
        <div className="heroContent">
          <h1 className="heroTitle">{t(title)}</h1>
          {normalizedSubtitle ? <p className="heroSubtitle">{t(normalizedSubtitle)}</p> : null}

          <div className="heroCtas">
            {ctas.map((c) => (
              <Link key={c.href} className="btn btnPrimary" href={c.href}>
                {t(c.title)}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
