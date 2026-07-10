import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CarimboReceita } from "@/components/CarimboReceita";
import { FotoReceita } from "@/components/FotoReceita";
import { SeloStatus } from "@/components/SeloStatus";
import { CAPITULOS_CARDAPIO, linkWhatsapp } from "@/lib/site";

const TITULO = "o cardápio";
const DESCRICAO =
  "Todas as receitas do caderno, capítulo por capítulo: os clássicos, os atrevidos e os da estação. Cookies artesanais feitos em Natal, de R$ 9 a R$ 14.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: {
    canonical: "/cardapio",
  },
  openGraph: {
    url: "/cardapio",
    title: `${TITULO} — seu cookie`,
    description: DESCRICAO,
  },
  twitter: {
    title: `${TITULO} — seu cookie`,
    description: DESCRICAO,
  },
};

export default function CardapioPage() {
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

          {CAPITULOS_CARDAPIO.map((capitulo, ci) => (
            <section key={capitulo.titulo} className="mt-16">
              <h2 className="font-titulo text-2xl text-berinjela">
                {capitulo.titulo}
              </h2>

              <ul className="mt-6 divide-y divide-berinjela/15 border-y border-berinjela/15 sm:divide-y-0 sm:border-none sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3">
                {capitulo.receitas.map((receita, i) => {
                  const rotacao = (i + ci) % 2 === 0 ? "sm:-rotate-1" : "sm:rotate-1";
                  return (
                    <li
                      key={receita.numero}
                      className="flex items-center gap-5 py-5 sm:flex-col sm:items-stretch sm:gap-0 sm:py-0"
                    >
                      <div className="relative shrink-0 sm:w-full">
                        <FotoReceita
                          className={`-rotate-2 sm:aspect-[4/3] sm:w-full ${rotacao}`}
                          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 4rem"
                        />
                        <div className="absolute bottom-0 -right-3 hidden sm:block sm:-bottom-6 sm:-right-4">
                          <CarimboReceita numero={receita.numero} className="bg-papel" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 sm:mt-5">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="font-titulo text-2xl font-medium text-berinjela sm:hidden">
                            nº {receita.numero}
                          </h3>
                          {receita.status && (
                            <SeloStatus
                              variante={
                                receita.status === "esse acabou hoje"
                                  ? "esgotado"
                                  : "disponivel"
                              }
                            >
                              {receita.status}
                            </SeloStatus>
                          )}
                        </div>
                        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          <span className="font-corpo text-xs font-bold uppercase tracking-wide text-ameixa sm:text-sm">
                            {receita.nome}
                          </span>
                          {receita.favorito && (
                            <span className="font-manuscrita text-lg text-ameixa rotate-[-2deg]">
                              o preferido da casa
                            </span>
                          )}
                        </div>
                        <p className="mt-1 font-corpo text-sm text-ameixa sm:mt-2 sm:text-base">
                          {receita.ingredientes}
                        </p>
                        <span className="mt-3 hidden font-corpo text-2xl font-bold text-rosa sm:block">
                          R$ {receita.preco}
                        </span>
                      </div>
                      <span className="font-corpo text-lg font-bold text-berinjela sm:hidden">
                        R$ {receita.preco}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}

          <a
            href={linkWhatsapp("Oi! Vi o cardápio e queria fazer um pedido")}
            className="mt-16 inline-block rounded-sm bg-rosa px-7 py-3 font-corpo font-bold text-papel shadow-[3px_3px_0_rgba(67,48,59,0.25)] transition-transform hover:-translate-y-0.5"
          >
            peça o seu
          </a>
        </div>
      </main>
      <Footer corAnterior="var(--papel)" />
    </>
  );
}
