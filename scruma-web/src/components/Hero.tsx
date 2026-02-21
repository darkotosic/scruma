'use client';

import Link from 'next/link';
import { useScriptText } from '@/components/ScriptToggle';
import Container from './Container';

type Cta = { title: string; href: string };

export default function Hero({
  title,
  subtitle,
  image,
  ctas
}: {
  title: string;
  subtitle: string;
  image: string;
  ctas: Cta[];
}) {
  return (
    <section className="hero" aria-label={useScriptText('Херо секција')}>
      <div className="heroMedia" style={{ backgroundImage: `url(${image})` }} />
      <div className="heroOverlay" />
      <Container>
        <div className="heroContent">
          <h1 className="heroTitle">{useScriptText(title)}</h1>
          <p className="heroSubtitle">{useScriptText(subtitle)}</p>

          <div className="heroCtas">
            {ctas.map((c) => (
              <Link key={c.href} className="btn btnPrimary" href={c.href}>
                {useScriptText(c.title)}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
