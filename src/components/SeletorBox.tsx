"use client";

import { useState } from "react";
import { useCarrinho } from "@/context/CarrinhoContext";
import {
  calcularPrecoBox,
  formatarPreco,
  type ComposicaoCaixa,
  type Receita,
} from "@/lib/site";

type SeletorBoxProps = {
  caixa: Receita;
  sabores: Receita[];
};

export function SeletorBox({ caixa, sabores }: SeletorBoxProps) {
  const [adicionada, setAdicionada] = useState(false);
  const { adicionarCaixa } = useCarrinho();
  const [contagens, setContagens] = useState<Record<string, number>>(() =>
    Object.fromEntries(sabores.map((s) => [s.numero, 0])),
  );

  const total = Object.values(contagens).reduce((a, b) => a + b, 0);
  const disponivel = !caixa.status;
  // número fixo de cookies exigido pela box, ou null = composição livre
  const alvo = caixa.qtdCookiesBox ?? null;
  const pronta = alvo != null ? total === alvo : total > 0;

  const composicaoAtual: ComposicaoCaixa[] = sabores
    .filter((s) => contagens[s.numero] > 0)
    .map((s) => ({
      numero: s.numero,
      nome: s.nome,
      quantidade: contagens[s.numero],
      produtoId: s.produtoId ?? "",
    }));
  const precoAtual = calcularPrecoBox(caixa.preco, composicaoAtual, sabores);

  function alterar(numero: string, delta: number) {
    setAdicionada(false);
    setContagens((atual) => {
      const totalAtual = Object.values(atual).reduce((a, b) => a + b, 0);
      const novaQtd = atual[numero] + delta;
      if (novaQtd < 0) return atual;
      if (delta > 0 && alvo != null && totalAtual >= alvo) return atual;
      const sabor = sabores.find((s) => s.numero === numero);
      if (delta > 0 && sabor?.estoque != null && novaQtd > sabor.estoque) return atual;
      return { ...atual, [numero]: novaQtd };
    });
  }

  function adicionar() {
    adicionarCaixa(caixa, composicaoAtual, precoAtual);
    setAdicionada(true);
    setContagens(Object.fromEntries(sabores.map((s) => [s.numero, 0])));
  }

  if (!disponivel) {
    return (
      <p className="font-corpo text-sm text-ameixa">
        a caixa está fora de estoque no momento — em breve tem de novo.
      </p>
    );
  }

  const progresso = alvo == null
    ? `${total} ${total === 1 ? "escolhido" : "escolhidos"}`
    : `${total} de ${alvo}${pronta ? " · caixa pronta" : ""}`;

  return (
    <div className="montagem">
      <figure className="previa-caixa">
        <div className="caixa-dobras" data-aberta={total > 0} role="img"
          aria-label={total > 0 ? "Embalagem aberta" : "Embalagem fechada"} />
        <figcaption>
          <p role="status" aria-atomic="true">{adicionada ? "Caixa no carrinho" : progresso}</p>
          {total > 0 && (
            <p className="sabores-escolhidos">
              {composicaoAtual.map((item) => `${item.quantidade}× ${item.nome}`).join(" · ")}
            </p>
          )}
        </figcaption>
      </figure>
      <div className="escolhas">
        <p className="rubrica">{alvo == null ? "Escolha seus sabores" : `Escolha ${alvo} cookies`}</p>
        <ul className="mt-3 divide-y divide-berinjela/20 border-y border-berinjela/20">
          {sabores.map((sabor) => {
            const esgotado = Boolean(sabor.status);
            const limiteAtingido =
              sabor.estoque != null && contagens[sabor.numero] >= sabor.estoque;
            const noAlvo = alvo != null && total >= alvo;
            return (
              <li
                key={sabor.numero}
                className={`flex items-center justify-between gap-3 py-4 ${
                  esgotado ? "opacity-60" : ""
                }`}
              >
                <span className="flex min-w-0 flex-wrap items-center gap-2 font-titulo text-lg text-berinjela">
                  {sabor.nome}
                  {Boolean(sabor.acrescimoBox) && (
                    <span className="font-corpo text-xs font-bold text-berinjela">
                      + {formatarPreco(sabor.acrescimoBox!)}
                    </span>
                  )}
                  {sabor.status && (
                    <span className="font-corpo text-xs font-bold uppercase tracking-wide text-ameixa">
                      {sabor.status}
                    </span>
                  )}
                </span>
                <div className="passador">
                  <button
                    type="button"
                    onClick={() => alterar(sabor.numero, -1)}
                    aria-label={`Diminuir ${sabor.nome}`}
                    className="px-2 py-1.5 font-corpo text-lg font-bold text-berinjela disabled:opacity-30"
                    disabled={contagens[sabor.numero] === 0}
                  >
                    −
                  </button>
                  <span className="min-w-4 text-center font-corpo text-sm font-bold text-berinjela">
                    {contagens[sabor.numero]}
                  </span>
                  <button
                    type="button"
                    onClick={() => alterar(sabor.numero, 1)}
                    aria-label={`Aumentar ${sabor.nome}`}
                    className="px-2 py-1.5 font-corpo text-lg font-bold text-berinjela disabled:opacity-30"
                    disabled={noAlvo || esgotado || limiteAtingido}
                  >
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={adicionar}
          disabled={!pronta}
          className="botao-principal mt-5 w-full justify-between"
        >
          <span>Adicionar caixa</span> <strong>{formatarPreco(precoAtual)}</strong>
        </button>
      </div>
    </div>
  );
}
