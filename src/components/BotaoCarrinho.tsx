"use client";

import { ContadorQuantidade } from "./ContadorQuantidade";
import { useCarrinho } from "@/context/CarrinhoContext";
import { IconeCesta } from "./IconeCesta";

export function BotaoCarrinho() {
  const { quantidadeTotal, abrirCarrinho } = useCarrinho();

  return (
    <button type="button" onClick={(event) => {
        event.currentTarget.focus();
        abrirCarrinho();
      }} aria-haspopup="dialog"
      aria-label={`Abrir carrinho, ${quantidadeTotal} itens`} className="sacola">
      <IconeCesta className="size-5" />
      <span className="hidden sm:inline">Seu pedido</span>
      <ContadorQuantidade valor={quantidadeTotal} />
    </button>
  );
}
