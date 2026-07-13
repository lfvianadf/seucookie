"use client";

import { useState } from "react";
import Link from "next/link";
import { IconeMenu } from "./IconeMenu";

export function MenuMobile() {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-label={aberto ? "Fechar menu" : "Abrir menu"}
        aria-expanded={aberto}
        className="-my-3 inline-flex items-center py-3 text-berinjela"
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
            <Link
              href="/"
              onClick={() => setAberto(false)}
              className="border-b border-berinjela/15 py-4 font-corpo text-base font-bold text-berinjela"
            >
              cardápio
            </Link>
            <Link
              href="/conheca"
              onClick={() => setAberto(false)}
              className="py-4 font-corpo text-base font-bold text-berinjela"
            >
              conheça o seu cookie
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
