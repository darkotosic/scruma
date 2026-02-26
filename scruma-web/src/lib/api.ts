// scruma-web/src/lib/api.ts

export const API_BASE_URL = (() => {
  const raw =
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ||
    "https://scruma-api.onrender.com";

  return raw.replace(/\/+$/, "");
})();

export const getApiBaseUrl = () => API_BASE_URL;

type Json = any;

export type SiteResponse = {
  settings: {
    site_name?: string;
    logo?: string;
    favicon?: string;
    social_facebook_icon?: string;
    hero_title?: string;
    hero_subtitle?: string;
    hero_image?: string;
    address?: string;
    maps_embed_url?: string;
    footer_text?: string;
    footer_logo?: string;
    footer_bottom_text?: string;
    footer_columns?: { title: string; links: { label: string; url: string }[] }[];
  } | null;
};

export type NavResponse = { items: { href: string; label: string }[] };

export type PageResponse = {
  page: {
    slug: string;
    title: string;
    subtitle: string;
    body: string;
    body_html?: string;
    hero_image: string;
    seo_title: string;
    seo_description: string;
    updated_at: string;
  } | null;
  missing?: boolean;
  slug?: string;
};

export type PostsResponse = {
  items: {
    id: string;
    type: string;
    title: string;
    excerpt?: string;
    body?: string;
    body_html?: string;
    image?: string;
    published_at?: string;
  }[];
};

export type PostResponse = {
  id: string;
  type: string;
  title: string;
  excerpt?: string;
  body?: string;
  body_html?: string;
  image?: string;
  published_at?: string;
};

async function fetchJson<T = Json>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText}: ${text || url}`);
  }

  return (await res.json()) as T;
}

export function fetchApiHealth() {
  return fetchJson<{ status: string; service?: string; time?: string }>("/health/");
}

export function fetchSite() {
  return fetchJson<SiteResponse>("/api/v1/site/");
}

export async function fetchSiteSettings() {
  const data = await fetchSite();
  return data.settings || {};
}

export function fetchNav() {
  return fetchJson<NavResponse>("/api/v1/nav/");
}

export function fetchPage(slug: string) {
  return fetchJson<PageResponse>(`/api/v1/pages/${slug.replace(/^\/+|\/+$/g, "")}/`);
}

export function fetchPosts(params: { type?: string; limit?: number }) {
  const qs = new URLSearchParams();
  if (params.type) qs.set("type", params.type);
  if (params.limit) qs.set("limit", String(params.limit));
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return fetchJson<PostsResponse>(`/api/v1/posts/${suffix}`);
}

export function fetchPostById(id: string) {
  return fetchJson<PostResponse>(`/api/v1/posts/${id}/`);
}

export function fetchAnnouncements() {
  return fetchJson<PostsResponse>("/api/v1/announcements/");
}
