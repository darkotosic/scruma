"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import DetailFooterNav from "@/components/DetailFooterNav";
import { fetchPostById, fetchPosts } from "@/lib/api";
import { formatLocalDate } from "@/lib/dateFormat";
import { ApiErrorState } from "@/components/ui/ApiErrorState";
import { StatusState } from "@/components/ui/StatusState";
import JsonLd from "@/components/JsonLd";
import { buildSportsEventJsonLd } from "@/lib/schema";

export default function DogadjajiDetaljPage() {
  const sp = useSearchParams();
  const id = sp.get("id");
  const [post, setPost] = useState<any | null>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    if (!id) return setErr("Недостаје параметар id.");
    setErr(null);
    try {
      const [singlePost, listData] = await Promise.all([
        fetchPostById(id),
        fetchPosts({ type: "sport" }),
      ]);
      setPost(singlePost);
      setRelated(listData?.items || []);
    } catch (e: any) {
      setErr(e?.message || "Грешка при учитавању догађаја.");
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  const nextPost = useMemo(() => {
    if (!id || !related.length) return null;
    const sorted = [...related].sort(
      (a, b) =>
        new Date(b.event_start || b.published_at || 0).getTime() -
        new Date(a.event_start || a.published_at || 0).getTime()
    );
    const index = sorted.findIndex((item) => String(item.id) === String(id));
    return index >= 0 ? sorted[index + 1] || null : null;
  }, [id, related]);

  if (err) return <ApiErrorState title="Догађај није доступан" details={err} onRetry={load} />;
  if (!post) return <StatusState variant="loading" title="Учитавање догађаја" details="Подаци се преузимају са CMS сервиса." />;

  return (
    <>
      <JsonLd id="jsonld-event" data={buildSportsEventJsonLd(post)} />
      <article className="prose mx-auto max-w-4xl px-4 py-10 dark:prose-invert">
        <Breadcrumbs items={[{ label: "Насловна", href: "/" }, { label: "Догађаји", href: "/dogadjaji" }, { label: post.title }]} />
        <h1>{post.title}</h1>
        <div className="text-sm opacity-70">{formatLocalDate(post.event_start || post.published_at, true)}</div>
        <div dangerouslySetInnerHTML={{ __html: post.body_html || post.body || "" }} />
        <DetailFooterNav
          backHref="/dogadjaji"
          backLabel="Назад на све догађаје"
          nextHref={nextPost ? `/dogadjaji/detalj/?id=${nextPost.id}` : undefined}
          nextLabel={nextPost?.title}
        />
      </article>
    </>
  );
}
