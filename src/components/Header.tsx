import Image from "next/image";
import Link from "next/link";
import { BotaoCarrinho } from "./BotaoCarrinho";

export function Header() {
  return (
    <header className="cabecalho">
      <div className="miolo flex items-center justify-between gap-3">
        <Link href="/" aria-label="Seu Cookie, início">
          <Image src="/marca/logo-bege.webp" alt="Seu Cookie" width={90} height={72} priority className="logo-cabecalho" />
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-3 font-bold sm:gap-8">
          <Link href="/#cardapio">Cardápio</Link>
          <Link href="/#combos">Combos</Link>
          <Link href="/#encomendas">Encomendas</Link>
          <BotaoCarrinho />
        </nav>
      </div>
    </header>
  );
}
