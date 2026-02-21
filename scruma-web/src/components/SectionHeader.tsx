'use client';

import { useScriptText } from '@/components/ScriptToggle';

export default function SectionHeader({
  title,
  subtitle
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="sectionHeader">
      <h2 className="sectionTitle">{useScriptText(title)}</h2>
      {subtitle ? <p className="sectionSubtitle">{useScriptText(subtitle)}</p> : null}
    </div>
  );
}
