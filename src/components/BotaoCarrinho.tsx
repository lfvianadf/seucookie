"use client";

import { useCarrinho } from "@/context/CarrinhoContext";
import { IconeCesta } from "./IconeCesta";

export function BotaoCarrinho() {
  const { quantidadeTotal, abrirCarrinho } = useCarrinho();

  return (
    <button
      type="button"
      onClick={abrirCarrinho}
      aria-label="Abrir carrinho"
      className="relative -my-3 inline-flex items-center py-3 text-berinjela"
    >
      <IconeCesta className="h-7 w-7" />
      {quantidadeTotal > 0 && (
        <span className="absolute -right-1.5 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rosa px-1 font-corpo text-xs font-bold text-papel">
          {quantidadeTotal}
        </span>
      )}
    </button>
  );
}
