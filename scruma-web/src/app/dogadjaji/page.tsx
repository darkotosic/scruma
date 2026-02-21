'use client';

import Container from '@/components/Container';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';
import CardGrid from '@/components/CardGrid';
import { HOME } from '@/lib/content';

export default function EventsPage() {
  return (
    <>
      <Hero
        title="Дешавања"
        subtitle="Догађаји, турнири и активности — најаве."
        image="/images/placeholders/events-hero.jpg"
        ctas={[
          { title: 'Почетна', href: '/' },
          { title: 'Контакт', href: '/kontakt' }
        ]}
      />

      <section className="pageSection">
        <Container>
          <SectionHeader
            title="Сва дешавања"
            subtitle="Статички fallback — касније Django API v1."
          />
          <CardGrid items={HOME.desavanja} />
        </Container>
      </section>
    </>
  );
}
