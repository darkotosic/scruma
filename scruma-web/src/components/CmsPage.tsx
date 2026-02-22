"use client";

import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import { fetchPage } from "@/lib/cmsApi";

export default function CmsPage({ slug, fallbackTitle }: { slug: string; fallbackTitle: string }) {
  const [title, setTitle] = useState(fallbackTitle);
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchPage(slug);
        if (!alive) return;

        if (!data.page) {
          setMissing(true);
          return;
        }

        setTitle(data.page.title || fallbackTitle);
        setSubtitle(data.page.subtitle || "");
        setBody(data.page.body || "");
        setHeroImage(data.page.hero_image || "");
      } catch {
        setMissing(true);
      }
    })();

    return () => {
      alive = false;
    };
  }, [slug, fallbackTitle]);

  return (
    <>
      <PageHero title={title} subtitle={subtitle} image={heroImage} />
      <section className="pageSection">
        <Container>
          {missing ? (
            <div className="card">
              <h2>Садржај није унет</h2>
              <p>Ова страница је активна, али администратор још није унео садржај у систему.</p>
            </div>
          ) : (
            <div className="prose" dangerouslySetInnerHTML={{ __html: body }} />
          )}
        </Container>
      </section>
    </>
  );
}
