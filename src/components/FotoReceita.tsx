"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type FotoReceitaProps = {
  className?: string;
  sizes?: string;
  src: string;
  nome?: string;
  videoSrc?: string;
  poster?: string;
  arte?: boolean;
};

/** Thumbnail de receita, com borda tracejada de caderno. Clicar expande a foto em tela cheia. */
export function FotoReceita({
  className = "",
  sizes = "4rem",
  src,
  nome = "Cookie recém-feito, recheio derretendo",
  videoSrc,
  poster,
  arte = false,
}: FotoReceitaProps) {
  const [aberta, setAberta] = useState(false);
  const [reproduzir, setReproduzir] = useState(false);
  const [erroVideo, setErroVideo] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!aberta) return;
    const modal = dialog.current;
    const overflow = document.body.style.overflow;
    modal?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      modal?.close();
      document.body.style.overflow = overflow;
    };
  }, [aberta]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setErroVideo(false);
          setReproduzir(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
          setAberta(true);
        }}
        aria-label={videoSrc ? `Ver ${nome} por dentro` : arte ? `Ampliar ${nome}` : "Ver foto em tela cheia"}
        aria-haspopup="dialog"
        className={`${arte ? "adesivo-ampliavel" : "borda-picote"} relative aspect-square w-16 shrink-0 overflow-hidden bg-massa focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rosa ${className}`}
      >
        <Image src={src} alt="" fill sizes={sizes} className={arte ? "object-contain" : "object-cover"} />
        {videoSrc && (
          <span className="absolute bottom-4 left-4 rounded-sm bg-papel px-4 py-2 font-manuscrita text-2xl text-berinjela shadow-sm">
            ver por dentro ↗
          </span>
        )}
      </button>

      <dialog
        ref={dialog}
        aria-label={videoSrc ? `${nome} por dentro` : arte ? nome : "Foto do cookie"}
        onCancel={() => setAberta(false)}
        onClose={() => setAberta(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setAberta(false);
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-sm bg-papel p-0 text-berinjela shadow-2xl backdrop:bg-berinjela/80"
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <p className="font-manuscrita text-2xl">
            {videoSrc ? "olha esse recheio…" : arte ? nome : "feito à mão, de pertinho"}
          </p>
          <button
            type="button"
            aria-label="Fechar prévia"
            onClick={() => setAberta(false)}
            className="min-h-11 px-2 font-corpo text-sm font-bold underline underline-offset-4"
          >
            fechar
          </button>
        </div>
        {aberta && (
          videoSrc && !erroVideo ? (
            <>
              <video
                ref={video}
                src={videoSrc}
                poster={poster ?? src}
                aria-label={`${nome} abrindo ao meio e mostrando o recheio`}
                autoPlay={reproduzir}
                muted
                playsInline
                controls
                preload="none"
                onError={() => setErroVideo(true)}
                className="aspect-square w-full bg-massa object-contain"
              />
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <p className="font-corpo text-sm text-ameixa">{nome}</p>
                <button
                  type="button"
                  onClick={() => {
                    if (!video.current) return;
                    video.current.currentTime = 0;
                    void video.current.play().catch(() => {
                      // Os controles nativos continuam disponíveis se o navegador bloquear play().
                    });
                  }}
                  className="min-h-11 rounded-sm bg-berinjela px-5 py-2 font-corpo text-sm font-bold text-papel"
                >
                  ver de novo
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="relative aspect-square w-full">
                <Image src={src} alt={nome} fill sizes="(min-width: 640px) 32rem, 100vw" className={arte ? "object-contain" : "object-cover"} />
              </div>
              {erroVideo && (
                <p role="status" className="px-5 py-4 font-corpo text-sm text-ameixa">
                  A animação não carregou. Você ainda pode ver a foto do cookie.
                </p>
              )}
            </>
          )
        )}
      </dialog>
    </>
  );
}
