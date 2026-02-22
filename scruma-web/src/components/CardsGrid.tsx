'use client';

import CardGrid from '@/components/CardGrid';

type CardsGridItem = {
  title: string;
  excerpt?: string;
  href?: string;
  image?: string;
  meta?: string;
};

export default function CardsGrid({ items }: { items: CardsGridItem[] }) {
  return (
    <CardGrid
      items={items.map((item) => ({
        title: item.title,
        subtitle: item.excerpt,
        href: item.href,
        image: item.image,
        date: item.meta
      }))}
    />
  );
}
