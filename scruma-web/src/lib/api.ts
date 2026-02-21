const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://example-render-api.onrender.com";

export const getApiBaseUrl = () => API_BASE_URL;

export const fetchApiHealth = async (): Promise<{ ok: boolean; message: string }> => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    // Усклађено са Django рутирањем: /api/health/
    const response = await fetch(`${API_BASE_URL}/api/health/`, { signal: controller.signal });

    clearTimeout(timeout);

    if (!response.ok) return { ok: false, message: "API је доступан, али враћа грешку." };

    return { ok: true, message: "API је доступан." };
  } catch {
    return { ok: false, message: "API није доступан. Приказан је статички fallback." };
  }
};
