'use client';

import Container from '@/components/Container';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';
import { OBJEKTI } from '@/lib/content';

export default function BazenBorkovacPage() {
  return (
    <>
      <Hero
        title={OBJEKTI.bazen.title}
        subtitle={OBJEKTI.bazen.subtitle}
        image={OBJEKTI.bazen.image}
        ctas={[
          { title: 'Контакт', href: '/kontakt' },
          { title: 'Галерија', href: '/galerija' }
        ]}
      />
      <section className="pageSection">
        <Container>
          <div className="panel">
            <SectionHeader title="Сезонске информације" />
            <p>Термини, цене и обавештења ће бити управљани преко Django API v1.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
