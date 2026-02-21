'use client';

import Container from '@/components/Container';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';

export default function CrvenaSalaPage() {
  return (
    <>
      <Hero
        title="Црвена сала"
        subtitle="Karate и fitness."
        image="/images/placeholders/sala-3.jpg"
        ctas={[
          { title: 'Све сале', href: '/sale' },
          { title: 'Контакт', href: '/kontakt' }
        ]}
      />

      <section className="pageSection">
        <Container>
          <div className="panel">
            <SectionHeader title="Опис" />
            <p>Термини и правила ће бити доступни преко API v1.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
