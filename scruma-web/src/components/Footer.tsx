'use client';

import Container from './Container';
import { useScriptText } from './ScriptToggle';
import { SITE } from '@/lib/content';

export default function Footer() {
  return (
    <footer>
      <Container>
        <div className="footerInner">
          <div>
            © {new Date().getFullYear()} {useScriptText('СК Рума')} —{' '}
            {useScriptText('Званична интернет презентација')}
          </div>
          <div>
            {useScriptText('Контакт')}: {SITE.email} • {SITE.phone}
          </div>
        </div>
      </Container>
    </footer>
  );
}
