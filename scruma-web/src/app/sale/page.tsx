'use client';

import Container from '@/components/Container';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';
import CardGrid from '@/components/CardGrid';
import { OBJEKTI } from '@/lib/content';

export default function SalePage() {
  return (
    <>
      <Hero
        title="Сале"
        subtitle="Мање сале за тренинге, рекреацију и програме — одаберите салу."
        image="/images/placeholders/sale-hero.jpg"
        ctas={[
          { title: 'Контакт', href: '/kontakt' },
          { title: 'Галерија', href: '/galerija' }
        ]}
      />

      <section className="pageSection">
        <Container>
          <SectionHeader title="Мале сале" subtitle="Брз преглед и улаз у сваку салу." />
          <CardGrid items={OBJEKTI.sale} />
        </Container>
      </section>
    </>
  );
}
