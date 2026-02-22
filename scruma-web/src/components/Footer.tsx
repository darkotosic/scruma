"use client";

import { useEffect, useState } from "react";
import { fetchSite } from "@/lib/api";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";

export default function Footer() {
  const [settings, setSettings] = useState<any | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchSite();
        setSettings(data?.settings ?? null);
      } catch {
        setError(true);
      }
    })();
  }, []);

  if (!settings && !error) {
    return (
      <footer className="mt-16 border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl space-y-4 px-4 py-10">
          <SkeletonBlock className="h-8 w-44" />
          <SkeletonBlock className="h-24 w-full" />
          <SkeletonBlock className="h-4 w-72" />
        </div>
      </footer>
    );
  }

  if (error || !settings) {
    return (
      <footer className="mt-16 border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm opacity-80">Сервис није доступан.</div>
      </footer>
    );
  }

  const columns = settings.footer_columns || [];
  const footerLogo = settings.footer_logo || "";
  const bottom = settings.footer_bottom_text || "© 2026 СЦ Рума — Званична интернет презентација";
  const legacy = settings.footer_text || "";

  return (
    <footer className="mt-16 border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center gap-3">
          {footerLogo ? <img src={footerLogo} alt="Футер лого" className="h-10 w-auto" /> : null}
          <div className="text-sm opacity-80">{settings.site_name || "СЦ Рума"}</div>
        </div>

        {columns.length ? (
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {columns.map((c: any, idx: number) => (
              <div key={idx}>
                <div className="text-sm font-semibold">{c.title}</div>
                <ul className="mt-3 space-y-2 text-sm opacity-90">
                  {(c.links || []).map((l: any, j: number) => (
                    <li key={j}>
                      <a className="underline-offset-4 hover:underline" href={l.url}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : legacy ? (
          <div className="mt-6 text-sm opacity-80">{legacy}</div>
        ) : null}

        <div className="mt-10 text-xs opacity-70">{bottom}</div>
      </div>
    </footer>
  );
}
