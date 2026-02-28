// scruma-web/src/components/JsonLd.tsx
"use client";

import { useEffect, useMemo } from "react";

type Props = {
  /** Јединствени ID да не би дошло до дуплирања/конфликта */
  id: string;
  data: any;
};

export default function JsonLd({ id, data }: Props) {
  const json = useMemo(() => JSON.stringify(data), [data]);

  useEffect(() => {
    // Уклонити стари script ако постоји (промена route/query param).
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.text = json;
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [id, json]);

  return null;
}
