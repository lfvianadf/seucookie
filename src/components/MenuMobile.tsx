"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconeMenu } from "./IconeMenu";

// "conheça o seu cookie" removido da nav por enquanto — a página /conheca
// continua no ar, só não está linkada aqui. Reative adicionando o item de
// volta neste array quando for a hora.
const LINKS = [{ href: "/", rotulo: "cardápio" }];

export function MenuMobile() {
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-label={aberto ? "Fechar menu" : "Abrir menu"}
        aria-expanded={aberto}
        className="-my-3 inline-flex items-center py-3 text-berinjela sm:hidden"
      >
        <IconeMenu aberto={aberto} className="h-7 w-7" />
      </button>

      {aberto && (
        <>
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setAberto(false)}
            className="fixed inset-0 z-40 bg-berinjela/20"
          />
          <div className="borda-picote absolute left-6 right-6 top-full z-50 mt-2 flex flex-col bg-papel px-6 py-2 shadow-[3px_3px_0_rgba(67,48,59,0.15)] sm:hidden">
            {LINKS.map((link) => {
              const ativo = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setAberto(false)}
                  className={`py-4 font-corpo text-base font-bold text-berinjela ${
                    ativo ? "underline decoration-rosa decoration-2 underline-offset-4" : ""
                  }`}
                >
                  {link.rotulo}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
