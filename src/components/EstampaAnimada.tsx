"use client";

import { useEffect, useRef, useState } from "react";

export function EstampaAnimada() {
  const cena = useRef<HTMLDivElement>(null);
  const tela = useRef<HTMLCanvasElement>(null);
  const [pausada, setPausada] = useState(false);
  const [disponivel, setDisponivel] = useState(false);

  useEffect(() => {
    const elemento = cena.current;
    const canvas = tela.current;
    if (!elemento || !canvas || pausada) return;

    const movimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    let descartar: (() => void) | undefined;
    const controller = new AbortController();

    async function iniciar(elemento: HTMLDivElement, canvas: HTMLCanvasElement) {
      const gl = canvas.getContext("webgl2", { alpha: false, antialias: false });
      if (!gl) return;

      const { Scene, Camera, PlaneGeometry, ShaderMaterial, Mesh, WebGLRenderer,
        TextureLoader, RepeatWrapping, SRGBColorSpace, Vector2 } = await import("three");
      if (controller.signal.aborted) return;

      const textura = await new TextureLoader().loadAsync("/marca/padrao-berinjela.webp");
      if (controller.signal.aborted) {
        textura.dispose();
        return;
      }

      textura.colorSpace = SRGBColorSpace;
      textura.wrapS = textura.wrapT = RepeatWrapping;
      const renderer = new WebGLRenderer({ canvas, context: gl });
      const cena = new Scene();
      const camera = new Camera();
      const plano = new PlaneGeometry(2, 2);
      const uniformes = {
        estampa: { value: textura },
        escala: { value: new Vector2() },
        cursor: { value: new Vector2() },
        tempo: { value: 0 },
      };
      const material = new ShaderMaterial({
        uniforms: uniformes,
        vertexShader: `
          varying vec2 coordenada;
          void main() {
            coordenada = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D estampa;
          uniform vec2 escala;
          uniform vec2 cursor;
          uniform float tempo;
          varying vec2 coordenada;
          void main() {
            vec2 p = (coordenada - 0.5) * escala + 0.5;
            float dobra = p.x * 3.8 + p.y * 2.4 - tempo * 1.25;
            p.x += sin(dobra) * 0.024 + sin(tempo * 0.55) * 0.037;
            p.y += cos(dobra + 0.6) * 0.028;
            p += cursor * 0.065;
            gl_FragColor = texture2D(estampa, p);
            #include <colorspace_fragment>
          }
        `,
      });
      const folha = new Mesh(plano, material);
      folha.frustumCulled = false;
      cena.add(folha);

      const alvo = new Vector2();
      let quadro = 0;
      let visivel = false;
      let anterior = 0;
      const abertura = elemento.parentElement!;
      const redimensionar = () => {
        const { width, height } = elemento.getBoundingClientRect();
        const tamanho = parseFloat(getComputedStyle(elemento).backgroundSize);
        uniformes.escala.value.set(width / tamanho, height / tamanho);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(width, height, false);
        renderer.render(cena, camera);
      };
      const mover = (event: PointerEvent) => {
        const area = abertura.getBoundingClientRect();
        alvo.set((event.clientX - area.left) / area.width - 0.5,
          0.5 - (event.clientY - area.top) / area.height);
      };
      const recentrar = () => alvo.set(0, 0);
      const desenhar = (agora: number) => {
        uniformes.tempo.value += Math.min((agora - anterior) / 1000, 0.05);
        anterior = agora;
        uniformes.cursor.value.lerp(alvo, 0.08);
        renderer.render(cena, camera);
        quadro = requestAnimationFrame(desenhar);
      };
      const sincronizar = () => {
        cancelAnimationFrame(quadro);
        canvas.hidden = movimento.matches;
        if (visivel && !document.hidden && !movimento.matches) {
          anterior = performance.now();
          quadro = requestAnimationFrame(desenhar);
        }
      };
      const tamanho = new ResizeObserver(redimensionar);
      const observador = new IntersectionObserver(([entrada]) => {
        visivel = entrada.isIntersecting;
        sincronizar();
      });
      const eventos = { signal: controller.signal };
      const limpar = () => {
        cancelAnimationFrame(quadro);
        tamanho.disconnect();
        observador.disconnect();
        plano.dispose();
        material.dispose();
        textura.dispose();
        renderer.dispose();
        canvas.hidden = true;
      };
      descartar = limpar;
      redimensionar();
      canvas.hidden = movimento.matches;
      setDisponivel(true);
      tamanho.observe(elemento);
      observador.observe(elemento);
      abertura.addEventListener("pointermove", mover, eventos);
      abertura.addEventListener("pointerleave", recentrar, eventos);
      movimento.addEventListener("change", sincronizar, eventos);
      document.addEventListener("visibilitychange", sincronizar, eventos);
      canvas.addEventListener("webglcontextlost", () => {
        controller.abort();
        limpar();
        descartar = undefined;
        setDisponivel(false);
      }, eventos);
    }

    if (!movimento.matches) {
      void iniciar(elemento, canvas).catch(() => {
        descartar?.();
        descartar = undefined;
        setDisponivel(false);
      });
    }

    return () => {
      controller.abort();
      descartar?.();
    };
  }, [pausada]);

  return (
    <>
      <div className="estampa-abertura" ref={cena} aria-hidden="true">
        <canvas ref={tela} hidden />
      </div>
      {disponivel && (
        <button type="button" className="controle-estampa" onClick={() => setPausada(!pausada)}
          aria-label={pausada ? "Animar estampa" : "Pausar estampa"}>
          <span aria-hidden="true">{pausada ? "▶" : "Ⅱ"}</span>
        </button>
      )}
    </>
  );
}
