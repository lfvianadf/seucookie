import { FlorPrensada } from "./FlorPrensada";
import { TracoManuscrito } from "./TracoManuscrito";
import { TornEdge } from "./TornEdge";

export function NossaHistoria() {
  return (
    <section className="relative bg-massa px-6 py-20 sm:px-10 sm:py-28">
      <TornEdge cor="var(--papel)" variante={0} />

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:col-start-1">
          <FlorPrensada className="h-16 w-16 rotate-[-8deg]" />
          <h2 className="mt-4 inline-block font-titulo text-3xl text-berinjela">
            nossa história
          </h2>
          <TracoManuscrito className="mt-1 h-3 w-40" />
        </div>
        <div className="ml-4 lg:col-span-7 lg:col-start-6 lg:ml-0">
          <p className="max-w-xl font-corpo text-lg leading-relaxed text-berinjela">
            tudo começou num caderno de capa dura, cheio de receitas anotadas
            à mão pela minha avó — letra apertada, medida em xícara, sempre
            uma nota na margem tipo &ldquo;coloca um pouco mais, não faz mal&rdquo;.
          </p>
          <p className="mt-5 max-w-xl font-corpo text-lg leading-relaxed text-berinjela">
            em 2026, aqui em Natal, resolvi tirar essas receitas da gaveta.
            comecei assando pra família, depois pra vizinho, depois virou
            pedido no WhatsApp. o caderno continua o mesmo — só ganhou mais
            gente pra quem cozinhar.
          </p>
          <p className="mt-5 max-w-xl font-manuscrita text-2xl text-ameixa rotate-[-1deg]">
            cada receita nova que chega, eu numero e assino.
          </p>
        </div>
      </div>
    </section>
  );
}
