import Image from "next/image";
import Link from "next/link";
import { BotaoCarrinho } from "./BotaoCarrinho";
import { MenuMobile } from "./MenuMobile";
import { NavPrincipal } from "./NavPrincipal";

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
        <NavPrincipal />
        <MenuMobile />
        <BotaoCarrinho />
      </div>
    </header>
  );
}
