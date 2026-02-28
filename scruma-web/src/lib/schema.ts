import { toPreviewText } from "./normalizeContent";

export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://scruma.rs").replace(/\/+$/, "");

export const ORG = {
  name: "Спортски центар Рума",
  address: "Veljka Dugoševića 100, Ruma",
  telephone: "+381605680004",
  sameAs: [
    "https://www.facebook.com/profile.php?id=100041307083076",
    "https://maps.app.goo.gl/q9pB8D9hBvSTWFFw7",
  ],
};

export function absUrl(urlOrPath?: string | null): string | undefined {
  if (!urlOrPath) return undefined;
  const raw = String(urlOrPath).trim();
  if (!raw) return undefined;
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("/")) return `${SITE_URL}${raw}`;
  return `${SITE_URL}/${raw}`;
}

export function isoOrUndefined(v?: any): string | undefined {
  if (!v) return undefined;
  const s = String(v).trim();
  if (!s) return undefined;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

export function buildOrgGraph() {
  const logo = absUrl("/logo.webp");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        name: ORG.name,
        url: SITE_URL,
        logo,
        sameAs: ORG.sameAs,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: ORG.telephone,
            contactType: "customer service",
            areaServed: "RS",
            availableLanguage: ["sr"],
          },
        ],
      },
      {
        "@type": "SportsActivityLocation",
        "@id": `${SITE_URL}#sports-activity-location`,
        name: ORG.name,
        url: SITE_URL,
        telephone: ORG.telephone,
        address: {
          "@type": "PostalAddress",
          streetAddress: ORG.address,
          addressLocality: "Ruma",
          addressCountry: "RS",
        },
        sameAs: ORG.sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: ORG.name,
        publisher: { "@id": `${SITE_URL}#organization` },
      },
    ],
  };
}

export function buildNewsArticleJsonLd(post: any, kind: "news" | "notice") {
  const url = absUrl(
    kind === "notice"
      ? `/obavestenja/detalj/?id=${encodeURIComponent(String(post?.id ?? ""))}`
      : `/vesti/detalj/?id=${encodeURIComponent(String(post?.id ?? ""))}`
  );

  const headline = String(post?.title || "").trim();
  const image = absUrl(post?.image) || absUrl("/images/hero.jpg");
  const published = isoOrUndefined(post?.published_at) || isoOrUndefined(post?.created_at);
  const description = toPreviewText(post?.excerpt || post?.body || post?.body_html || "");

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: url ? { "@type": "WebPage", "@id": url } : undefined,
    headline,
    description,
    image: image ? [image] : undefined,
    datePublished: published,
    dateModified: published,
    author: { "@type": "Organization", name: ORG.name },
    publisher: {
      "@type": "Organization",
      name: ORG.name,
      logo: { "@type": "ImageObject", url: absUrl("/logo.webp") },
    },
  };
}

export function buildSportsEventJsonLd(post: any) {
  const url = absUrl(`/dogadjaji/detalj/?id=${encodeURIComponent(String(post?.id ?? ""))}`);
  const name = String(post?.title || "").trim();

  const start =
    isoOrUndefined(post?.event_start) ||
    isoOrUndefined(post?.start_date) ||
    isoOrUndefined(post?.starts_at) ||
    isoOrUndefined(post?.event_date) ||
    isoOrUndefined(post?.published_at);

  const end = isoOrUndefined(post?.event_end);

  const image = absUrl(post?.image) || absUrl("/images/hero.jpg");
  const description = toPreviewText(post?.excerpt || post?.body || post?.body_html || "");
  const locationName = String(post?.location_name || "").trim() || ORG.name;
  const opponent = String(post?.opponent || "").trim();
  const ticketUrl = String(post?.ticket_url || "").trim();

  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name,
    description,
    url,
    startDate: start,
    endDate: end,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: locationName,
      address: {
        "@type": "PostalAddress",
        streetAddress: ORG.address,
        addressLocality: "Ruma",
        addressCountry: "RS",
      },
    },
    organizer: { "@type": "Organization", name: ORG.name, url: SITE_URL },
    image: image ? [image] : undefined,
    competitor: opponent ? [{ "@type": "SportsTeam", name: opponent }] : undefined,
    offers: ticketUrl
      ? [
          {
            "@type": "Offer",
            url: ticketUrl,
            availability: "https://schema.org/InStock",
          },
        ]
      : undefined,
  };
}
