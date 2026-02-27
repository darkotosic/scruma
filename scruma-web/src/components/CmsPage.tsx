"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { ApiErrorState } from "@/components/ui/ApiErrorState";
import { StatusState } from "@/components/ui/StatusState";
import { fetchPage } from "@/lib/api";

export default function CmsPage({ slug }: { slug: string }) {
  const [page, setPage] = useState<any | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setErr(null);
    try {
      const data = await fetchPage(slug);
      if (!data?.page) {
        setErr("Садржај није унет у админ панел.");
        return;
      }
      setPage(data.page);
    } catch (e: any) {
      if (e?.status === 404) {
        setErr("Садржај није унет у админ панел (404).");
      } else {
        setErr(e?.message || "Грешка при учитавању странице.");
      }
    }
  }

  useEffect(() => {
    load();
  }, [slug]);

  if (err) return <ApiErrorState title="Страница није доступна" details={err} onRetry={load} />;

  if (!page) {
    return <StatusState variant="loading" title="Учитавање странице" details="Подаци се преузимају са CMS сервиса." />;
  }

  return (
    <>
      <PageHero
        title={page.title}
        subtitle={page.subtitle || ""}
        image={page.hero_image || ""}
        fit={slug === "kontakt" ? "contain" : "cover"}
      />
      <section className="pageSection">
        <Container>
          <div className="prose" dangerouslySetInnerHTML={{ __html: page.body_html || page.body || "" }} />
        </Container>
      </section>
    </>
  );
}
