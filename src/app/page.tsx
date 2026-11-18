import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TornEdge } from "@/components/TornEdge";
import { CarrosselEncomendas } from "@/components/CarrosselEncomendas";
import { CardapioSabores } from "@/components/CardapioSabores";
import { SeletorBox } from "@/components/SeletorBox";
import { buscarCardapio } from "@/lib/produtos";
import { agruparPorCapitulo, linkWhatsapp } from "@/lib/site";

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
  const capitulos = agruparPorCapitulo(sabores);

  return (
    <>
      <Header />
      <main className="loja">
        <section className="abertura">
          <div className="estampa-abertura" aria-hidden="true" />
          <div className="miolo">
            <div className="abertura-texto">
              <p className="rubrica">Feito à mão em Natal, RN</p>
              <h1>Qual é o seu<br />cookie de hoje?</h1>
              <p>Conheça as receitas da casa, escolha seu recheio favorito e peça pelo WhatsApp.</p>
              <a className="botao-principal" href="#cardapio">Ver cardápio <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>

        <section className="relative bg-papel secao" id="cardapio">
          <TornEdge cor="var(--berinjela)" />
          <div className="miolo">
            <div className="titulo-secao"><h2>O cardápio</h2><span aria-hidden="true" /></div>
            {capitulos.map((capitulo) => (
              <section className="capitulo" key={capitulo.titulo} aria-label={capitulo.titulo}>
                <h3 className="rubrica">{capitulo.titulo}</h3>
                <CardapioSabores sabores={capitulo.receitas} />
              </section>
            ))}
          </div>
        </section>

        <section id="combos" className="relative secao combos">
          <TornEdge cor="var(--papel)" />
          <div className="miolo">
            <p className="rubrica">Combos{caixa.numero !== "—" && ` · nº ${caixa.numero}`}</p>
            <h2 className="titulo-grande">Monte sua caixa</h2>
            <h3 className="mt-3 font-bold">{caixa.nome}</h3>
            <p className="mb-7">{caixa.ingredientes}{caixa.peso && ` · ${caixa.peso}`}</p>
            <SeletorBox caixa={caixa} sabores={saboresDaCaixa} />
          </div>
        </section>

        <section id="encomendas" className="relative encomendas" aria-labelledby="titulo-encomendas">
          <TornEdge cor="var(--massa)" />
          <div className="miolo encomendas-grade">
            <div className="encomendas-apresentacao">
              <div>
                <h2 id="titulo-encomendas" className="titulo-grande">Encomendas de cookies</h2>
                <p>Aceitamos encomendas para aniversários, empresas, presentes e confraternizações. Fale com a gente para combinar a data, a quantidade, os sabores e a embalagem.</p>
              </div>
              <a className="link-claro" href={linkWhatsapp("Oi! Gostaria de um orçamento para uma encomenda de cookies.")}>
                Pedir orçamento no WhatsApp <span aria-hidden="true">↗</span>
              </a>
            </div>
            <CarrosselEncomendas />
          </div>
        </section>
        <section className="relative bg-papel secao perguntas">
          <TornEdge cor="var(--berinjela)" />
          <div className="miolo">
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
          </div>
        </section>
      </main>
      <Footer corAnterior="var(--papel)" />
    </>
  );
}
