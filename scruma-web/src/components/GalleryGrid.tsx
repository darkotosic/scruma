'use client';

import { useScript } from '@/context/ScriptContext';

export default function GalleryGrid({ images }: { images: string[] }) {
  const { t } = useScript();
  return (
    <div className="galleryGrid">
      {images.map((src) => (
        <div key={src} className="galleryItem">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={t('Фотографија')} loading="lazy" />
        </div>
      ))}
    </div>
  );
}
