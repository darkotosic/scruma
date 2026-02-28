"use client";

import { SkeletonBlock } from "@/components/ui/SkeletonBlock";

export default function CardGridSkeleton({ count = 6 }: { count?: number }) {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="grid" aria-label="Учитавање садржаја">
      {items.map((i) => (
        <div key={i} className="card">
          <div className="cardMedia">
            <SkeletonBlock style={{ height: 170, width: "100%", borderRadius: 0 }} />
          </div>

          <div className="cardBody">
            <div className="cardTop">
              <SkeletonBlock style={{ height: 18, width: 96 }} />
              <SkeletonBlock style={{ height: 14, width: 72 }} />
            </div>

            <div style={{ height: 10 }} />

            <SkeletonBlock style={{ height: 22, width: "80%" }} />
            <div style={{ height: 10 }} />
            <SkeletonBlock style={{ height: 14, width: "100%" }} />
            <div style={{ height: 8 }} />
            <SkeletonBlock style={{ height: 14, width: "88%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
