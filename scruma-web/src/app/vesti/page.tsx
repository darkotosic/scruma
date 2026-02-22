"use client";

import { useEffect, useMemo, useState } from "react";
import CardsGrid from "@/components/CardsGrid";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { ApiErrorState } from "@/components/ui/ApiErrorState";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";
import { fetchPosts } from "@/lib/api";

export default function VestiPage() {
  const [posts, setPosts] = useState<any[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setErr(null);
    try {
      const data = await fetchPosts({ type: "news" });
      setPosts(data?.items || []);
    } catch (e: any) {
      setErr(e?.message || "Грешка при учитавању вести.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  const newsItems = useMemo(
    () =>
      (posts || []).map((p: any) => ({
        title: p.title,
        excerpt: p.excerpt || "",
        href: `/vesti/detalj/?id=${p.id || ""}`,
        image: p.image || undefined,
        meta: p.published_at ? new Date(p.published_at).toLocaleDateString("sr-RS") : "",
      })),
    [posts]
  );

  return (
    <>
      <PageHero title="Вести" subtitle="Најновије информације и саопштења." />
      <Section>
        {err ? (
          <ApiErrorState title="Вести нису доступне" details={err} onRetry={load} />
        ) : posts === null ? (
          <SkeletonBlock className="h-[520px] w-full" />
        ) : newsItems.length ? (
          <CardsGrid items={newsItems} />
        ) : (
          <p>Садржај није унет у админ панел.</p>
        )}
      </Section>
    </>
  );
}
