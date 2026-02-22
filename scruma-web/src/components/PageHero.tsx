'use client';

import Hero from '@/components/Hero';

export default function PageHero({ title, subtitle, image }: { title: string; subtitle: string; image?: string }) {
  return <Hero title={title} subtitle={subtitle} image={image || '/images/placeholders/events-hero.jpg'} ctas={[]} />;
}
