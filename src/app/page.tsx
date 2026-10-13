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

const TITULO = "Cookies artesanais em Natal (RN)";
const DESCRICAO =
  "Seu Cookie: cookies artesanais e recheados em Natal (RN). Confira o cardápio, monte sua caixa e peça pelo WhatsApp. Entrega e retirada a combinar.";

export const metadata: Metadata = {
  title: { absolute: `${TITULO} — seu cookie` },
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
            cookies artesanais em Natal
          </h1>
          <p className="mt-4 max-w-2xl font-corpo text-ameixa">
            Esse é o cardápio do seu cookie: cookies recheados, feitos à mão em
            Natal, RN. Escolha seus sabores, monte sua caixa e finalize o pedido
            pelo WhatsApp.
          </p>

          {capitulos.map((capitulo) => (
            <section key={capitulo.titulo} className="mt-16">
              <h2 className="font-titulo text-2xl text-berinjela">
                {capitulo.titulo}
              </h2>
              <CardapioSabores sabores={capitulo.receitas} />
            </section>
          ))}

          <section className="mt-16 border-t border-berinjela/15 pt-16">
            <h2 className="font-titulo text-2xl text-berinjela">combos</h2>

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
                    <SeloStatus variante="esgotado">esse acabou :(</SeloStatus>
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

          <section className="mt-16 border-t border-berinjela/15 pt-10">
            <h2 className="font-titulo text-2xl text-berinjela">
              como pedir seu cookie em Natal
            </h2>
            <dl className="mt-6 space-y-6 font-corpo">
              <div>
                <dt className="font-bold">Como comprar?</dt>
                <dd className="mt-1 text-ameixa">
                  Adicione os cookies ou a caixa ao carrinho e envie o pedido
                  pelo WhatsApp. O pagamento é combinado na conversa.
                </dd>
              </div>
              <div>
                <dt className="font-bold">Tem entrega e retirada em Natal?</dt>
                <dd className="mt-1 text-ameixa">
                  Sim. Combine pelo WhatsApp a retirada em Natal ou a entrega
                  na região, confirmando seu endereço, taxa e horário.
                </dd>
              </div>
              <div>
                <dt className="font-bold">Posso encomendar para festas e presentes?</dt>
                <dd className="mt-1 text-ameixa">
                  Sim. Fale com a gente pelo WhatsApp para combinar quantidades,
                  sabores e a data da sua encomenda.
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </main>
      <Footer corAnterior="var(--papel)" />
    </>
  );
}
