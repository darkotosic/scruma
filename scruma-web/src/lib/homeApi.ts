import { fetchJson } from "./api";

export type V1HomeResponse = {
  settings: any | null;
  announcements: any[];
  posts: any[];
};

export async function fetchHome(): Promise<V1HomeResponse> {
  return fetchJson<V1HomeResponse>("/api/v1/home/");
}
