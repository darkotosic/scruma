import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteFavicon from "@/components/SiteFavicon";
import ClientProviders from "@/context/ClientProviders";
import BackToTopButton from "@/components/BackToTopButton";

export const metadata: Metadata = {
  title: "СЦ Рума",
  description: "Званична интернет презентација Спортског центра Рума.",
  openGraph: {
    title: "СЦ Рума",
    description: "Званична интернет презентација Спортског центра Рума.",
    type: "website",
  },
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var saved = localStorage.getItem('theme'); // 'light' | 'dark' | null
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = (saved === 'light' || saved === 'dark') ? saved : (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    // fallback: остави default (light)
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr" data-theme="light">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ClientProviders>
          <a href="#glavni-sadrzaj" className="skip-link">
            Прескочи на садржај
          </a>
          <SiteFavicon />
          <Header />
          <main id="glavni-sadrzaj" className="page-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <BackToTopButton />
        </ClientProviders>
      </body>
    </html>
  );
}
