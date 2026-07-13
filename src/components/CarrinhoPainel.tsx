"use client";

import { useState } from "react";
import { useCarrinho } from "@/context/CarrinhoContext";
import { formatarPreco, linkWhatsapp, montarMensagemPedido } from "@/lib/site";
import { criarPedido } from "@/lib/pedidos";

const classeInput =
  "w-full rounded-sm border border-berinjela/25 bg-papel px-3 py-2 font-corpo text-sm text-berinjela outline-none focus:border-berinjela";

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

  const [etapa, setEtapa] = useState<"carrinho" | "dados">("carrinho");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [enviando, setEnviando] = useState(false);

  if (!aberto) return null;

  function resetar() {
    setEtapa("carrinho");
    setNome("");
    setTelefone("");
    setEndereco("");
    setObservacoes("");
    setEnviando(false);
  }

  function fechar() {
    fecharCarrinho();
    resetar();
  }

  async function confirmarPedido() {
    setEnviando(true);

    let pedidoId: string | undefined;
    try {
      const resultado = await criarPedido({
        nome,
        telefone,
        endereco,
        observacoesCliente: observacoes,
        itens,
        total,
      });
      pedidoId = resultado.pedidoId;
    } catch (err) {
      // nunca trava a compra por causa disso — só loga pra investigar depois
      console.error("Falha ao gravar pedido no Supabase:", err);
    }

    const mensagem = montarMensagemPedido(itens, total, pedidoId);
    window.open(linkWhatsapp(mensagem), "_blank");
    limparCarrinho();
    fechar();
  }

  const dadosValidos = nome.trim().length > 0 && telefone.trim().length >= 8;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Fechar carrinho"
        onClick={fechar}
        className="absolute inset-0 bg-berinjela/40"
      />

      <div className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-papel shadow-[-6px_0_0_rgba(67,48,59,0.1)] sm:max-w-md">
        <div className="flex items-center justify-between border-b border-berinjela/15 px-6 py-5">
          <h2 className="font-titulo text-2xl text-berinjela">seu pedido</h2>
          <button
            type="button"
            onClick={fechar}
            aria-label="Fechar carrinho"
            className="-mr-2 -my-2 px-2 py-2 font-corpo text-sm font-bold text-ameixa"
          >
            fechar
          </button>
        </div>

        {etapa === "carrinho" ? (
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
                      <span className="font-corpo text-sm font-bold text-rosa">
                        {formatarPreco(item.preco * item.quantidade)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <button
              type="button"
              onClick={() => setEtapa("carrinho")}
              className="font-corpo text-sm font-bold text-ameixa"
            >
              ‹ voltar pro pedido
            </button>

            <p className="mt-4 font-corpo text-sm text-ameixa">
              é só pra gente te chamar certo no WhatsApp.
            </p>

            <div className="mt-4 space-y-4">
              <label className="block">
                <span className="mb-1 block font-corpo text-sm font-bold text-berinjela">
                  nome
                </span>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={classeInput}
                  placeholder="seu nome"
                />
              </label>

              <label className="block">
                <span className="mb-1 block font-corpo text-sm font-bold text-berinjela">
                  telefone
                </span>
                <input
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className={classeInput}
                  placeholder="(84) 99999-9999"
                />
              </label>

              <label className="block">
                <span className="mb-1 block font-corpo text-sm font-bold text-berinjela">
                  endereço <span className="font-normal text-ameixa">(se for entrega)</span>
                </span>
                <input
                  type="text"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  className={classeInput}
                  placeholder="rua, número, bairro"
                />
              </label>

              <label className="block">
                <span className="mb-1 block font-corpo text-sm font-bold text-berinjela">
                  observações <span className="font-normal text-ameixa">(opcional)</span>
                </span>
                <textarea
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  rows={2}
                  className={classeInput}
                  placeholder="alguma coisa que a gente precise saber?"
                />
              </label>
            </div>
          </div>
        )}

        {itens.length > 0 && (
          <div className="border-t border-berinjela/15 px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="font-corpo text-ameixa">total</span>
              <span className="font-titulo text-2xl text-berinjela">
                {formatarPreco(total)}
              </span>
            </div>
            {etapa === "carrinho" ? (
              <button
                type="button"
                onClick={() => setEtapa("dados")}
                className="mt-4 block w-full rounded-sm bg-rosa px-7 py-3 text-center font-corpo font-bold text-papel shadow-[3px_3px_0_rgba(67,48,59,0.25)] transition-transform hover:-translate-y-0.5"
              >
                finalizar pelo whatsapp
              </button>
            ) : (
              <button
                type="button"
                onClick={confirmarPedido}
                disabled={!dadosValidos || enviando}
                className="mt-4 block w-full rounded-sm bg-rosa px-7 py-3 text-center font-corpo font-bold text-papel shadow-[3px_3px_0_rgba(67,48,59,0.25)] transition-transform hover:-translate-y-0.5 disabled:opacity-40"
              >
                {enviando ? "enviando…" : "confirmar pedido"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
