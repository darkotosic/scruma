export default function Head() {
  const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://scruma-api.onrender.com").replace(/\/+$/, "");
  const apiOrigin = (() => {
    try {
      return new URL(apiBase).origin;
    } catch {
      return "https://scruma-api.onrender.com";
    }
  })();

  return (
    <>
      <link rel="dns-prefetch" href={apiOrigin} />
      <link rel="preconnect" href={apiOrigin} crossOrigin="anonymous" />
    </>
  );
}
