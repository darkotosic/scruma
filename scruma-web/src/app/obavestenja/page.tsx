"use client";

import { useEffect, useState } from "react";
import CardsGrid from "@/components/CardsGrid";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { ApiErrorState } from "@/components/ui/ApiErrorState";
import { StatusState } from "@/components/ui/StatusState";
import { fetchPosts } from "@/lib/api";
import { toPreviewText } from "@/lib/normalizeContent";

export default function ObavestenjaPage() {
  const [items, setItems] = useState<any[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setErr(null);
    try {
      const data = await fetchPosts({ type: "notice" });
      setItems(data.items || []);
    } catch (e: any) {
      setErr(e?.message || "Грешка при учитавању обавештења.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <PageHero title="Обавештења" subtitle="Званична саопштења." />
      <Section>
        {err ? (
          <ApiErrorState title="Обавештења нису доступна" details={err} onRetry={load} />
        ) : items === null ? (
          <StatusState variant="loading" title="Учитавање обавештења" details="Подаци се преузимају са CMS сервиса." />
        ) : items.length ? (
          <CardsGrid
            items={items.map((p) => ({
              title: p.title,
              excerpt: toPreviewText(p.excerpt || p.body || p.body_html || ""),
              href: `/obavestenja/detalj/?id=${p.id}`,
              meta: p.published_at ? new Date(p.published_at).toLocaleDateString("sr-RS") : "",
            }))}
          />
        ) : (
          <StatusState variant="empty" title="Садржај још није унет" details="Обавештења ће бити приказана чим се унесу у админ панел." />
        )}
      </Section>
    </>
  );
}
