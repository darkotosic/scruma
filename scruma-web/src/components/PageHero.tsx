'use client';

import Hero from '@/components/Hero';

export default function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Hero
      title={title}
      subtitle={subtitle}
      image="/images/placeholders/events-hero.jpg"
      ctas={[]}
    />
  );
}
