'use client';

import Container from '@/components/Container';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';
import CardGrid from '@/components/CardGrid';
import Accordion from '@/components/Accordion';
import GalleryGrid from '@/components/GalleryGrid';
import { HOME } from '@/lib/content';

export default function HomePage() {
  return (
    <>
      <Hero
        title={HOME.hero.title}
        subtitle={HOME.hero.subtitle}
        image={HOME.hero.image}
        ctas={HOME.hero.ctas}
      />

      <section className="pageSection">
        <Container>
          <SectionHeader
            title="Обавештења"
            subtitle="Најважније информације — приоритетна обавештења и измене режима рада."
          />
          <CardGrid items={HOME.obavestenja} />
        </Container>
      </section>

      <section className="pageSection">
        <Container>
          <SectionHeader title="Вести" subtitle="Најновија дешавања у Спортском центру." />
          <CardGrid items={HOME.vesti} />
        </Container>
      </section>

      <section className="pageSection">
        <Container>
          <SectionHeader title="Дешавања" subtitle="Предстојећи догађаји и активности." />
          <CardGrid items={HOME.desavanja} />
        </Container>
      </section>

      <section className="pageSection">
        <Container>
          <SectionHeader title="Спортске вести" subtitle="Спортски фид — касније преко API v1." />
          <CardGrid items={HOME.sportskeVesti} />
        </Container>
      </section>

      <section className="pageSection">
        <Container>
          <SectionHeader title="Слике" subtitle="Издвојене фотографије — ускоро више у Галерији." />
          <GalleryGrid images={HOME.slike} />
        </Container>
      </section>

      <section className="pageSection">
        <Container>
          <SectionHeader title="Како до нас?" subtitle="Брзе информације за посетиоце." />
          <Accordion items={HOME.kakoDoNas} />
        </Container>
      </section>
    </>
  );
}
