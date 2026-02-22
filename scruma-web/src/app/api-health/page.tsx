'use client';

import { useEffect, useState } from 'react';
import { useScriptText } from '@/components/ScriptToggle';
import { fetchApiHealth, getApiBaseUrl } from '@/lib/api';

export default function ApiHealthPage() {
  const [status, setStatus] = useState('Провера API везе је у току...');

  useEffect(() => {
    fetchApiHealth()
      .then((result) => setStatus(result.status === 'ok' ? 'API је доступан.' : 'API није доступан.'))
      .catch(() => setStatus('API није доступан.'));
  }, []);

  return (
    <section>
      <h1>{useScriptText('API дијагностика')}</h1>
      <p>{useScriptText('Базни URL:')} {getApiBaseUrl()}</p>
      <p>{useScriptText(status)}</p>
    </section>
  );
}
