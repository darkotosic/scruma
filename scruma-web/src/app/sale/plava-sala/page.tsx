'use client';

import Container from '@/components/Container';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';

export default function PlavaSalaPage() {
  return (
    <>
      <Hero
        title="Плава сала"
        subtitle="Kick box и rehab програми."
        image="/images/placeholders/sala-2.jpg"
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
