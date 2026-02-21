'use client';

import Container from '@/components/Container';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';
import GalleryGrid from '@/components/GalleryGrid';
import { HOME } from '@/lib/content';

export default function GalerijaPage() {
  return (
    <>
      <Hero
        title="Галерија"
        subtitle="Фотографије спортског центра — ускоро се пуни преко API v1."
        image="/images/placeholders/gallery-hero.jpg"
        ctas={[
          { title: 'Почетна', href: '/' },
          { title: 'Контакт', href: '/kontakt' }
        ]}
      />
      <section className="pageSection">
        <Container>
          <SectionHeader title="Фотографије" subtitle="Статички fallback grid." />
          <GalleryGrid images={HOME.slike} />
        </Container>
      </section>
    </>
  );
}
