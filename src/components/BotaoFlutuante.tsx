import Image from "next/image";
import { linkWhatsapp } from "@/lib/site";

/** Atalho fixo pro WhatsApp, só no mobile — no desktop os CTAs de cada seção já são visíveis sem rolar tanto. */
export function BotaoFlutuante() {
  return (
    <a
      href={linkWhatsapp("Oi! Vim pelo site e queria pedir um cookie")}
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-sm bg-berinjela py-2 pl-2 pr-5 font-corpo text-sm font-bold text-papel shadow-[3px_3px_0_rgba(200,107,133,0.5)] sm:hidden"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-papel">
        <Image
          src="/mascote.png"
          alt=""
          width={800}
          height={800}
          className="h-8 w-8"
        />
      </span>
      peça o seu
    </a>
  );
}
