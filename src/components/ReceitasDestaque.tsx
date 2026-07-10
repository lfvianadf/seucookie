import Link from "next/link";
import { CarimboReceita } from "./CarimboReceita";
import { FotoReceita } from "./FotoReceita";
import { SeloStatus } from "./SeloStatus";
import { TracoManuscrito } from "./TracoManuscrito";
import { TornEdge } from "./TornEdge";
import { RECEITAS_DESTAQUE } from "@/lib/site";

export function ReceitasDestaque() {
  return (
    <section className="relative px-6 py-20 sm:px-10 sm:py-28">
      <TornEdge cor="var(--massa)" variante={1} />

      <div className="mx-auto max-w-4xl">
        <h2 className="ml-4 inline-block font-titulo text-3xl text-berinjela sm:ml-10">
          as receitas
        </h2>
        <TracoManuscrito className="ml-4 mt-1 h-3 w-32 sm:ml-10" />
        <p className="ml-4 mt-3 font-corpo text-ameixa sm:ml-10">
          um aperitivo do caderno — vira a página, o resto está{" "}
          <Link
            href="/cardapio"
            className="font-bold text-berinjela underline decoration-rosa decoration-2 underline-offset-4"
          >
            aqui
          </Link>
          .
        </p>

        <ul className="mt-10 divide-y divide-berinjela/15 border-y border-berinjela/15">
          {RECEITAS_DESTAQUE.map((receita, i) => (
            <li
              key={receita.numero}
              className={`flex items-center gap-5 py-5 ${
                i % 2 === 0 ? "sm:pl-0" : "pl-6 sm:pl-10"
              }`}
            >
              <div className="relative shrink-0">
                <FotoReceita className="-rotate-2" />
                <div className="absolute bottom-0 -right-3 hidden sm:block sm:-bottom-5 sm:-right-5">
                  <CarimboReceita numero={receita.numero} className="bg-papel" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-titulo text-2xl text-berinjela sm:hidden">
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
                  <span className="font-corpo text-xs font-bold uppercase tracking-wide text-ameixa">
                    {receita.nome}
                  </span>
                  {receita.favorito && (
                    <span className="font-manuscrita text-lg text-ameixa rotate-[-2deg]">
                      o preferido da casa
                    </span>
                  )}
                </div>
                <p className="mt-1 font-corpo text-sm text-ameixa">
                  {receita.ingredientes}
                </p>
              </div>
              <span className="font-corpo text-lg font-bold text-berinjela sm:text-rosa">
                R$ {receita.preco}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
