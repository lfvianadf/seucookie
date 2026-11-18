"use client";

import { useEffect, useRef } from "react";
import { useCarrinho } from "@/context/CarrinhoContext";
import { formatarPreco, linkWhatsapp, montarMensagemPedido } from "@/lib/site";

export function CarrinhoPainel() {
  const {
    itens,
    aberto,
    fecharCarrinho,
    removerItem,
    alterarQuantidade,
    limparCarrinho,
    total,
  } = useCarrinho();

  const painel = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!aberto || !painel.current) return;
    const dialog = painel.current;
    const origem = document.activeElement;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (origem instanceof HTMLElement) origem.focus({ preventScroll: true });
    };
  }, [aberto]);

  if (!aberto) return null;

  function finalizar() {
    const mensagem = montarMensagemPedido(itens, total);
    window.open(linkWhatsapp(mensagem), "_blank");
    limparCarrinho();
    fecharCarrinho();
  }

  return (
    <dialog ref={painel} aria-label="Seu pedido" className="painel-pedido"
      onCancel={fecharCarrinho} onClick={(event) => {
        if (event.target === event.currentTarget) fecharCarrinho();
      }}>
      <div className="flex h-full flex-col bg-papel">
        <div className="flex items-center justify-between border-b border-berinjela/15 px-6 py-5">
          <h2 className="font-titulo text-3xl text-vinho">Seu pedido</h2>
          <button
            type="button"
            onClick={fecharCarrinho}
            aria-label="Fechar carrinho"
            className="-mr-2 -my-2 px-2 py-2 font-corpo text-sm font-bold text-ameixa"
          >
            fechar
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {itens.length === 0 ? (
            <p className="font-corpo text-ameixa">
              o caderno tá aberto, mas o pedido ainda não. escolhe um sabor aí.
            </p>
          ) : (
            <ul className="divide-y divide-berinjela/15">
              {itens.map((item) => (
                <li key={item.id} className="py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-titulo text-lg text-berinjela">
                        {item.nome}
                      </p>
                      {item.composicao ? (
                        <p className="mt-0.5 font-corpo text-xs text-ameixa">
                          {item.composicao
                            .map((c) => `${c.quantidade}x ${c.nome}`)
                            .join(", ")}
                        </p>
                      ) : (
                        item.peso && (
                          <p className="mt-0.5 font-corpo text-xs text-ameixa">
                            {item.peso}
                          </p>
                        )
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removerItem(item.id)}
                      aria-label={`Remover ${item.nome} do carrinho`}
                      className="shrink-0 px-1 py-1 font-corpo text-xs font-bold text-ameixa underline underline-offset-2"
                    >
                      remover
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 rounded-sm border border-berinjela/25">
                      <button
                        type="button"
                        onClick={() => alterarQuantidade(item.id, -1)}
                        aria-label="Diminuir quantidade"
                        className="px-3 py-1 font-corpo text-lg font-bold text-berinjela"
                      >
                        −
                      </button>
                      <span className="min-w-4 text-center font-corpo text-sm font-bold text-berinjela">
                        {item.quantidade}
                      </span>
                      <button
                        type="button"
                        onClick={() => alterarQuantidade(item.id, 1)}
                        aria-label="Aumentar quantidade"
                        className="px-3 py-1 font-corpo text-lg font-bold text-berinjela"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-corpo text-sm font-bold text-vinho">
                      {formatarPreco(item.preco * item.quantidade)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {itens.length > 0 && (
          <div className="border-t border-berinjela/15 px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="font-corpo text-ameixa">total</span>
              <span className="font-titulo text-2xl text-berinjela">
                {formatarPreco(total)}
              </span>
            </div>
            <button
              type="button"
              onClick={finalizar}
              className="botao-vinho mt-4 w-full justify-center"
            >
              finalizar pelo whatsapp
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
