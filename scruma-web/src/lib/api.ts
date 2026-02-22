import { apiGetJson } from "./apiClient";
import { API_BASE_URL } from "@/config/api";

const BASE = API_BASE_URL;

export const getApiBaseUrl = () => BASE;

export type SiteResponse = {
  settings: {
    site_name?: string;
    logo?: string;
    favicon?: string;
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

export function fetchApiHealth() {
  return apiGetJson<{ status: string; service?: string; time?: string }>(`${BASE}/health/`, {
    timeoutMs: 3000,
    retries: 1,
  });
}

export function fetchSite() {
  return apiGetJson<SiteResponse>(`${BASE}/api/v1/site/`);
}

export function fetchNav() {
  return apiGetJson<NavResponse>(`${BASE}/api/v1/nav/`);
}

export function fetchPage(slug: string) {
  return apiGetJson<PageResponse>(`${BASE}/api/v1/pages/${slug.replace(/^\/+|\/+$/g, "")}/`);
}

export function fetchPosts(params: { type?: string; limit?: number }) {
  const q = new URLSearchParams();
  if (params.type) q.set("type", params.type);
  if (params.limit) q.set("limit", String(params.limit));
  const qs = q.toString();
  return apiGetJson<PostsResponse>(`${BASE}/api/v1/posts/${qs ? `?${qs}` : ""}`);
}

export function fetchPostById(id: string) {
  return apiGetJson<PostResponse>(`${BASE}/api/v1/posts/${id}/`);
}

export function fetchAnnouncements() {
  return apiGetJson<{ items: { id: string; title: string; body: string; created_at?: string }[] }>(
    `${BASE}/api/v1/announcements/`
  );
}
