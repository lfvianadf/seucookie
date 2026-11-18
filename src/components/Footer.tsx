import Image from "next/image";
import { CONTATO, linkWhatsapp } from "@/lib/site";
import { TornEdge } from "./TornEdge";

type FooterProps = {
  corAnterior?: string;
};

export function Footer({ corAnterior = "var(--massa)" }: FooterProps) {
  return (
    <footer className="relative mt-auto bg-berinjela py-12 text-massa sm:py-14">
      <TornEdge cor={corAnterior} />

      <div className="miolo flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/marca/logo-bege.webp"
            alt="Seu Cookie"
            width={340}
            height={280}
            className="h-auto w-20 shrink-0 sm:w-24"
          />
          <p className="max-w-xs font-corpo text-sm text-massa/80">
            feito à mão, em {CONTATO.cidade}, desde 2026.
          </p>
        </div>

        <div className="flex flex-col gap-2 font-corpo text-sm sm:items-end">
          <a
            href={linkWhatsapp("Oi! Vim pelo site do seu cookie")}
            className="-my-2 inline-block py-2 underline decoration-massa/50 underline-offset-4"
          >
            whatsapp
          </a>
          <a
            href={`https://instagram.com/${CONTATO.instagram}`}
            className="-my-2 inline-block py-2 underline decoration-massa/50 underline-offset-4"
          >
            @{CONTATO.instagram}
          </a>
          <span className="text-massa/80">{CONTATO.cidade}, RN</span>
        </div>
      </div>
    </footer>
  );
}
