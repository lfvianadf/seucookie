import Link from "next/link";
import { CarimboReceita } from "./CarimboReceita";
import { FotoReceita } from "./FotoReceita";
import { SeloStatus } from "./SeloStatus";
import { TracoManuscrito } from "./TracoManuscrito";
import { TornEdge } from "./TornEdge";
import { formatarPreco, type Receita } from "@/lib/site";

type ReceitasDestaqueProps = {
  receitas: Receita[];
};

export function ReceitasDestaque({ receitas }: ReceitasDestaqueProps) {
  return (
    <section className="relative px-6 py-20 sm:px-10 sm:py-28">
      <TornEdge cor="var(--massa)" variante={1} />

      <div className="mx-auto max-w-4xl">
        <h2 className="ml-4 inline-block font-titulo text-3xl text-berinjela sm:ml-10">
          as receitas
        </h2>
        <TracoManuscrito className="ml-4 mt-1 h-3 w-32 sm:ml-10" />
        <p className="ml-4 mt-3 font-corpo text-ameixa sm:ml-10">
          três sabores e uma caixa pra montar do seu jeito. o pedido é{" "}
          <Link
            href="/"
            className="font-bold text-berinjela underline decoration-rosa decoration-2 underline-offset-4"
          >
            aqui
          </Link>
          .
        </p>

        <ul className="mt-10 divide-y divide-berinjela/15 border-y border-berinjela/15">
          {receitas.map((receita, i) => {
            const esgotado = Boolean(receita.status);
            return (
              <li
                key={receita.numero}
                className={`flex items-center gap-5 py-5 ${
                  i % 2 === 0 ? "sm:pl-0" : "pl-6 sm:pl-10"
                } ${esgotado ? "opacity-60" : ""}`}
              >
                <div className="relative shrink-0">
                  <FotoReceita
                    src={receita.foto}
                    className={`-rotate-2 ${esgotado ? "grayscale" : ""}`}
                  />
                  <div className="absolute bottom-0 -right-3 hidden sm:block sm:-bottom-5 sm:-right-5">
                    <CarimboReceita numero={receita.numero} className="bg-papel" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-titulo text-2xl text-berinjela sm:hidden">
                      nº {receita.numero}
                    </h3>
                    {receita.status && (
                      <SeloStatus variante="esgotado">{receita.status}</SeloStatus>
                    )}
                  </div>
                  <span className="mt-1 block font-corpo text-xs font-bold uppercase tracking-wide text-ameixa">
                    {receita.nome}
                  </span>
                  <p className="mt-1 font-corpo text-sm text-ameixa">
                    {receita.ingredientes}
                    {receita.peso ? ` · ${receita.peso}` : ""}
                  </p>
                </div>
                <span className="font-corpo text-lg font-bold text-berinjela sm:text-rosa">
                  {formatarPreco(receita.preco)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
