'use client';

import { useScriptText } from '@/components/ScriptToggle';

export default function GalleryGrid({ images }: { images: string[] }) {
  return (
    <div className="galleryGrid">
      {images.map((src) => (
        <div key={src} className="galleryItem">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={useScriptText('Фотографија')} loading="lazy" />
        </div>
      ))}
    </div>
  );
}
