'use client';

import Container from '@/components/Container';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';
import CardGrid from '@/components/CardGrid';
import { HOME } from '@/lib/content';

export default function NewsPage() {
  return (
    <>
      <Hero
        title="Вести"
        subtitle="Најновија дешавања у Спортском центру."
        image="/images/placeholders/news-hero.jpg"
        ctas={[
          { title: 'Почетна', href: '/' },
          { title: 'Контакт', href: '/kontakt' }
        ]}
      />

      <section className="pageSection">
        <Container>
          <SectionHeader title="Све вести" subtitle="Статички fallback — касније Django API v1." />
          <CardGrid items={HOME.vesti} />
        </Container>
      </section>
    </>
  );
}
