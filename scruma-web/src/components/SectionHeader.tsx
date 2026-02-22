'use client';

import { useScript } from '@/context/ScriptContext';

export default function SectionHeader({
  title,
  subtitle
}: {
  title: string;
  subtitle?: string;
}) {
  const { t } = useScript();
  return (
    <div className="sectionHeader">
      <h2 className="sectionTitle">{t(title)}</h2>
      {subtitle ? <p className="sectionSubtitle">{t(subtitle)}</p> : null}
    </div>
  );
}
