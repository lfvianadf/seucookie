"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Fita } from "./Fita";
import { TracoManuscrito } from "./TracoManuscrito";

const FOTOS = [
  {
    arquivo: "potes-geoenge",
    titulo: "Brindes para empresas",
    descricao: "Presenteie seus clientes ou colaboradores com mini cookies em potes personalizados com a sua marca.",
    alt: "Potes de mini cookies com rótulos da Geoenge e do Seu Cookie",
  },
  {
    arquivo: "kits-com-laco",
    titulo: "Lembrancinhas de aniversário",
    descricao: "Agradeça aos convidados com um kit de cookies sortidos, embalado com laço para levar para casa.",
    alt: "Kits de cookies embalados em saquinhos com laços rosa e azul",
  },
  {
    arquivo: "cookies-individuais",
    titulo: "Cookies para confraternizações",
    descricao: "Sirva cookies embalados individualmente para facilitar a distribuição no seu evento.",
    alt: "Cookies de Nutella embalados um a um com etiquetas do Seu Cookie",
  },
  {
    arquivo: "kits-na-mesa",
    titulo: "Kits para presentear",
    descricao: "Combine os sabores favoritos de quem vai receber e transforme o kit em um presente feito à mão.",
    alt: "Saquinhos de cookies com laços coloridos sobre uma mesa de festa",
  },
];

type Pagina = {
  atual: number;
  anterior: number | null;
  direcao: -1 | 1;
};

function virar({ atual }: Pagina, direcao: Pagina["direcao"]): Pagina {
  return { atual: (atual + direcao + FOTOS.length) % FOTOS.length, anterior: atual, direcao };
}

export function CarrosselEncomendas() {
  const galeria = useRef<HTMLDivElement>(null);
  const toque = useRef<{ x: number; y: number } | null>(null);
  const [pagina, setPagina] = useState<Pagina>({ atual: 0, anterior: null, direcao: 1 });
  const [pausado, setPausado] = useState(false);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const caderno = galeria.current;
    if (!caderno) return;
    const observador = new IntersectionObserver(([entrada]) => setVisivel(entrada.isIntersecting), {
      threshold: 0.5,
    });
    observador.observe(caderno);
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    if (pausado || !visivel) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setPagina((atual) => virar(atual, 1));
      }
    }, 6500);
    return () => window.clearInterval(timer);
  }, [pausado, visivel]);

  function navegar(direcao: Pagina["direcao"]) {
    setPausado(true);
    setPagina((atual) => virar(atual, direcao));
  }

  return (
    <div className="carrossel-encomendas" role="region" aria-roledescription="caderno" aria-label="Exemplos de encomendas">
      <div
        ref={galeria}
        className="caderno-encomendas"
        onTouchStart={(event) => {
          const dedo = event.touches[0];
          toque.current = { x: dedo.clientX, y: dedo.clientY };
          setPausado(true);
        }}
        onTouchEnd={(event) => {
          const inicio = toque.current;
          toque.current = null;
          if (!inicio) return;
          const dedo = event.changedTouches[0];
          const horizontal = dedo.clientX - inicio.x;
          const vertical = dedo.clientY - inicio.y;
          if (Math.abs(horizontal) > 45 && Math.abs(horizontal) > Math.abs(vertical)) {
            navegar(horizontal < 0 ? 1 : -1);
          }
        }}
        onTouchCancel={() => { toque.current = null; }}
      >
        {FOTOS.map(({ arquivo, titulo, descricao, alt }, indice) => {
          const anterior = indice === pagina.anterior;
          if (!anterior && indice !== pagina.atual) return null;

          return (
            <figure
              key={arquivo}
              className="folha-encomenda"
              data-virando={anterior ? pagina.direcao : undefined}
              aria-hidden={anterior || undefined}
              onAnimationEnd={(event) => {
                if (anterior && event.target === event.currentTarget) {
                  setPagina((atual) => atual.anterior === indice ? { ...atual, anterior: null } : atual);
                }
              }}
            >
              <figcaption>
                <h3>{titulo}</h3>
                <TracoManuscrito className="h-3 w-32" />
                <p>{descricao}</p>
              </figcaption>
              <div className="foto-encomenda" data-inteira={arquivo === "potes-geoenge" || undefined}>
                <Image src={`/encomendas/${arquivo}.webp`} alt={alt} fill sizes="(min-width: 701px) 247px, 200px" />
                <Fita className="-top-3 left-1/2 z-10 -translate-x-1/2" rotate={-8} />
              </div>
            </figure>
          );
        })}
      </div>
      <div className="encomendas-controles">
        <button type="button" className="encomendas-pausa" aria-label={pausado ? "Retomar virada automática" : "Pausar virada automática"} onClick={() => setPausado(!pausado)}>
          <span aria-hidden="true">{pausado ? "▶" : "Ⅱ"}</span>
        </button>
        <div>
          <button type="button" onClick={() => navegar(-1)} aria-label="Página anterior">←</button>
          <span className="font-manuscrita" aria-live={pausado ? "polite" : "off"}>Página {pagina.atual + 1} de {FOTOS.length}</span>
          <button type="button" onClick={() => navegar(1)} aria-label="Próxima página">→</button>
        </div>
      </div>
    </div>
  );
}
