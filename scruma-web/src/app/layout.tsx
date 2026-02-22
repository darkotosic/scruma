import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteFavicon from "@/components/SiteFavicon";
import ClientProviders from "@/context/ClientProviders";

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
      <body>
        <ClientProviders>
          <SiteFavicon />
          <Header />
          <main>{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
