export type ApiError = {
  status: number;
  message: string;
  url: string;
};

const DEFAULT_TIMEOUT_MS = 8000;
const DEFAULT_RETRIES = 2;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(input: RequestInfo, init: RequestInit & { timeoutMs?: number } = {}) {
  const controller = new AbortController();
  const timeoutMs = init.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal, cache: "no-store" });
  } finally {
    clearTimeout(id);
  }
}

export async function apiGetJson<T>(
  url: string,
  opts?: { timeoutMs?: number; retries?: number }
): Promise<T> {
  const retries = opts?.retries ?? DEFAULT_RETRIES;
  let lastErr: unknown = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const res = await fetchWithTimeout(url, { timeoutMs: opts?.timeoutMs });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        const err: ApiError = {
          status: res.status,
          message: text || res.statusText || "API грешка",
          url,
        };
        throw err;
      }

      return (await res.json()) as T;
    } catch (error) {
      lastErr = error;
      if (attempt < retries) {
        await sleep(350 * Math.pow(2, attempt));
        continue;
      }
      throw error;
    }
  }

  throw lastErr;
}
