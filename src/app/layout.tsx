import type { Metadata } from "next";
import localFont from "next/font/local";
import { Nunito_Sans, Caveat } from "next/font/google";
import { CONTATO, SITE_URL } from "@/lib/site";
import { CarrinhoPainel } from "@/components/CarrinhoPainel";
import { CarrinhoProvider } from "@/context/CarrinhoContext";
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
  "Seu Cookie: cookies artesanais e recheados, feitos à mão em Natal (RN). Confira o cardápio e peça pelo WhatsApp. Entrega e retirada a combinar.";

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
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  "@id": `${SITE_URL}/#seu-cookie`,
  name: "seu cookie",
  alternateName: "Seu Cookie Natal",
  description: DESCRICAO,
  url: SITE_URL,
  image: `${SITE_URL}/marca/caixa-vinho.webp`,
  telephone: `+${CONTATO.whatsapp}`,
  hasMenu: `${SITE_URL}/`,
  areaServed: {
    "@type": "City",
    name: "Natal",
    containedInPlace: { "@type": "State", name: "Rio Grande do Norte" },
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              name: "seu cookie",
              alternateName: "Seu Cookie Natal",
              url: SITE_URL,
              inLanguage: "pt-BR",
              publisher: { "@id": `${SITE_URL}/#seu-cookie` },
            }),
          }}
        />
        <CarrinhoProvider>
          {children}
          <CarrinhoPainel />
        </CarrinhoProvider>
      </body>
    </html>
  );
}
