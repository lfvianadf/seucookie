import type { Metadata } from "next";
import localFont from "next/font/local";
import { Nunito_Sans, Caveat } from "next/font/google";
import { CONTATO, SITE_URL } from "@/lib/site";
import { BotaoFlutuante } from "@/components/BotaoFlutuante";
import "./globals.css";

const epoche = localFont({
  src: "../../public/epoche.otf",
  variable: "--font-epoche",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const TITULO_PADRAO = "seu cookie — cookies caseiros feitos à mão em Natal";
const DESCRICAO =
  "Um caderno de receitas de família que virou loja. Cookies artesanais, feitos hoje de manhã, em Natal (RN). Peça pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITULO_PADRAO,
    template: "%s — seu cookie",
  },
  description: DESCRICAO,
  keywords: [
    "cookie em Natal",
    "cookies artesanais",
    "cookie caseiro",
    "encomenda de cookies Natal RN",
    "seu cookie",
  ],
  authors: [{ name: "seu cookie" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "seu cookie",
    title: TITULO_PADRAO,
    description: DESCRICAO,
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO_PADRAO,
    description: DESCRICAO,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "seu cookie",
  description: DESCRICAO,
  url: SITE_URL,
  image: `${SITE_URL}/cookie-hero.jpg`,
  telephone: `+${CONTATO.whatsapp}`,
  priceRange: "R$ 9 - R$ 14",
  address: {
    "@type": "PostalAddress",
    addressLocality: CONTATO.cidade,
    addressRegion: "RN",
    addressCountry: "BR",
  },
  sameAs: [`https://instagram.com/${CONTATO.instagram}`],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${epoche.variable} ${nunitoSans.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-papel text-berinjela">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <BotaoFlutuante />
      </body>
    </html>
  );
}
