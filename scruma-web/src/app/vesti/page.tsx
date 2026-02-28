"use client";

import { useEffect, useMemo, useState } from "react";
import CardsGrid from "@/components/CardsGrid";
import CardGridSkeleton from "@/components/CardGridSkeleton";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { ApiErrorState } from "@/components/ui/ApiErrorState";
import { StatusState } from "@/components/ui/StatusState";
import { fetchPosts } from "@/lib/api";
import { toPreviewText } from "@/lib/normalizeContent";
import { formatLocalDate } from "@/lib/dateFormat";

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
        excerpt: toPreviewText(p.excerpt || p.body || p.body_html || ""),
        href: `/vesti/detalj/?id=${p.id || ""}`,
        image: p.image || undefined,
        meta: p.published_at ? formatLocalDate(p.published_at) : "",
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
          <CardGridSkeleton count={6} />
        ) : newsItems.length ? (
          <CardsGrid items={newsItems} />
        ) : (
          <StatusState variant="empty" title="Садржај још није унет" details="Вести ће бити приказане чим се унесу у админ панел." />
        )}
      </Section>
    </>
  );
}
