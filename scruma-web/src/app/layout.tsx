import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteFavicon from "@/components/SiteFavicon";
import ClientProviders from "@/context/ClientProviders";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "СЦ Рума",
  description: "Званична интернет презентација Спортског центра Рума.",
  openGraph: {
    title: "СЦ Рума",
    description: "Званична интернет презентација Спортског центра Рума.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body>
        <ClientProviders>
          <SiteFavicon />
          <Header />
          <Breadcrumbs />
          <main>{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
