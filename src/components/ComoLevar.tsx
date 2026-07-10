import { linkWhatsapp } from "@/lib/site";
import { TornEdge } from "./TornEdge";

const OPCOES = [
  {
    numero: "01",
    titulo: "retirada",
    texto: "combinamos o horário e você pega direto aqui em Natal, quentinho.",
  },
  {
    numero: "02",
    titulo: "entrega",
    texto: "levamos até você dentro da região. o combinado é sempre por WhatsApp.",
  },
  {
    numero: "03",
    titulo: "encomenda",
    texto: "festa, presente, caixa fechada — me conta o que precisa e a gente combina.",
  },
];

export function ComoLevar() {
  return (
    <section className="relative bg-massa px-6 py-20 sm:px-10 sm:py-28">
      <TornEdge cor="var(--papel)" variante={2} />

      <div className="mx-auto max-w-3xl">
        <h2 className="font-titulo text-3xl text-berinjela">
          como levar pra casa
        </h2>

        <ol className="mt-10 space-y-7">
          {OPCOES.map((opcao, i) => (
            <li
              key={opcao.numero}
              className={`flex gap-4 ${i === 1 ? "ml-4 sm:ml-8" : ""} ${
                i === 2 ? "ml-2 sm:ml-4" : ""
              }`}
            >
              <span className="font-manuscrita text-3xl text-berinjela sm:text-rosa">
                {opcao.numero}
              </span>
              <div>
                <h3 className="font-titulo text-xl text-berinjela">
                  {opcao.titulo}
                </h3>
                <p className="mt-1 max-w-md font-corpo text-ameixa">
                  {opcao.texto}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <a
          href={linkWhatsapp("Oi! Queria combinar a retirada ou entrega do meu pedido")}
          className="mt-10 inline-block rounded-sm bg-rosa px-7 py-3 font-corpo font-bold text-papel shadow-[3px_3px_0_rgba(67,48,59,0.25)] transition-transform hover:-translate-y-0.5"
        >
          combinar pelo whatsapp
        </a>
      </div>
    </section>
  );
}
