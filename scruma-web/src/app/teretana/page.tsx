'use client';

import Container from '@/components/Container';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';
import { OBJEKTI } from '@/lib/content';

export default function TeretanaPage() {
  return (
    <>
      <Hero
        title={OBJEKTI.teretana.title}
        subtitle={OBJEKTI.teretana.subtitle}
        image={OBJEKTI.teretana.image}
        ctas={[
          { title: 'Контакт', href: '/kontakt' },
          { title: 'Галерија', href: '/galerija' }
        ]}
      />
      <section className="pageSection">
        <Container>
          <div className="panel">
            <SectionHeader title="Информације" />
            <p>Радно време и чланарине ће бити управљани преко Django API v1.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
