"use client";

import { useState } from "react";
import Image from "next/image";

type FotoReceitaProps = {
  className?: string;
  sizes?: string;
};

/** Thumbnail de receita, com borda tracejada de caderno. Clicar expande a foto em tela cheia. */
export function FotoReceita({ className = "", sizes = "4rem" }: FotoReceitaProps) {
  const [aberta, setAberta] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setAberta(true)}
        aria-label="Ver foto em tela cheia"
        className={`borda-picote relative aspect-square w-16 shrink-0 overflow-hidden bg-massa ${className}`}
      >
        <Image
          src="/cookie-hero.jpg"
          alt=""
          fill
          sizes={sizes}
          className="object-cover"
        />
      </button>

      {aberta && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setAberta(false)}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-berinjela/85 p-6"
        >
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setAberta(false)}
            className="absolute right-6 top-6 font-corpo text-sm font-bold text-papel underline underline-offset-4"
          >
            fechar
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative aspect-square w-full max-w-lg"
          >
            <Image
              src="/cookie-hero.jpg"
              alt="Cookie recém-feito, recheio derretendo"
              fill
              sizes="100vw"
              className="rounded-sm object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
}
