"use client";

import { useEffect, useState } from "react";
import CardGrid from "@/components/CardGrid";
import CardGridSkeleton from "@/components/CardGridSkeleton";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import { ApiErrorState } from "@/components/ui/ApiErrorState";
import { StatusState } from "@/components/ui/StatusState";
import { fetchPosts, fetchSite } from "@/lib/api";
import { mapPostToCard } from "@/lib/normalizeContent";

function mapPostsToCards(posts: any[], hrefBuilder: (item: any) => string) {
  return posts.map((p) => mapPostToCard(p, hrefBuilder(p)));
}

export default function HomeClient() {
  const [data, setData] = useState<any>({
    site: { settings: {} },
    notice: { items: [] },
    sport: { items: [] },
  });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [mapVisible, setMapVisible] = useState(false);

  async function load() {
    setErr(null);
    setLoading(true);
    try {
      const [site, notice, sport] = await Promise.all([
        fetchSite(),
        fetchPosts({ type: "notice", limit: 6 }),
        fetchPosts({ type: "sport", limit: 6 }),
      ]);
      setData({ site, notice, sport });
    } catch (e: any) {
      const message = typeof e?.message === "string" ? e.message : "Неуспешно учитавање података са API-ја.";
      const status = typeof e?.status === "number" ? `Код: ${e.status}` : "";
      setErr([message, status].filter(Boolean).join("\n"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const settings = data.site?.settings || {};
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16836.482932287636!2d19.8200236!3d45.00925155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475babf00502b12f%3A0xa91ad9140edc7e6a!2z0KHQv9C-0YDRgtGB0LrQviDQv9C-0YHQu9C-0LLQvdC4INGG0LXQvdGC0LDRgA!5e1!3m2!1sen!2srs!4v1772221925607!5m2!1sen!2srs";
  const mapFallbackUrl = "https://www.google.com/maps/place/Спортско+пословни+центар/@45.0089564,19.8160274,17.25z/data=!4m6!3m5!1s0x475babf00502b12f:0xa91ad9140edc7e6a!8m2!3d45.0087316!4d19.8203575!16s%2Fg%2F11f1vm7wr4?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D";
  const announcements = mapPostsToCards(data.notice?.items || [], (p) => `/obavestenja/detalj/?id=${p.id}`);
  const sports = mapPostsToCards(data.sport?.items || [], (p) => `/dogadjaji/detalj/?id=${p.id}`);

  return (
    <>
      <Hero
        title={settings.hero_title || "Садржај није унет у админ панел"}
        subtitle={settings.hero_subtitle || ""}
        image={settings.hero_image || ""}
        ctas={[
          { title: "Контакт", href: "/kontakt" },
          { title: "Сале", href: "/sale" },
        ]}
      />

      <section className="pageSection">
        <Container>
          <SectionHeader title="Обавештења" subtitle="Најважније информације." />
          {announcements.length ? (
            <CardGrid items={announcements} />
          ) : loading ? (
            <CardGridSkeleton count={6} />
          ) : (
            <StatusState variant="empty" title="Садржај још није унет" details="Обавештења ће бити приказана чим се унесу у админ панел." />
          )}
        </Container>
      </section>

      <section className="pageSection">
        <Container>
          <SectionHeader title="Спортске вести" subtitle="Резултати, најаве и локални спорт." />
          {sports.length ? (
            <CardGrid items={sports} />
          ) : loading ? (
            <CardGridSkeleton count={6} />
          ) : (
            <StatusState variant="empty" title="Садржај још није унет" details="Спортски догађаји ће бити приказани чим се унесу у админ панел." />
          )}
        </Container>
      </section>

      <section className="pageSection">
        <Container>
          <SectionHeader title="Како до нас" subtitle="Локација и приступ спортском центру." />

          {mapVisible ? (
            <div className="map-wrapper">
              <iframe
                src={mapEmbedUrl}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Локација спортског центра"
              ></iframe>
            </div>
          ) : (
            <div className="panel" style={{ display: "grid", gap: "10px" }}>
              <p style={{ margin: 0 }}>Мапа се учитава на захтев ради бржег отварања странице.</p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button type="button" className="btn btnPrimary" onClick={() => setMapVisible(true)}>
                  Прикажи мапу
                </button>
                <a className="btn" href={mapFallbackUrl} target="_blank" rel="noopener noreferrer">
                  Отвори у Google мапама
                </a>
              </div>
            </div>
          )}
        </Container>
      </section>

      {err ? (
        <section className="pageSection">
          <Container>
            <ApiErrorState details={err} onRetry={load} />
          </Container>
        </section>
      ) : null}

    </>
  );
}
