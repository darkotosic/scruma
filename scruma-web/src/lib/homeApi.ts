import { fetchAnnouncements, fetchPosts, fetchSite } from "./api";

export type V1HomeResponse = {
  settings: any | null;
  announcements: any[];
  posts: any[];
};

export async function fetchHome(): Promise<V1HomeResponse> {
  const [site, announcements, posts] = await Promise.all([
    fetchSite(),
    fetchAnnouncements(),
    fetchPosts({}),
  ]);

  return {
    settings: site.settings,
    announcements: announcements.items,
    posts: posts.items,
  };
}
