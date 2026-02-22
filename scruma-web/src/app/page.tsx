'use client';

import { useEffect, useState } from 'react';

import CardGrid from '@/components/CardGrid';
import Container from '@/components/Container';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';
import { fetchJson } from '@/lib/api';
import { fetchSite } from '@/lib/cmsApi';

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
  const [hero, setHero] = useState({ title: '', subtitle: '', image: '', ctas: [] as any[] });
  const [obavestenja, setObavestenja] = useState<any[]>([]);
  const [vesti, setVesti] = useState<any[]>([]);
  const [sportskeVesti, setSportskeVesti] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const [siteData, announcementsData, newsData, sportsData] = await Promise.all([
          fetchSite(),
          fetchJson<{ items: any[] }>('/api/v1/announcements/'),
          fetchJson<{ items: any[] }>('/api/v1/posts/?type=news'),
          fetchJson<{ items: any[] }>('/api/v1/posts/?type=sport'),
        ]);
        if (!alive) return;

        const settings = siteData?.settings;
        setHero({
          title: settings?.hero_title || 'Садржај није унет',
          subtitle:
            settings?.hero_subtitle ||
            'Администратор још није унео податке за почетну страницу.',
          image: settings?.hero_image || '',
          ctas: [],
        });

        setObavestenja(mapPostsToCards(announcementsData?.items || []));
        setVesti(mapPostsToCards(newsData?.items || []));
        setSportskeVesti(mapPostsToCards(sportsData?.items || []));
      } catch {
        if (!alive) return;
        setHero({
          title: 'Садржај није унет',
          subtitle: 'Администратор још није унео податке за почетну страницу.',
          image: '',
          ctas: [],
        });
      } finally {
        if (alive) setLoading(false);
      }
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
          <SectionHeader title="Обавештења" subtitle="Најважније информације." />
          {obavestenja.length ? <CardGrid items={obavestenja} /> : <p>{loading ? 'Учитавање...' : 'Садржај још није унет.'}</p>}
        </Container>
      </section>

      <section className="pageSection">
        <Container>
          <SectionHeader title="Вести" subtitle="Најновија дешавања." />
          {vesti.length ? <CardGrid items={vesti} /> : <p>{loading ? 'Учитавање...' : 'Садржај још није унет.'}</p>}
        </Container>
      </section>

      <section className="pageSection">
        <Container>
          <SectionHeader title="Спортске вести" subtitle="Резултати, најаве и локални спорт." />
          {sportskeVesti.length ? <CardGrid items={sportskeVesti} /> : <p>{loading ? 'Учитавање...' : 'Садржај још није унет.'}</p>}
        </Container>
      </section>
    </>
  );
}
