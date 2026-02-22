"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchPostById } from "@/lib/api";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";
import { ApiErrorState } from "@/components/ui/ApiErrorState";

export default function DogadjajiDetaljPage() {
  const sp = useSearchParams();
  const id = sp.get("id");
  const [post, setPost] = useState<any | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    if (!id) return setErr("Недостаје параметар id.");
    setErr(null);
    try {
      setPost(await fetchPostById(id));
    } catch (e: any) {
      setErr(e?.message || "Грешка при учитавању догађаја.");
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  if (err) return <ApiErrorState title="Догађај није доступан" details={err} onRetry={load} />;
  if (!post) return <SkeletonBlock className="h-[520px] w-full" />;

  return (
    <article className="prose mx-auto max-w-4xl px-4 py-10 dark:prose-invert">
      <h1>{post.title}</h1>
      <div className="text-sm opacity-70">{post.published_at}</div>
      <div dangerouslySetInnerHTML={{ __html: post.body_html || post.body || "" }} />
    </article>
  );
}
