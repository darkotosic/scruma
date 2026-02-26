export function stripHtml(input: string): string {
  return (input || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function toPreviewText(input: string, maxLen = 180): string {
  const text = stripHtml(input);
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen).trimEnd()}…`;
}

export function mapPostToCard(post: any, href: string) {
  const content = post.excerpt || post.body || post.body_html || "";
  return {
    title: post.title,
    subtitle: toPreviewText(content),
    date: (post.published_at || post.created_at || "").slice(0, 10),
    image: post.image || undefined,
    href,
  };
}
