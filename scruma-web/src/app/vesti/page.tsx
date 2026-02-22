"use client";

import { useEffect, useMemo, useState } from "react";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import CardsGrid from "@/components/CardsGrid";
import { fetchJson } from "@/lib/api";
import { FALLBACK_POSTS } from "@/content/fallback";

export default function VestiPage() {
  const [posts, setPosts] = useState<any[]>(FALLBACK_POSTS.filter((p) => p.type === "news"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchJson<{ items: any[] }>("/api/v1/posts/?type=news");
        setPosts(data?.items || []);
      } catch {
        setPosts(FALLBACK_POSTS.filter((p) => p.type === "news"));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const newsItems = useMemo(
    () =>
      posts.map((p: any) => ({
        title: p.title,
        excerpt: p.excerpt || "",
        href: `/vesti/${p.id || ""}`.trim(),
        image: p.image || undefined,
        meta: p.published_at ? new Date(p.published_at).toLocaleDateString("sr-RS") : "",
      })),
    [posts]
  );

  return (
    <>
      <PageHero title="Вести" subtitle="Најновије информације и саопштења." />
      <Section>
        {loading ? <p>Учитавање...</p> : newsItems.length ? <CardsGrid items={newsItems} /> : <p>Нема објава.</p>}
      </Section>
    </>
  );
}
