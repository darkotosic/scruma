'use client';

import Container from '@/components/Container';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';
import GalleryGrid from '@/components/GalleryGrid';
import { OBJEKTI } from '@/lib/content';

export default function VelikaSalaPage() {
  return (
    <>
      <Hero
        title={OBJEKTI.velikaSala.title}
        subtitle={OBJEKTI.velikaSala.subtitle}
        image={OBJEKTI.velikaSala.image}
        ctas={[
          { title: 'Погледај дешавања', href: '/dogadjaji' },
          { title: 'Контакт', href: '/kontakt' }
        ]}
      />

      <section className="pageSection">
        <Container>
          <div className="panel">
            <SectionHeader title="О сали" />
            <p>
              Ова страница је статички fallback. У наредној фази се повезује Django API (v1) да
              администратор може да мења текстове, слике и најаве без деплоја.
            </p>
          </div>
        </Container>
      </section>

      <section className="pageSection">
        <Container>
          <SectionHeader title="Фотографије" subtitle="Издвојени кадрови из велике сале." />
          <GalleryGrid
            images={[
              '/images/placeholders/gallery-1.jpg',
              '/images/placeholders/gallery-2.jpg',
              '/images/placeholders/gallery-3.jpg'
            ]}
          />
        </Container>
      </section>
    </>
  );
}
