import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center sm:px-10">
        <Image
          src="/mascote.png"
          alt="seu cookie, o mascote, meio confuso"
          width={800}
          height={800}
          className="h-32 w-32 rotate-[-6deg]"
        />
        <p className="mt-4 font-manuscrita text-2xl text-ameixa rotate-[-2deg]">
          essa página sumiu do caderno
        </p>
        <h1 className="mt-2 font-titulo text-4xl text-berinjela sm:text-5xl">
          página não encontrada
        </h1>
        <p className="mt-4 max-w-sm font-corpo text-ameixa">
          deve ter caído uma gota de café em cima dessa receita. volta pro
          início que a gente te mostra o caminho certo.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-sm bg-rosa px-7 py-3 font-corpo font-bold text-papel shadow-[3px_3px_0_rgba(67,48,59,0.25)] transition-transform hover:-translate-y-0.5"
        >
          voltar pro caderno
        </Link>
      </main>
      <Footer corAnterior="var(--papel)" />
    </>
  );
}
