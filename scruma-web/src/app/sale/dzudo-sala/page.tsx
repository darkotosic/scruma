'use client';

import Container from '@/components/Container';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';

export default function DzudoSalaPage() {
  return (
    <>
      <Hero
        title="Џудо сала"
        subtitle="Борилачки спортови и специјализовани тренинзи."
        image="/images/placeholders/sala-1.jpg"
        ctas={[
          { title: 'Све сале', href: '/sale' },
          { title: 'Контакт', href: '/kontakt' }
        ]}
      />

      <section className="pageSection">
        <Container>
          <div className="panel">
            <SectionHeader title="Опис" />
            <p>
              Овде иде званичан опис, термини и правила коришћења. У следећој фази повлачимо
              садржај преко Django API v1.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
