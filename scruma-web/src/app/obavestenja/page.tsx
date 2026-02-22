"use client";

import { useEffect, useState } from "react";
import CardsGrid from "@/components/CardsGrid";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { ApiErrorState } from "@/components/ui/ApiErrorState";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";
import { fetchAnnouncements } from "@/lib/api";

export default function ObavestenjaPage() {
  const [items, setItems] = useState<any[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setErr(null);
    try {
      const data = await fetchAnnouncements();
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
          <SkeletonBlock className="h-[520px] w-full" />
        ) : items.length ? (
          <CardsGrid
            items={items.map((p) => ({
              title: p.title,
              excerpt: p.body,
              href: `/obavestenja/detalj/?id=${p.id}`,
              meta: p.created_at ? new Date(p.created_at).toLocaleDateString("sr-RS") : "",
            }))}
          />
        ) : (
          <p>Садржај није унет у админ панел.</p>
        )}
      </Section>
    </>
  );
}
