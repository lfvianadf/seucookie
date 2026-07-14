import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CarimboReceita } from "@/components/CarimboReceita";
import { FotoReceita } from "@/components/FotoReceita";
import { CardapioSabores } from "@/components/CardapioSabores";
import { SeletorBox } from "@/components/SeletorBox";
import { SeloStatus } from "@/components/SeloStatus";
import { buscarCardapio } from "@/lib/produtos";
import { agruparPorCapitulo } from "@/lib/site";

export const revalidate = 60;

const TITULO = "o cardápio";
const DESCRICAO =
  "Três sabores e uma caixa pra montar do seu jeito. Cookies artesanais feitos em Natal, de R$ 11,90 a R$ 32,90.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: `${TITULO} — seu cookie`,
    description: DESCRICAO,
  },
  twitter: {
    title: `${TITULO} — seu cookie`,
    description: DESCRICAO,
  },
};

export default async function CardapioPage() {
  const { sabores, caixa, saboresDaCaixa } = await buscarCardapio();
  const boxDisponivel = !caixa.status;
  const capitulos = agruparPorCapitulo(sabores);

  return (
    <>
      <Header />
      <main className="px-6 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-manuscrita text-2xl text-ameixa rotate-[-2deg]">
            o caderno inteiro, aberto
          </p>
          <h1 className="mt-2 font-titulo text-4xl text-berinjela sm:text-5xl">
            o cardápio
          </h1>

          {capitulos.map((capitulo) => (
            <section key={capitulo.titulo} className="mt-16">
              <h2 className="font-titulo text-2xl text-berinjela">
                {capitulo.titulo}
              </h2>
              <CardapioSabores sabores={capitulo.receitas} />
            </section>
          ))}

          <section className="mt-16 border-t border-berinjela/15 pt-16">
            <h2 className="font-titulo text-2xl text-berinjela">a caixa</h2>

            <div
              className={`mt-6 grid grid-cols-1 gap-8 sm:grid-cols-12 ${
                boxDisponivel ? "" : "opacity-60"
              }`}
            >
              <div className="relative sm:col-span-5">
                <FotoReceita
                  src={caixa.foto}
                  className={`aspect-[4/3] w-full -rotate-1 ${
                    boxDisponivel ? "" : "grayscale"
                  }`}
                  sizes="(min-width: 1024px) 24rem, 90vw"
                />
                <div className="absolute -bottom-6 -right-4">
                  <CarimboReceita numero={caixa.numero} className="bg-papel" />
                </div>
              </div>

              <div className="sm:col-span-7">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-titulo text-2xl text-berinjela">
                    {caixa.nome}
                  </h3>
                  {!boxDisponivel && (
                    <SeloStatus variante="esgotado">esse acabou hoje</SeloStatus>
                  )}
                </div>
                {caixa.ingredientes && (
                  <p className="mt-1 font-corpo text-sm text-ameixa">
                    {caixa.ingredientes}
                    {caixa.peso ? ` · ${caixa.peso}` : ""}
                  </p>
                )}

                <div className="mt-6">
                  <SeletorBox caixa={caixa} sabores={saboresDaCaixa} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer corAnterior="var(--papel)" />
    </>
  );
}
