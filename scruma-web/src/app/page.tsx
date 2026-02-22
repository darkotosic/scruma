'use client';

import { useEffect, useState } from 'react';

import Accordion from '@/components/Accordion';
import CardGrid from '@/components/CardGrid';
import Container from '@/components/Container';
import GalleryGrid from '@/components/GalleryGrid';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';
import { HOME } from '@/lib/content';
import { fetchHome } from '@/lib/homeApi';

function mapPostsToCards(posts: any[]) {
  return posts.map((p) => ({
    title: p.title,
    subtitle: p.excerpt || p.body || '',
    date: (p.published_at || p.created_at || '').slice(0, 10),
    image: p.image || undefined,
    href: p.link_url || '/vesti',
  }));
}

export default function HomePage() {
  const [hero, setHero] = useState(HOME.hero);
  const [obavestenja, setObavestenja] = useState(HOME.obavestenja);
  const [vesti, setVesti] = useState(HOME.vesti);
  const [sportskeVesti, setSportskeVesti] = useState(HOME.sportskeVesti);
  const [mapsEmbedUrl, setMapsEmbedUrl] = useState<string>('');

  useEffect(() => {
    let alive = true;

    (async () => {
      const payload = await fetchHome();
      if (!alive) return;

      setHero({
        title: payload.settings?.hero_title || HOME.hero.title,
        subtitle: payload.settings?.hero_subtitle || HOME.hero.subtitle,
        image: payload.settings?.hero_image || HOME.hero.image,
        ctas: HOME.hero.ctas,
      });

      setObavestenja(mapPostsToCards(payload.announcements));
      setVesti(mapPostsToCards(payload.posts));
      setSportskeVesti(HOME.sportskeVesti);
      setMapsEmbedUrl(payload.settings?.maps_embed_url || '');
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <Hero title={hero.title} subtitle={hero.subtitle} image={hero.image} ctas={hero.ctas} />

      <section className="pageSection">
        <Container>
          <SectionHeader
            title="Обавештења"
            subtitle="Најважније информације — приоритетна обавештења и измене режима рада."
          />
          <CardGrid items={obavestenja} />
        </Container>
      </section>

      <section className="pageSection">
        <Container>
          <SectionHeader title="Вести" subtitle="Најновија дешавања у Спортском центру." />
          <CardGrid items={vesti} />
        </Container>
      </section>

      <section className="pageSection">
        <Container>
          <SectionHeader title="Спортске вести" subtitle="Резултати, најаве и локални спорт." />
          <CardGrid items={sportskeVesti} />
        </Container>
      </section>

      <section className="pageSection">
        <Container>
          <SectionHeader title="Слике" subtitle="Издвојене фотографије — ускоро више у Галерији." />
          <GalleryGrid images={HOME.slike} />
        </Container>
      </section>

      <section className="pageSection">
        <Container>
          <SectionHeader title="Како до нас?" subtitle="Брзе информације за посетиоце." />
          <Accordion items={HOME.kakoDoNas} />

          {mapsEmbedUrl ? (
            <div style={{ marginTop: 16 }}>
              <iframe
                title="Гугл мапа"
                src={mapsEmbedUrl}
                width="100%"
                height="380"
                loading="lazy"
                style={{ border: 0, borderRadius: 14 }}
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
}
