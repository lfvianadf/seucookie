"use client";

import { useEffect, useRef, useState } from "react";

export function CookieGirando() {
  const video = useRef<HTMLVideoElement>(null);
  const pausaManual = useRef(false);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visivel = false;

    function atualizar() {
      if (!el) return;
      if (pausaManual.current || !visivel || document.hidden || movimentoReduzido.matches) el.pause();
      else void el.play().catch(() => {});
    }

    const observer = new IntersectionObserver(([entrada]) => {
      visivel = entrada.isIntersecting;
      atualizar();
    });
    observer.observe(el);
    movimentoReduzido.addEventListener("change", atualizar);
    document.addEventListener("visibilitychange", atualizar);
    return () => {
      observer.disconnect();
      movimentoReduzido.removeEventListener("change", atualizar);
      document.removeEventListener("visibilitychange", atualizar);
    };
  }, []);

  function alternarGiro() {
    const el = video.current;
    if (!el) return;
    pausaManual.current = !el.paused;
    if (el.paused) void el.play().catch(() => {});
    else el.pause();
  }

  return (
    <div className="abertura-arte">
      <video ref={video} src="/marca/oreo-giro.mp4" poster="/marca/oreo-giro.webp"
        onPlay={() => setTocando(true)} onPause={() => setTocando(false)}
        width={768} height={640} muted loop playsInline preload="none" aria-label="Cookie de Oreo do Seu Cookie, em um giro de 360 graus" />
      <button type="button" className="controle-giro" onClick={alternarGiro}
        aria-label={tocando ? "Pausar giro do cookie" : "Retomar giro do cookie"}>
        {tocando ? "Ⅱ" : "▶"}
      </button>
    </div>
  );
}
