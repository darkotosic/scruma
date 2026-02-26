"use client";

import { useEffect, useState } from "react";
import CardsGrid from "@/components/CardsGrid";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { ApiErrorState } from "@/components/ui/ApiErrorState";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";
import { fetchPosts } from "@/lib/api";
import { toPreviewText } from "@/lib/normalizeContent";

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
      <PageHero title="Догађаји" subtitle="Актуелна спортска дешавања." />
      <Section>
        {err ? (
          <ApiErrorState title="Догађаји нису доступни" details={err} onRetry={load} />
        ) : posts === null ? (
          <SkeletonBlock className="h-[520px] w-full" />
        ) : posts.length ? (
          <CardsGrid
            items={posts.map((p) => ({
              title: p.title,
              excerpt: toPreviewText(p.excerpt || p.body || p.body_html || ""),
              image: p.image,
              href: `/dogadjaji/detalj/?id=${p.id}`,
              meta: p.published_at ? new Date(p.published_at).toLocaleDateString("sr-RS") : "",
            }))}
          />
        ) : (
          <p>Садржај није унет у админ панел.</p>
        )}
      </Section>
    </>
  );
}
