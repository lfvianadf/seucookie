import Image from "next/image";
import Link from "next/link";
import { BotaoCarrinho } from "./BotaoCarrinho";
import { MenuMobile } from "./MenuMobile";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-papel px-6 py-3 shadow-[0_1px_0_rgba(67,48,59,0.1)] sm:px-10">
      <Link href="/" className="-my-2 block">
        <Image
          src="/mascote-logo.png"
          alt="seu cookie"
          width={800}
          height={800}
          priority
          className="h-20 w-20 object-contain sm:h-24 sm:w-24"
        />
      </Link>

      <div className="flex items-center gap-5 sm:gap-6">
        <nav className="hidden items-center gap-6 sm:flex">
          <Link
            href="/"
            className="-my-3 inline-block py-3 font-corpo text-sm font-bold text-berinjela underline decoration-rosa decoration-2 underline-offset-4"
          >
            cardápio
          </Link>
          <Link
            href="/conheca"
            className="-my-3 inline-block py-3 font-corpo text-sm font-bold text-berinjela"
          >
            conheça o seu cookie
          </Link>
        </nav>
        <BotaoCarrinho />
        <MenuMobile />
      </div>
    </header>
  );
}
