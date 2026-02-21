import '../styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'СК Рума',
  description: 'Званична интернет презентација Спортског центра Рума.',
  openGraph: {
    title: 'СК Рума',
    description: 'Званична интернет презентација Спортског центра Рума.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body className="light">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
