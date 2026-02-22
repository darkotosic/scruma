"use client";

import { useEffect } from "react";
import { fetchSiteSettings } from "@/lib/api";

function upsertFavicon(href: string) {
  const head = document.head;
  const rels = ["icon", "shortcut icon"];

  rels.forEach((rel) => {
    let link = head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.rel = rel;
      head.appendChild(link);
    }
    link.href = href;
  });
}

export default function SiteFavicon() {
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const settings = await fetchSiteSettings();
        if (!alive) return;

        if (settings.favicon) {
          upsertFavicon(settings.favicon);
        }
      } catch {
        // Без локалног fallback-а: ако API падне, једноставно не мењамо favicon
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return null;
}
