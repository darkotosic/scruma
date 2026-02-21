export type LinkItem = { title: string; href: string };
export type CardItem = {
  title: string;
  subtitle?: string;
  date?: string;
  href?: string;
  image?: string;
  tag?: string;
};

export const SITE = {
  name: 'СЦ Рума',
  city: 'Рума',
  email: 'info@scruma.rs',
  phone: '+381 22 478298',
  address: 'Спортски центар Рума, Рума, Србија',
  mapsUrl: 'https://maps.app.goo.gl/GmM3QdBjekX1d3b27'
};

export const NAV_LINKS: LinkItem[] = [
  { title: 'Почетна', href: '/' },
  { title: 'Сале', href: '/sale' },
  { title: 'Велика сала', href: '/velika-sala' },
  { title: 'Куглана', href: '/kuglana' },
  { title: 'Теретана', href: '/teretana' },
  { title: 'Базен Борковац', href: '/bazen-borkovac' },
  { title: 'Галерија', href: '/galerija' },
  { title: 'О нама', href: '/o-nama' },
  { title: 'Контакт', href: '/kontakt' }
];

export const HOME = {
  hero: {
    title: 'Спортски центар Рума',
    subtitle:
      'Званична интернет презентација — најаве, вести, дешавања и информације за посетиоце.',
    image: '/images/hero.jpg',
    ctas: [
      { title: 'Погледај дешавања', href: '/dogadjaji' },
      { title: 'Вести и обавештења', href: '/vesti' }
    ] as LinkItem[]
  },

  obavestenja: [
    {
      title: 'Радно време током празника',
      subtitle: 'Измене термина за сале и теретану. Пратите ажурирања.',
      date: '2026-02-21',
      tag: 'Важно',
      href: '/vesti'
    },
    {
      title: 'Нови термини за рекреацију',
      subtitle: 'Објављен распоред за рекреативне групе.',
      date: '2026-02-18',
      tag: 'Објава',
      href: '/vesti'
    }
  ] as CardItem[],

  vesti: [
    {
      title: 'Почеле припреме за пролећни део сезоне',
      subtitle: 'Тренинзи и пробе у великој сали — распоред доступан.',
      date: '2026-02-20',
      image: '/images/placeholders/news-1.jpg',
      href: '/vesti'
    },
    {
      title: 'Отворени дан за млађе категорије',
      subtitle: 'Позив деци и родитељима да обиђу капацитете центра.',
      date: '2026-02-16',
      image: '/images/placeholders/news-2.jpg',
      href: '/vesti'
    },
    {
      title: 'Терен и инфраструктура — текућа унапређења',
      subtitle: 'Континуирано улагање у безбедност и квалитет услуга.',
      date: '2026-02-10',
      image: '/images/placeholders/news-3.jpg',
      href: '/vesti'
    }
  ] as CardItem[],

  desavanja: [
    {
      title: 'Припремна утакмица',
      subtitle: 'Недеља • 17:00 • Велика сала',
      tag: 'Догађај',
      href: '/dogadjaji'
    },
    {
      title: 'Хуманитарни турнир',
      subtitle: 'Среда • 19:30 • Велика сала',
      tag: 'Догађај',
      href: '/dogadjaji'
    },
    {
      title: 'Отворени тренинг за децу',
      subtitle: 'Петак • 18:00 • Сале',
      tag: 'Догађај',
      href: '/dogadjaji'
    }
  ] as CardItem[],

  sportskeVesti: [
    {
      title: 'Локални спорт — резултати и најаве',
      subtitle: 'Овде иде спортски фид (касније преко API v1).',
      tag: 'Спорт',
      href: '/vesti'
    },
    {
      title: 'Млађе категорије — распореди',
      subtitle: 'Распореди тренинга и такмичења (API v1).',
      tag: 'Спорт',
      href: '/vesti'
    }
  ] as CardItem[],

  slike: [
    '/images/placeholders/gallery-1.jpg',
    '/images/placeholders/gallery-2.jpg',
    '/images/placeholders/gallery-3.jpg',
    '/images/placeholders/gallery-4.jpg',
    '/images/placeholders/gallery-5.jpg',
    '/images/placeholders/gallery-6.jpg'
  ],

  kakoDoNas: [
    {
      title: 'Адреса',
      content:
        'Спортски центар Рума — главни улаз. Паркинг је доступан у близини објекта.'
    },
    {
      title: 'Аутомобилом',
      content:
        'Пратите путоказе ка Спортском центру. Препоручен долазак 20 минута раније током догађаја.'
    },
    {
      title: 'Аутобусом',
      content:
        'Локалне линије стају у близини центра. Тачне линије ће бити наведене ускоро.'
    }
  ] as { title: string; content: string }[]
};

export const OBJEKTI = {
  velikaSala: {
    title: 'Велика сала (спортска хала)',
    subtitle: 'Главни терен и трибине — за утакмице, турнире и манифестације.',
    image: '/images/placeholders/velika-sala.jpg'
  },

  sale: [
    {
      title: 'Џудо сала',
      subtitle: 'Борилачки спортови и тренинг групе.',
      href: '/sale/dzudo-sala',
      image: '/images/placeholders/sala-1.jpg'
    },
    {
      title: 'Плава сала',
      subtitle: 'Kick box и rehab програми.',
      href: '/sale/plava-sala',
      image: '/images/placeholders/sala-2.jpg'
    },
    {
      title: 'Црвена сала',
      subtitle: 'Karate и fitness.',
      href: '/sale/crvena-sala',
      image: '/images/placeholders/sala-3.jpg'
    },
    {
      title: 'Мала сала',
      subtitle: 'Savate box, теквондо и ритмичка гимнастика.',
      href: '/sale/mala-sala',
      image: '/images/placeholders/sala-4.jpg'
    }
  ] as CardItem[],

  kuglana: {
    title: 'Куглана',
    subtitle: 'Рекреација и турнири — резервације ускоро преко API.',
    image: '/images/placeholders/kuglana.jpg'
  },

  teretana: {
    title: 'Теретана',
    subtitle: 'Савремена опрема — индивидуални и групни тренинзи.',
    image: '/images/placeholders/teretana.jpg'
  },

  bazen: {
    title: 'Базен Борковац',
    subtitle: 'Сезонске информације и термини биће доступни на сајту.',
    image: '/images/placeholders/bazen.jpg'
  }
};
