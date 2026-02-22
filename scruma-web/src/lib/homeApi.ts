import { getApiBaseUrl } from './api';

export type HomeApiPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  link_url: string;
  published_at: string;
};

export type HomeApiPayload = {
  settings: {
    site_name: string;
    logo: string;
    favicon: string;
    hero_title: string;
    hero_subtitle: string;
    hero_image: string;
    maps_embed_url: string;
    footer_text: string;
  };
  news: HomeApiPost[];
  notices: HomeApiPost[];
  sports: HomeApiPost[];
};

export async function fetchHomePayload(): Promise<HomeApiPayload | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`${getApiBaseUrl()}/api/home/`, {
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeout);

    if (!res.ok) return null;
    return (await res.json()) as HomeApiPayload;
  } catch {
    return null;
  }
}
