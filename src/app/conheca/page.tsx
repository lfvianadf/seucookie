import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { NossaHistoria } from "@/components/NossaHistoria";
import { ReceitasDestaque } from "@/components/ReceitasDestaque";
import { ComoLevar } from "@/components/ComoLevar";
import { Footer } from "@/components/Footer";
import { buscarCardapio } from "@/lib/produtos";

export const revalidate = 60;

const TITULO = "conheça o seu cookie";
const DESCRICAO =
  "Um caderno de receitas de família que virou loja. A história por trás do seu cookie, em Natal (RN).";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: {
    canonical: "/conheca",
  },
  openGraph: {
    url: "/conheca",
    title: `${TITULO} — seu cookie`,
    description: DESCRICAO,
  },
  twitter: {
    title: `${TITULO} — seu cookie`,
    description: DESCRICAO,
  },
};

export default async function ConhecaPage() {
  const { sabores, caixa } = await buscarCardapio();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <NossaHistoria />
        <ReceitasDestaque receitas={[...sabores, caixa]} />
        <ComoLevar />
      </main>
      <Footer />
    </>
  );
}
