"use client";

import { CarimboReceita } from "./CarimboReceita";
import { FotoReceita } from "./FotoReceita";
import { SeletorQuantidadeSabor } from "./SeletorQuantidadeSabor";
import { SeloStatus } from "./SeloStatus";
import { formatarPreco, type Receita } from "@/lib/site";

type CardapioSaboresProps = {
  sabores: Receita[];
};

export function CardapioSabores({ sabores }: CardapioSaboresProps) {
  return (
    <ul className="mt-6 divide-y divide-berinjela/15 border-y border-berinjela/15 sm:divide-y-0 sm:border-none sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3">
      {sabores.map((sabor, i) => {
        const esgotado = Boolean(sabor.status);
        return (
          <li
            key={sabor.numero}
            className={`flex items-center gap-5 py-5 sm:flex-col sm:items-stretch sm:gap-0 sm:py-0 ${
              esgotado ? "opacity-60" : ""
            }`}
          >
            <div className="relative shrink-0 sm:w-full">
              <FotoReceita
                src={sabor.foto}
                className={`-rotate-2 sm:aspect-[4/3] sm:w-full ${
                  i % 2 === 0 ? "sm:-rotate-1" : "sm:rotate-1"
                } ${esgotado ? "grayscale" : ""}`}
                sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 4rem"
              />
              <div className="absolute bottom-0 -right-3 hidden sm:block sm:-bottom-6 sm:-right-4">
                <CarimboReceita numero={sabor.numero} className="bg-papel" />
              </div>
            </div>

            <div className="min-w-0 flex-1 sm:mt-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:hidden">
                <h3 className="font-titulo text-2xl font-medium text-berinjela">
                  nº {sabor.numero}
                </h3>
                {sabor.status && (
                  <SeloStatus variante="esgotado">{sabor.status}</SeloStatus>
                )}
              </div>
              <span className="mt-1 hidden items-center gap-2 font-corpo text-xs font-bold uppercase tracking-wide text-ameixa sm:flex sm:text-sm">
                {sabor.nome}
                {sabor.status && (
                  <SeloStatus variante="esgotado" className="normal-case tracking-normal">
                    {sabor.status}
                  </SeloStatus>
                )}
              </span>
              <span className="mt-1 block font-corpo text-xs font-bold uppercase tracking-wide text-ameixa sm:hidden">
                {sabor.nome}
              </span>
              <p className="mt-1 font-corpo text-sm text-ameixa sm:mt-2 sm:text-base">
                {sabor.ingredientes}
                {sabor.peso ? ` · ${sabor.peso}` : ""}
              </p>

              <div className="mt-3 hidden items-center justify-between sm:flex">
                <span className="font-corpo text-2xl font-bold text-rosa">
                  {formatarPreco(sabor.preco)}
                </span>
                <SeletorQuantidadeSabor sabor={sabor} tamanho="lg" />
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 sm:hidden">
              <span className="font-corpo text-lg font-bold text-berinjela">
                {formatarPreco(sabor.preco)}
              </span>
              <SeletorQuantidadeSabor sabor={sabor} tamanho="sm" />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
