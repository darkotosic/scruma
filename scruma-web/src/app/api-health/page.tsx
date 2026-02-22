'use client';

import { useEffect, useState } from 'react';
import { useScript } from '@/context/ScriptContext';
import { fetchApiHealth, getApiBaseUrl } from '@/lib/api';

export default function ApiHealthPage() {
  const { t } = useScript();
  const [status, setStatus] = useState('Провера API везе је у току...');

  useEffect(() => {
    fetchApiHealth()
      .then((result) => setStatus(result.status === 'ok' ? 'API је доступан.' : 'API није доступан.'))
      .catch(() => setStatus('API није доступан.'));
  }, []);

  return (
    <section>
      <h1>{t('API дијагностика')}</h1>
      <p>{t('Базни URL:')} {getApiBaseUrl()}</p>
      <p>{t(status)}</p>
    </section>
  );
}
