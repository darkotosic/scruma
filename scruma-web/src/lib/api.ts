const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://scruma-api.onrender.com";

export const getApiBaseUrl = () => API_BASE_URL;

export const fetchApiHealth = async (): Promise<{ ok: boolean; message: string }> => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const response = await fetch(`${API_BASE_URL}/api/health/`, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) return { ok: false, message: "API је доступан, али враћа грешку." };

    return { ok: true, message: "API је доступан." };
  } catch {
    return { ok: false, message: "API није доступан." };
  }
};

export async function fetchJson<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}
