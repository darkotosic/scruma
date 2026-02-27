'use client';

import Hero from '@/components/Hero';

type HeroFit = 'cover' | 'contain';

export default function PageHero({
  title,
  subtitle,
  image,
  fit = 'cover'
}: {
  title: string;
  subtitle: string;
  image?: string;
  fit?: HeroFit;
}) {
  return (
    <Hero
      title={title}
      subtitle={subtitle}
      image={image || '/images/placeholders/events-hero.jpg'}
      ctas={[]}
      fit={fit}
    />
  );
}
