"use client";

import { CarimboReceita } from "./CarimboReceita";
import { FotoReceita } from "./FotoReceita";
import { useCarrinho } from "@/context/CarrinhoContext";
import { SABORES, formatarPreco } from "@/lib/site";

export function CardapioSabores() {
  const { adicionarSabor } = useCarrinho();

  return (
    <ul className="mt-6 divide-y divide-berinjela/15 border-y border-berinjela/15 sm:divide-y-0 sm:border-none sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3">
      {SABORES.map((sabor, i) => (
        <li
          key={sabor.numero}
          className="flex items-center gap-5 py-5 sm:flex-col sm:items-stretch sm:gap-0 sm:py-0"
        >
          <div className="relative shrink-0 sm:w-full">
            <FotoReceita
              className={`-rotate-2 sm:aspect-[4/3] sm:w-full ${
                i % 2 === 0 ? "sm:-rotate-1" : "sm:rotate-1"
              }`}
              sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 4rem"
            />
            <div className="absolute bottom-0 -right-3 hidden sm:block sm:-bottom-6 sm:-right-4">
              <CarimboReceita numero={sabor.numero} className="bg-papel" />
            </div>
          </div>

          <div className="min-w-0 flex-1 sm:mt-5">
            <h3 className="font-titulo text-2xl font-medium text-berinjela sm:hidden">
              nº {sabor.numero}
            </h3>
            <span className="mt-1 block font-corpo text-xs font-bold uppercase tracking-wide text-ameixa sm:text-sm">
              {sabor.nome}
            </span>
            <p className="mt-1 font-corpo text-sm text-ameixa sm:mt-2 sm:text-base">
              {sabor.ingredientes} · {sabor.peso}
            </p>

            <div className="mt-3 hidden items-center justify-between sm:flex">
              <span className="font-corpo text-2xl font-bold text-rosa">
                {formatarPreco(sabor.preco)}
              </span>
              <button
                type="button"
                onClick={() => adicionarSabor(sabor)}
                aria-label={`Adicionar ${sabor.nome} ao carrinho`}
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-berinjela font-titulo text-2xl text-berinjela transition-transform hover:-translate-y-0.5"
                style={{ borderStyle: "double" }}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 sm:hidden">
            <span className="font-corpo text-lg font-bold text-berinjela">
              {formatarPreco(sabor.preco)}
            </span>
            <button
              type="button"
              onClick={() => adicionarSabor(sabor)}
              aria-label={`Adicionar ${sabor.nome} ao carrinho`}
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-berinjela font-titulo text-lg text-berinjela"
              style={{ borderStyle: "double" }}
            >
              +
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
