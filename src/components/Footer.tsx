import Image from "next/image";
import { CONTATO, linkWhatsapp } from "@/lib/site";
import { TornEdge } from "./TornEdge";

type FooterProps = {
  corAnterior?: string;
};

export function Footer({ corAnterior = "var(--massa)" }: FooterProps) {
  return (
    <footer className="relative mt-auto bg-berinjela px-6 pb-28 pt-14 text-papel sm:px-10 sm:py-14">
      <TornEdge cor={corAnterior} variante={1} />

      <div className="mx-auto flex max-w-4xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 -rotate-6 items-center justify-center rounded-full bg-papel">
            <Image
              src="/mascote.png"
              alt=""
              width={800}
              height={800}
              className="h-10 w-10"
            />
          </span>
          <div>
            <p className="font-titulo text-2xl lowercase">seu cookie</p>
            <p className="mt-2 max-w-xs font-corpo text-sm text-papel/70">
              feito à mão, em {CONTATO.cidade}, desde 2026.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 font-corpo text-sm sm:items-end">
          <a
            href={linkWhatsapp("Oi! Vim pelo site do seu cookie")}
            className="-my-2 inline-block py-2 underline decoration-rosa decoration-2 underline-offset-4"
          >
            whatsapp
          </a>
          <a
            href={`https://instagram.com/${CONTATO.instagram}`}
            className="-my-2 inline-block py-2 underline decoration-rosa decoration-2 underline-offset-4"
          >
            @{CONTATO.instagram}
          </a>
          <span className="text-papel/70">{CONTATO.cidade}, RN</span>
        </div>
      </div>
    </footer>
  );
}
