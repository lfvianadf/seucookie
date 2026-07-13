"use client";

import { useCarrinho } from "@/context/CarrinhoContext";
import type { Receita } from "@/lib/site";

type SeletorQuantidadeSaborProps = {
  sabor: Receita;
  tamanho?: "sm" | "lg";
};

/** Botão "+" que vira contador (como na caixa) assim que o sabor entra no carrinho. */
export function SeletorQuantidadeSabor({ sabor, tamanho = "lg" }: SeletorQuantidadeSaborProps) {
  const { itens, adicionarSabor, alterarQuantidade } = useCarrinho();
  const quantidade = itens.find((item) => item.id === sabor.numero)?.quantidade ?? 0;
  const esgotado = Boolean(sabor.status);
  const limiteAtingido = sabor.estoque != null && quantidade >= sabor.estoque;

  if (quantidade === 0) {
    const tamanhoClasse = tamanho === "lg" ? "h-11 w-11 text-2xl" : "h-9 w-9 text-lg";
    return (
      <button
        type="button"
        onClick={() => adicionarSabor(sabor)}
        disabled={esgotado || limiteAtingido}
        aria-label={`Adicionar ${sabor.nome} ao carrinho`}
        className={`flex ${tamanhoClasse} items-center justify-center rounded-full border-2 border-berinjela font-corpo leading-none text-berinjela transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0`}
      >
        +
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-sm border border-berinjela/25">
      <button
        type="button"
        onClick={() => alterarQuantidade(sabor.numero, -1)}
        aria-label={`Diminuir ${sabor.nome}`}
        className="px-2 py-1.5 font-corpo text-lg font-bold text-berinjela"
      >
        −
      </button>
      <span className="min-w-4 text-center font-corpo text-sm font-bold text-berinjela">
        {quantidade}
      </span>
      <button
        type="button"
        onClick={() => alterarQuantidade(sabor.numero, 1)}
        disabled={esgotado || limiteAtingido}
        aria-label={`Aumentar ${sabor.nome}`}
        className="px-2 py-1.5 font-corpo text-lg font-bold text-berinjela disabled:cursor-not-allowed disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}
