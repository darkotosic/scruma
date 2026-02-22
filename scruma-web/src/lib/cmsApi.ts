import { fetchJson } from "./api";

export type SiteResponse = {
  settings: {
    site_name?: string;
    logo?: string;
    favicon?: string;
    hero_title?: string;
    hero_subtitle?: string;
    hero_image?: string;
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
    hero_image: string;
    seo_title: string;
    seo_description: string;
    updated_at: string;
  } | null;
  missing?: boolean;
  slug?: string;
};

export const fetchSite = () => fetchJson<SiteResponse>("/api/v1/site/");
export const fetchNav = () => fetchJson<NavResponse>("/api/v1/nav/");
export const fetchPage = (slug: string) =>
  fetchJson<PageResponse>(`/api/v1/pages/${slug.replace(/^\/+|\/+$/g, "")}/`);
