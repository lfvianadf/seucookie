"use client";

import { useState } from "react";
import { useCarrinho } from "@/context/CarrinhoContext";
import { QUANTIDADE_CAIXA, formatarPreco, type Receita } from "@/lib/site";

type SeletorBoxProps = {
  caixa: Receita;
  sabores: Receita[];
};

export function SeletorBox({ caixa, sabores }: SeletorBoxProps) {
  const { adicionarCaixa } = useCarrinho();
  const [contagens, setContagens] = useState<Record<string, number>>(() =>
    Object.fromEntries(sabores.map((s) => [s.numero, 0])),
  );

  const total = Object.values(contagens).reduce((a, b) => a + b, 0);
  const restante = QUANTIDADE_CAIXA - total;
  const disponivel = !caixa.status;

  function alterar(numero: string, delta: number) {
    setContagens((atual) => {
      const totalAtual = Object.values(atual).reduce((a, b) => a + b, 0);
      const novaQtd = atual[numero] + delta;
      if (novaQtd < 0) return atual;
      if (delta > 0 && totalAtual >= QUANTIDADE_CAIXA) return atual;
      const sabor = sabores.find((s) => s.numero === numero);
      if (delta > 0 && sabor?.estoque != null && novaQtd > sabor.estoque) return atual;
      return { ...atual, [numero]: novaQtd };
    });
  }

  function adicionar() {
    const composicao = sabores
      .filter((s) => contagens[s.numero] > 0)
      .map((s) => ({
        numero: s.numero,
        nome: s.nome,
        quantidade: contagens[s.numero],
      }));
    adicionarCaixa(caixa, composicao);
    setContagens(Object.fromEntries(sabores.map((s) => [s.numero, 0])));
  }

  if (!disponivel) {
    return (
      <p className="font-corpo text-sm text-ameixa">
        a caixa está fora de estoque no momento — em breve tem de novo.
      </p>
    );
  }

  return (
    <div>
      <p className="font-corpo text-sm text-ameixa">
        escolha os {QUANTIDADE_CAIXA} cookies da caixa
        {restante > 0 ? ` — falta${restante === 1 ? "" : "m"} ${restante}` : " — pronta!"}
      </p>

      <ul className="mt-5 divide-y divide-berinjela/15 border-y border-berinjela/15">
        {sabores.map((sabor) => {
          const esgotado = Boolean(sabor.status);
          const limiteAtingido =
            sabor.estoque != null && contagens[sabor.numero] >= sabor.estoque;
          return (
            <li
              key={sabor.numero}
              className={`flex items-center justify-between gap-3 py-4 ${
                esgotado ? "opacity-60" : ""
              }`}
            >
              <span className="flex items-center gap-2 font-titulo text-xl text-berinjela">
                {sabor.nome}
                {esgotado && (
                  <span className="font-corpo text-xs font-bold uppercase tracking-wide text-ameixa">
                    esgotado
                  </span>
                )}
              </span>
              <div className="flex items-center gap-4 rounded-sm border border-berinjela/25 px-1">
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
                  disabled={total >= QUANTIDADE_CAIXA || esgotado || limiteAtingido}
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
        disabled={restante !== 0}
        className="mt-5 w-full rounded-sm bg-rosa px-7 py-3 font-corpo font-bold text-papel shadow-[3px_3px_0_rgba(67,48,59,0.25)] transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-40"
      >
        adicionar caixa — {formatarPreco(caixa.preco)}
      </button>
    </div>
  );
}
