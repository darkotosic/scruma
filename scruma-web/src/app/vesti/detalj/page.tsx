"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { fetchPostById } from "@/lib/api";
import { ApiErrorState } from "@/components/ui/ApiErrorState";
import { StatusState } from "@/components/ui/StatusState";

export default function VestiDetaljPage() {
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
      setErr(e?.message || "Грешка при учитавању вести.");
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  if (err) return <ApiErrorState title="Вест није доступна" details={err} onRetry={load} />;
  if (!post) return <StatusState variant="loading" title="Учитавање вести" details="Подаци се преузимају са CMS сервиса." />;

  return (
    <article className="prose mx-auto max-w-4xl px-4 py-10 dark:prose-invert">
      <Breadcrumbs items={[{ label: "Насловна", href: "/" }, { label: "Вести", href: "/vesti" }, { label: post.title }]} />
      <h1>{post.title}</h1>
      <div className="text-sm opacity-70">{post.published_at}</div>
      <div dangerouslySetInnerHTML={{ __html: post.body_html || post.body || "" }} />
    </article>
  );
}
