import { fetchJson } from "./api";

export type V1HomeResponse = {
  settings: any;
  announcements: any[];
  posts: any[];
};

const FALLBACK: V1HomeResponse = {
  settings: null,
  announcements: [],
  posts: [],
};

export async function fetchHome(): Promise<V1HomeResponse> {
  return fetchJson<V1HomeResponse>("/api/v1/home/", FALLBACK);
}

export async function fetchHome() {
  const payload = await fetchHomePayload();

  if (!payload) {
    return null;
  }

  return {
    posts: [
      ...(payload.news ?? []).map((item) => ({ ...item, type: 'news' })),
      ...(payload.notices ?? []).map((item) => ({ ...item, type: 'notice' })),
      ...(payload.sports ?? []).map((item) => ({ ...item, type: 'sport' }))
    ]
  };
}
