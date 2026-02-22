import { fetchJson } from './api';

export type HomeAnnouncement = {
  id: number;
  title: string;
  body: string;
  created_at: string;
};

export type HomePost = {
  id: number;
  type: string;
  title: string;
  excerpt: string;
  body: string;
  image: string;
  is_published: boolean;
  published_at: string;
  link_url?: string;
};

export type HomeSettings = {
  hero_title?: string;
  hero_subtitle?: string;
  hero_image?: string;
  maps_embed_url?: string;
};

export type HomeSettings = {
  hero_title?: string;
  hero_subtitle?: string;
  hero_image?: string;
  maps_embed_url?: string;
};

export type HomePost = {
  id: number;
  type?: "news" | "notice" | "sport";
  title: string;
  excerpt?: string;
  body?: string;
  image?: string;
  link_url?: string;
  published_at?: string;
};

export type HomeAnnouncement = {
  id: number;
  title: string;
  body?: string;
  created_at?: string;
};

export type V1HomeResponse = {
  settings: HomeSettings | null;
  announcements: HomeAnnouncement[];
  posts: HomePost[];
};

const FALLBACK: V1HomeResponse = {
  settings: null,
  announcements: [],
  posts: [],
};

export async function fetchHome(): Promise<V1HomeResponse> {
  return fetchJson<V1HomeResponse>("/api/v1/home/", FALLBACK);
}
