type CarimboReceitaProps = {
  numero: string;
  className?: string;
};

/** Número de receita em círculo carimbado, como no canto de uma página de caderno. */
export function CarimboReceita({ numero, className = "" }: CarimboReceitaProps) {
  return (
    <div
      className={`inline-flex h-14 w-14 shrink-0 -rotate-6 items-center justify-center rounded-full border-2 border-berinjela/70 font-titulo text-sm text-berinjela ${className}`}
      style={{ borderStyle: "double" }}
    >
      <span className="-rotate-0">
        nº
        <br />
        {numero}
      </span>
    </div>
  );
}
