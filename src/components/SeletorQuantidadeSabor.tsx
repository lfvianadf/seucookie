"use client";

import { ContadorQuantidade } from "./ContadorQuantidade";
import { useCarrinho } from "@/context/CarrinhoContext";
import type { Receita } from "@/lib/site";

export function SeletorQuantidadeSabor({ sabor }: { sabor: Receita }) {
  const { itens, adicionarSabor, alterarQuantidade } = useCarrinho();
  const quantidade = itens.find((item) => item.id === sabor.numero)?.quantidade ?? 0;
  const limite = sabor.estoque != null && quantidade >= sabor.estoque;
  return (
    <div className="passador">
      {quantidade > 0 && (
        <button type="button" onClick={() => alterarQuantidade(sabor.numero, -1)} aria-label={`Diminuir ${sabor.nome}`}>−</button>
      )}
      <ContadorQuantidade valor={quantidade} oculto={quantidade === 0} />
      <button type="button" onClick={() => adicionarSabor(sabor)} disabled={Boolean(sabor.status) || limite}
        aria-label={`${quantidade ? "Aumentar" : "Adicionar"} ${sabor.nome}`}>+</button>
    </div>
  );
}
