"use client";

import { useEffect, useState } from "react";
import CardGrid from "@/components/CardGrid";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import { ApiErrorState } from "@/components/ui/ApiErrorState";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";
import { fetchAnnouncements, fetchPosts, fetchSite } from "@/lib/api";

function mapPostsToCards(posts: any[], hrefBuilder: (item: any) => string) {
  return posts.map((p) => ({
    title: p.title,
    subtitle: p.excerpt || p.body || "",
    date: (p.published_at || p.created_at || "").slice(0, 10),
    image: p.image || undefined,
    href: hrefBuilder(p),
  }));
}

export default function HomeClient() {
  const [data, setData] = useState<any | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setErr(null);
    try {
      const [site, announcements, news, sport] = await Promise.all([
        fetchSite(),
        fetchAnnouncements(),
        fetchPosts({ type: "news", limit: 6 }),
        fetchPosts({ type: "sport", limit: 6 }),
      ]);
      setData({ site, announcements, news, sport });
    } catch (e: any) {
      const message = typeof e?.message === "string" ? e.message : "Неуспешно учитавање података са API-ја.";
      const status = typeof e?.status === "number" ? `Код: ${e.status}` : "";
      setErr([message, status].filter(Boolean).join("\n"));
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (err) {
    return <ApiErrorState details={err} onRetry={load} />;
  }

  if (!data) {
    return (
      <div className="space-y-6 p-4">
        <SkeletonBlock className="h-[360px] w-full" />
        <div className="grid gap-4 md:grid-cols-3">
          <SkeletonBlock className="h-[140px]" />
          <SkeletonBlock className="h-[140px]" />
          <SkeletonBlock className="h-[140px]" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <SkeletonBlock className="h-[220px]" />
          <SkeletonBlock className="h-[220px]" />
          <SkeletonBlock className="h-[220px]" />
        </div>
      </div>
    );
  }

  const settings = data.site?.settings || {};
  const announcements = mapPostsToCards(data.announcements?.items || [], (p) => `/obavestenja/detalj/?id=${p.id}`);
  const news = mapPostsToCards(data.news?.items || [], (p) => `/vesti/detalj/?id=${p.id}`);
  const sports = mapPostsToCards(data.sport?.items || [], (p) => `/dogadjaji/detalj/?id=${p.id}`);

  return (
    <>
      <Hero title={settings.hero_title || "Садржај није унет у админ панел"} subtitle={settings.hero_subtitle || ""} image={settings.hero_image || ""} ctas={[]} />

      <section className="pageSection">
        <Container>
          <SectionHeader title="Обавештења" subtitle="Најважније информације." />
          {announcements.length ? <CardGrid items={announcements} /> : <p>Садржај није унет у админ панел.</p>}
        </Container>
      </section>

      <section className="pageSection">
        <Container>
          <SectionHeader title="Вести" subtitle="Најновија дешавања." />
          {news.length ? <CardGrid items={news} /> : <p>Садржај није унет у админ панел.</p>}
        </Container>
      </section>

      <section className="pageSection">
        <Container>
          <SectionHeader title="Спортске вести" subtitle="Резултати, најаве и локални спорт." />
          {sports.length ? <CardGrid items={sports} /> : <p>Садржај није унет у админ панел.</p>}
        </Container>
      </section>
    </>
  );
}
