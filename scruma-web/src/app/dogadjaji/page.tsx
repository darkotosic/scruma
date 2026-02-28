"use client";

import { useEffect, useState } from "react";
import CardsGrid from "@/components/CardsGrid";
import CardGridSkeleton from "@/components/CardGridSkeleton";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { ApiErrorState } from "@/components/ui/ApiErrorState";
import { StatusState } from "@/components/ui/StatusState";
import { fetchPosts } from "@/lib/api";
import { toPreviewText } from "@/lib/normalizeContent";
import { formatLocalDate } from "@/lib/dateFormat";

export default function DogadjajiPage() {
  const [posts, setPosts] = useState<any[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setErr(null);
    try {
      const data = await fetchPosts({ type: "sport" });
      setPosts(data.items || []);
    } catch (e: any) {
      setErr(e?.message || "Грешка при учитавању догађаја.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <PageHero title="Догађаји" subtitle="Актуелна спортска дешавања." image="/images/hero.webp" />
      <Section>
        {err ? (
          <ApiErrorState title="Догађаји нису доступни" details={err} onRetry={load} />
        ) : posts === null ? (
          <CardGridSkeleton count={6} />
        ) : posts.length ? (
          <CardsGrid
            items={posts.map((p) => ({
              title: p.title,
              excerpt: toPreviewText(p.excerpt || p.body || p.body_html || ""),
              image: p.image,
              href: `/dogadjaji/detalj/?id=${p.id}`,
              meta: p.published_at ? formatLocalDate(p.published_at) : "",
            }))}
          />
        ) : (
          <StatusState variant="empty" title="Садржај још није унет" details="Догађаји ће бити приказани чим се унесу у админ панел." />
        )}
      </Section>
    </>
  );
}
