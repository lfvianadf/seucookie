import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Image from "next/image";
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

        <div className="miolo secao" id="cardapio">
          <div className="titulo-secao"><h2>O cardápio</h2><span aria-hidden="true" /></div>
          {capitulos.map((capitulo) => (
            <section className="capitulo" key={capitulo.titulo} aria-label={capitulo.titulo}>
              <h3 className="rubrica">{capitulo.titulo}</h3>
              <CardapioSabores sabores={capitulo.receitas} />
            </section>
          ))}
        </div>

        <section id="combos" className="secao combos">
          <div className="miolo">
            <p className="rubrica">Combos{caixa.numero !== "—" && ` · nº ${caixa.numero}`}</p>
            <h2 className="titulo-grande">Monte sua caixa</h2>
            <h3 className="mt-3 font-bold">{caixa.nome}</h3>
            <p className="mb-7">{caixa.ingredientes}{caixa.peso && ` · ${caixa.peso}`}</p>
            <SeletorBox caixa={caixa} sabores={saboresDaCaixa} />
          </div>
        </section>

        <section className="presente">
          <div className="miolo presente-grade">
            <Image src="/marca/caixa-rosa.webp" alt="Arte oficial da caixa rosa, com alça e espaço para uma dedicatória" width={1250} height={938} sizes="(min-width: 701px) 45vw, 95vw" />
            <div>
              <p className="rubrica">Para presentear</p>
              <h2 className="titulo-grande">Cabe um carinho aqui.</h2>
              <p>Uma caixa estampada, um recado na frente e os sabores escolhidos por você. Para presentes e encomendas, combine os detalhes com a gente.</p>
              <a className="link-claro" href={linkWhatsapp("Oi! Quero combinar uma encomenda para presente.")}>Conversar sobre encomendas ↗</a>
            </div>
          </div>
        </section>
        <div className="miolo">
          <section className="secao perguntas">
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
