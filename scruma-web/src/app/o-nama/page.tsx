'use client';

import { useScriptText } from '@/components/ScriptToggle';

export default function AboutPage() {
  return (
    <section>
      <h1>{useScriptText('О нама')}</h1>
      <p>{useScriptText('СК Рума је клуб посвећен спорту, заједници и развоју младих талената.')}</p>
    </section>
  );
}
