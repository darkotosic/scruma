"use client";

import { useEffect, useMemo, useState } from "react";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import CardsGrid from "@/components/CardsGrid";
import { fetchHome } from "@/lib/homeApi";
import { HOME } from "@/lib/content";

export default function VestiPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchHome();
      if (data?.posts?.length) setPosts(data.posts);
    })();
  }, []);

  const newsItems = useMemo(() => {
    const fromApi = posts.filter((p) => p.type === "news");
    const base = fromApi.length ? fromApi : HOME.vesti;

    return base.map((p: any) => ({
      title: p.title,
      excerpt: p.excerpt || "",
      href: `/vesti/${p.id || ""}`.trim(),
      image: p.image || undefined,
      meta: p.published_at ? new Date(p.published_at).toLocaleDateString("sr-RS") : "",
    }));
  }, [posts]);

  return (
    <>
      <PageHero title="Вести" subtitle="Најновије информације и саопштења." />
      <Section>
        <CardsGrid items={newsItems} />
      </Section>
    </>
  );
}
