'use client';

import { useEffect, useState } from 'react';
import { toLatin } from '@/lib/translit';

const SCRIPT_EVENT = 'script-change';

const readScript = () => (typeof window !== 'undefined' ? (localStorage.getItem('script') ?? 'cyrl') : 'cyrl');

export const useScriptText = (text: string) => {
  const [script, setScript] = useState<'cyrl' | 'latn'>('cyrl');

  useEffect(() => {
    const apply = () => setScript(readScript() === 'latn' ? 'latn' : 'cyrl');
    apply();
    window.addEventListener(SCRIPT_EVENT, apply);
    return () => window.removeEventListener(SCRIPT_EVENT, apply);
  }, []);

  return script === 'latn' ? toLatin(text) : text;
};

export default function ScriptToggle() {
  const [script, setScript] = useState<'cyrl' | 'latn'>('cyrl');

  useEffect(() => {
    const current = readScript() === 'latn' ? 'latn' : 'cyrl';
    setScript(current);
    document.documentElement.setAttribute('data-script', current);
  }, []);

  const toggle = () => {
    const next = script === 'cyrl' ? 'latn' : 'cyrl';
    setScript(next);
    localStorage.setItem('script', next);
    document.documentElement.setAttribute('data-script', next);
    window.dispatchEvent(new Event(SCRIPT_EVENT));
  };

  return <button onClick={toggle}>{script === 'cyrl' ? 'Латиница' : 'Ћирилица'}</button>;
}
