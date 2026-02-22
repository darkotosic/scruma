"use client";

import { useEffect, useMemo, useState } from "react";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import { fetchPage } from "@/lib/cmsApi";
import { FALLBACK_PAGES } from "@/content/fallback";

export default function CmsPage({ slug, fallbackTitle }: { slug: string; fallbackTitle: string }) {
  const local = useMemo(() => FALLBACK_PAGES[slug], [slug]);

  const [title, setTitle] = useState(local?.title || fallbackTitle);
  const [subtitle, setSubtitle] = useState(local?.subtitle || "");
  const [body, setBody] = useState(local?.body || "");
  const [heroImage, setHeroImage] = useState(local?.hero_image || "");
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    // ако slug није у fallback-у, не ломи UX: ипак прикажи бар поруку, па пробај API
    let alive = true;

    (async () => {
      try {
        const data = await fetchPage(slug);
        if (!alive) return;

        if (!data.page) {
          // Ако немамо ни API садржај, а имамо локални, НЕ сматрај као missing
          if (!local) setMissing(true);
          return;
        }

        setTitle(data.page.title || local?.title || fallbackTitle);
        setSubtitle(data.page.subtitle || local?.subtitle || "");
        setBody(data.page.body || local?.body || "");
        setHeroImage(data.page.hero_image || local?.hero_image || "");
        setMissing(false);
      } catch {
        // API недоступан: остани на локалном fallback-у
        if (!alive) return;
        if (!local) setMissing(true);
      }
    })();

    return () => {
      alive = false;
    };
  }, [slug, fallbackTitle, local]);

  return (
    <>
      <PageHero title={title} subtitle={subtitle} image={heroImage} />
      <section className="pageSection">
        <Container>
          {missing ? (
            <div className="card">
              <h2>Садржај није доступан</h2>
              <p>Нема локалног fallback-а за ову страницу, а CMS садржај није доступан.</p>
            </div>
          ) : (
            <div className="prose" dangerouslySetInnerHTML={{ __html: body }} />
          )}
        </Container>
      </section>
    </>
  );
}
