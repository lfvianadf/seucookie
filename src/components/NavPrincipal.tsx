"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// "conheça o seu cookie" removido da nav por enquanto — a página /conheca
// continua no ar, só não está linkada aqui. Reative adicionando o item de
// volta neste array quando for a hora.
const LINKS = [{ href: "/", rotulo: "cardápio" }];

export function NavPrincipal() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicador, setIndicador] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const ativo = linkRefs.current[pathname] ?? linkRefs.current["/"];
    const container = containerRef.current;
    if (ativo && container) {
      const aRect = ativo.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      setIndicador({ left: aRect.left - cRect.left, width: aRect.width });
    }
  }, [pathname]);

  return (
    <nav ref={containerRef} className="relative hidden items-center gap-6 sm:flex">
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          ref={(el) => {
            linkRefs.current[link.href] = el;
          }}
          className="-my-3 inline-block py-3 font-corpo text-sm font-bold text-berinjela"
        >
          {link.rotulo}
        </Link>
      ))}
      {indicador && (
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-1 h-0.5 bg-rosa transition-all duration-300 ease-out"
          style={{ left: indicador.left, width: indicador.width }}
        />
      )}
    </nav>
  );
}
