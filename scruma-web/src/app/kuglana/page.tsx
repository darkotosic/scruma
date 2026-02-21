'use client';

import Container from '@/components/Container';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';
import { OBJEKTI } from '@/lib/content';

export default function KuglanaPage() {
  return (
    <>
      <Hero
        title={OBJEKTI.kuglana.title}
        subtitle={OBJEKTI.kuglana.subtitle}
        image={OBJEKTI.kuglana.image}
        ctas={[
          { title: 'Контакт', href: '/kontakt' },
          { title: 'Галерија', href: '/galerija' }
        ]}
      />
      <section className="pageSection">
        <Container>
          <div className="panel">
            <SectionHeader title="Информације" />
            <p>Термини, цене и резервације ће бити управљани преко Django API v1.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
