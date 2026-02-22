import { fetchJson } from "./api";

export type V1HomeResponse = {
  settings: any | null;
  announcements: any[];
  posts: any[];
};

const FALLBACK: V1HomeResponse = {
  settings: null,
  announcements: [],
  posts: [],
};

export async function fetchHome(): Promise<V1HomeResponse> {
  // Django: /api/v1/home/
  return fetchJson<V1HomeResponse>("/api/v1/home/", FALLBACK);
}
