"use client";

import { useEffect, useRef } from "react";
import { useCarrinho } from "@/context/CarrinhoContext";

export function ContadorQuantidade({ valor, className = "", oculto = false }: {
  valor: number;
  className?: string;
  oculto?: boolean;
}) {
  const contador = useRef<HTMLSpanElement>(null);
  const { carregado } = useCarrinho();
  const anterior = useRef({ valor, carregado });

  useEffect(() => {
    const mudou = anterior.current.carregado && anterior.current.valor !== valor;
    anterior.current = { valor, carregado };
    if (!mudou || oculto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pulso = contador.current?.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.22)", offset: 0.45 }, { transform: "scale(1)" }],
      { duration: 180, easing: "ease-out" },
    );
    return () => pulso?.cancel();
  }, [valor, oculto, carregado]);

  return <span ref={contador} hidden={oculto} className={`contador inline-block ${className}`}>{valor}</span>;
}
