'use client';

import Container from '@/components/Container';

export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="pageSection">
      <Container>{children}</Container>
    </section>
  );
}
