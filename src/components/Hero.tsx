import Image from "next/image";
import Link from "next/link";
import { Fita } from "./Fita";
import { CarimboReceita } from "./CarimboReceita";
import { NotaAdesiva } from "./NotaAdesiva";
import { ManchaCafe } from "./ManchaCafe";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-8 sm:px-10 sm:pb-32 sm:pt-14">
      <ManchaCafe className="pointer-events-none absolute -left-10 top-6 h-40 w-40 opacity-60 sm:-left-10 sm:top-0 sm:h-56 sm:w-56 sm:opacity-100" />

      <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6 lg:col-start-1 lg:pt-10">
          <p className="font-manuscrita text-2xl text-ameixa rotate-[-2deg]">
            o favorito da casa começou aqui
          </p>
          <h1 className="mt-3 max-w-md font-titulo text-5xl leading-[1.05] text-berinjela sm:text-6xl">
            um caderno de receitas que virou loja.
          </h1>
          <p className="mt-6 max-w-sm font-corpo text-base text-ameixa">
            cookie recheado, feito hoje de manhã, pensando em quem vai comer.
            cada um é uma receita numerada do nosso caderno — e ele nunca
            acaba.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Link
              href="/"
              className="inline-block rounded-sm bg-rosa px-7 py-3 font-corpo font-bold text-papel shadow-[3px_3px_0_rgba(67,48,59,0.25)] transition-transform hover:-translate-y-0.5"
            >
              peça o seu
            </Link>
            <span className="font-manuscrita text-xl text-ameixa rotate-[-3deg]">
              é só chamar
            </span>
          </div>
        </div>

        <div className="relative lg:col-span-6 lg:col-start-7">
          <div className="relative ml-auto mr-1 max-w-sm rotate-[1.5deg] sm:mr-3 lg:mr-4">
            <Fita className="left-6 -top-3" rotate={-8} />
            <Fita className="right-4 -top-3" rotate={6} />
            <div className="borda-picote relative aspect-[3/4] w-full overflow-hidden bg-massa p-3 shadow-[6px_6px_0_rgba(67,48,59,0.12)]">
              <Image
                src="/cookie-hero.jpg"
                alt="Cookie recém-feito, recheio de chocolate derretendo"
                fill
                priority
                sizes="(min-width: 1024px) 24rem, 90vw"
                className="object-cover"
              />
            </div>
            <CarimboReceita
              numero="01"
              className="absolute bottom-3 -left-3 bg-papel sm:-bottom-6 sm:-left-6"
            />
            <NotaAdesiva
              rotate={5}
              className="absolute -right-4 bottom-10 sm:-right-8"
            >
              ainda quentinho
            </NotaAdesiva>
          </div>
        </div>
      </div>
    </section>
  );
}
