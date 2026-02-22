"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchAnnouncements } from "@/lib/api";
import { ApiErrorState } from "@/components/ui/ApiErrorState";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";

export default function ObavestenjaDetaljPage() {
  const sp = useSearchParams();
  const id = sp.get("id");
  const [item, setItem] = useState<any | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    if (!id) return setErr("Недостаје параметар id.");
    setErr(null);
    try {
      const data = await fetchAnnouncements();
      const found = (data.items || []).find((entry: any) => String(entry.id) === String(id));
      if (!found) {
        setErr("Садржај није унет у админ панел.");
        return;
      }
      setItem(found);
    } catch (e: any) {
      setErr(e?.message || "Грешка при учитавању обавештења.");
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  if (err) return <ApiErrorState title="Обавештење није доступно" details={err} onRetry={load} />;
  if (!item) return <SkeletonBlock className="h-[420px] w-full" />;

  return (
    <article className="prose mx-auto max-w-4xl px-4 py-10 dark:prose-invert">
      <h1>{item.title}</h1>
      <div className="text-sm opacity-70">{item.created_at}</div>
      <div dangerouslySetInnerHTML={{ __html: item.body || "" }} />
    </article>
  );
}
