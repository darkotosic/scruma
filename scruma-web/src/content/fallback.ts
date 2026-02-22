export type FallbackSite = {
  settings: {
    site_name: string;
    logo?: string;
    favicon?: string;
    hero_title: string;
    hero_subtitle: string;
    hero_image?: string;
    maps_embed_url?: string;
    footer_text?: string;
    footer_logo?: string;
    footer_bottom_text?: string;
    footer_columns?: { title: string; links: { label: string; url: string }[] }[];
  };
};

export type FallbackNav = { items: { href: string; label: string }[] };

export type FallbackPage = {
  slug: string;
  title: string;
  subtitle: string;
  body: string; // HTML string (опасно setInnerHTML је већ у CmsPage)
  hero_image?: string;
  seo_title?: string;
  seo_description?: string;
};

export type FallbackPost = {
  id: string;
  type: "news" | "notice" | "sport";
  title: string;
  excerpt?: string;
  body?: string;
  image?: string;
  published_at?: string;
  link_url?: string;
};

export type FallbackAnnouncement = {
  id: string;
  title: string;
  body: string;
  created_at?: string;
};

export const FALLBACK_SITE: FallbackSite = {
  settings: {
    site_name: "СЦ Рума",
    hero_title: "Спортски центар Рума",
    hero_subtitle:
      "Званична интернет презентација. Сајт ради и без CMS-а; када је CMS доступан, садржај се аутоматски ажурира.",
    hero_image: "",

    footer_bottom_text: "© 2026 СЦ Рума — Званична интернет презентација",
    footer_columns: [
      {
        title: "СЦ Рума",
        links: [
          { label: "О нама", url: "/o-nama" },
          { label: "Контакт", url: "/kontakt" },
        ],
      },
      {
        title: "Информације",
        links: [
          { label: "Вести", url: "/vesti" },
          { label: "Догађаји", url: "/dogadjaji" },
        ],
      },
      {
        title: "Локације",
        links: [
          { label: "Велика сала", url: "/velika-sala" },
          { label: "Сале", url: "/sale" },
        ],
      },
    ],
  },
};

export const FALLBACK_NAV: FallbackNav = {
  items: [
    { href: "/", label: "Почетна" },
    { href: "/o-nama", label: "О нама" },
    { href: "/dogadjaji", label: "Догађаји" },
    { href: "/vesti", label: "Вести" },
    { href: "/galerija", label: "Галерија" },
    { href: "/kontakt", label: "Контакт" },
  ],
};

export const FALLBACK_PAGES: Record<string, FallbackPage> = {
  "o-nama": {
    slug: "o-nama",
    title: "О нама",
    subtitle: "Основне информације о Спортском центру Рума.",
    body:
      "<p><strong>Спортски центар Рума</strong> је централно место спортских и рекреативних активности.</p>" +
      "<p>Овај текст је локални fallback. Када је CMS доступан, биће замењен званичним садржајем из Django Admin-а.</p>",
    seo_title: "О нама — СЦ Рума",
    seo_description: "Информације о Спортском центру Рума.",
  },
  kontakt: {
    slug: "kontakt",
    title: "Контакт",
    subtitle: "Контакт подаци и информације за посетиоце.",
    body:
      "<p>Ово је локални fallback контакт секција.</p>" +
      "<ul><li>Е-пошта: <a href='mailto:info@scruma.rs'>info@scruma.rs</a></li><li>Телефон: +381 …</li></ul>" +
      "<p>Када је CMS доступан, овде ће бити званични контакт подаци.</p>",
    seo_title: "Контакт — СЦ Рума",
    seo_description: "Контакт информације за СЦ Рума.",
  },
  dogadjaji: {
    slug: "dogadjaji",
    title: "Догађаји",
    subtitle: "Најаве и календар дешавања.",
    body:
      "<p>Ово је локални fallback садржај за страницу Догађаји.</p>" +
      "<p>Када администратор унесе догађаје у CMS, овај садржај ће бити замењен.</p>",
    seo_title: "Догађаји — СЦ Рума",
    seo_description: "Најаве и дешавања у СЦ Рума.",
  },
};

export const FALLBACK_ANNOUNCEMENTS: FallbackAnnouncement[] = [
  {
    id: "fb-a-1",
    title: "Обавештење (fallback)",
    body: "Ово је локални fallback пример обавештења. Када је API доступан, биће замењено правим обавештењима.",
    created_at: "2026-02-01T10:00:00Z",
  },
];

export const FALLBACK_POSTS: FallbackPost[] = [
  {
    id: "fb-n-1",
    type: "news",
    title: "Вест (fallback)",
    excerpt: "Ово је локални fallback пример вести.",
    published_at: "2026-02-01T10:00:00Z",
    link_url: "/vesti",
  },
  {
    id: "fb-s-1",
    type: "sport",
    title: "Спортска вест (fallback)",
    excerpt: "Локални fallback пример спортске вести.",
    published_at: "2026-02-01T10:00:00Z",
    link_url: "/vesti",
  },
];
