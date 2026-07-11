"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ComposicaoCaixa, ItemCarrinho, Receita } from "@/lib/site";

const CHAVE_STORAGE = "seucookie:carrinho";

type CarrinhoContextValor = {
  itens: ItemCarrinho[];
  aberto: boolean;
  abrirCarrinho: () => void;
  fecharCarrinho: () => void;
  adicionarSabor: (receita: Receita) => void;
  adicionarCaixa: (caixa: Receita, composicao: ComposicaoCaixa[]) => void;
  removerItem: (id: string) => void;
  alterarQuantidade: (id: string, delta: number) => void;
  limparCarrinho: () => void;
  quantidadeTotal: number;
  total: number;
};

const CarrinhoContext = createContext<CarrinhoContextValor | null>(null);

function idDaCaixa(numeroCaixa: string, composicao: ComposicaoCaixa[]) {
  const assinatura = [...composicao]
    .sort((a, b) => a.numero.localeCompare(b.numero))
    .map((c) => `${c.numero}x${c.quantidade}`)
    .join(",");
  return `${numeroCaixa}:${assinatura}`;
}

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [aberto, setAberto] = useState(false);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    try {
      const salvo = window.localStorage.getItem(CHAVE_STORAGE);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- carrega o carrinho persistido uma única vez, no mount
      if (salvo) setItens(JSON.parse(salvo));
    } catch {
      // localStorage indisponível — segue com carrinho vazio
    }
    setCarregado(true);
  }, []);

  useEffect(() => {
    if (!carregado) return;
    window.localStorage.setItem(CHAVE_STORAGE, JSON.stringify(itens));
  }, [itens, carregado]);

  function adicionarSabor(receita: Receita) {
    setItens((atual) => {
      const existente = atual.find((item) => item.id === receita.numero);
      if (existente) {
        return atual.map((item) =>
          item.id === receita.numero
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }
      return [
        ...atual,
        {
          id: receita.numero,
          numero: receita.numero,
          nome: receita.nome,
          peso: receita.peso,
          preco: receita.preco,
          quantidade: 1,
        },
      ];
    });
  }

  function adicionarCaixa(caixa: Receita, composicao: ComposicaoCaixa[]) {
    const id = idDaCaixa(caixa.numero, composicao);
    setItens((atual) => {
      const existente = atual.find((item) => item.id === id);
      if (existente) {
        return atual.map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item,
        );
      }
      return [
        ...atual,
        {
          id,
          numero: caixa.numero,
          nome: caixa.nome,
          peso: caixa.peso,
          preco: caixa.preco,
          quantidade: 1,
          composicao,
        },
      ];
    });
  }

  function removerItem(id: string) {
    setItens((atual) => atual.filter((item) => item.id !== id));
  }

  function alterarQuantidade(id: string, delta: number) {
    setItens((atual) =>
      atual
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade + delta }
            : item,
        )
        .filter((item) => item.quantidade > 0),
    );
  }

  function limparCarrinho() {
    setItens([]);
  }

  const { quantidadeTotal, total } = useMemo(() => {
    return itens.reduce(
      (acc, item) => ({
        quantidadeTotal: acc.quantidadeTotal + item.quantidade,
        total: acc.total + item.preco * item.quantidade,
      }),
      { quantidadeTotal: 0, total: 0 },
    );
  }, [itens]);

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        aberto,
        abrirCarrinho: () => setAberto(true),
        fecharCarrinho: () => setAberto(false),
        adicionarSabor,
        adicionarCaixa,
        removerItem,
        alterarQuantidade,
        limparCarrinho,
        quantidadeTotal,
        total,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const contexto = useContext(CarrinhoContext);
  if (!contexto) {
    throw new Error("useCarrinho precisa estar dentro de CarrinhoProvider");
  }
  return contexto;
}
