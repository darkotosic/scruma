'use client';

import { useScriptText } from './ScriptToggle';

export default function Footer() {
  const text = useScriptText('© СК Рума — Званична интернет презентација');
  return <footer>{text}</footer>;
}
