import Image from "next/image";

type FotoReceitaProps = {
  className?: string;
  sizes?: string;
};

/** Thumbnail de receita, com borda tracejada de caderno. Foto real única por ora — trocar por foto de cada receita quando houver. */
export function FotoReceita({ className = "", sizes = "4rem" }: FotoReceitaProps) {
  return (
    <div
      className={`borda-picote relative aspect-square w-16 shrink-0 overflow-hidden bg-massa ${className}`}
    >
      <Image
        src="/cookie-hero.jpg"
        alt=""
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
