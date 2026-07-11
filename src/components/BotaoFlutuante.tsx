"use client";

import Image from "next/image";
import { useCarrinho } from "@/context/CarrinhoContext";

/** Atalho fixo de carrinho, só no mobile — no desktop o carrinho já fica visível no header. */
export function BotaoFlutuante() {
  const { quantidadeTotal, abrirCarrinho } = useCarrinho();

  return (
    <button
      type="button"
      onClick={abrirCarrinho}
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-sm bg-berinjela py-2 pl-2 pr-5 font-corpo text-sm font-bold text-papel shadow-[3px_3px_0_rgba(200,107,133,0.5)] sm:hidden"
    >
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-papel">
        <Image
          src="/mascote.png"
          alt=""
          width={800}
          height={800}
          className="h-8 w-8"
        />
        {quantidadeTotal > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rosa px-1 font-corpo text-xs font-bold text-papel">
            {quantidadeTotal}
          </span>
        )}
      </span>
      {quantidadeTotal > 0 ? "ver pedido" : "peça o seu"}
    </button>
  );
}
