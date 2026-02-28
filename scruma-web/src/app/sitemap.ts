import type { MetadataRoute } from "next";
import { API_BASE_URL } from "@/lib/api";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://scruma.rs").replace(/\/+$/, "");

type ContentItem = { id: string; published_at?: string; created_at?: string };

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function buildUrl(path: string) {
  return `${SITE_URL}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: buildUrl("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: buildUrl("/velika-sala"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: buildUrl("/sale"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: buildUrl("/sale/plava-sala"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: buildUrl("/sale/mala-sala"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: buildUrl("/sale/dzudo-sala"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: buildUrl("/sale/crvena-sala"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: buildUrl("/kuglana"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: buildUrl("/teretana"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: buildUrl("/bazen-borkovac"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: buildUrl("/galerija"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: buildUrl("/dogadjaji"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: buildUrl("/obavestenja"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: buildUrl("/o-nama"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: buildUrl("/kontakt"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const [eventsData, announcementsData] = await Promise.all([
    fetchJson<{ items: ContentItem[] }>("/api/v1/posts/?type=sport"),
    fetchJson<{ items: ContentItem[] }>("/api/v1/announcements/"),
  ]);

  const eventItems = (eventsData?.items || []).map((item) => ({
    url: buildUrl(`/dogadjaji/detalj/?id=${encodeURIComponent(item.id)}`),
    lastModified: item.published_at ? new Date(item.published_at) : now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const announcementItems = (announcementsData?.items || []).map((item) => ({
    url: buildUrl(`/obavestenja/detalj/?id=${encodeURIComponent(item.id)}`),
    lastModified: item.created_at ? new Date(item.created_at) : now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...eventItems, ...announcementItems];
}
