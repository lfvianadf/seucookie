import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-papel px-6 py-3 shadow-[0_1px_0_rgba(67,48,59,0.1)] sm:px-10">
      <Link href="/" className="-my-2 block">
        <Image
          src="/logo.png"
          alt="seu cookie"
          width={800}
          height={800}
          priority
          className="h-20 w-20 object-contain sm:h-24 sm:w-24"
        />
      </Link>
      <Link
        href="/cardapio"
        className="-my-3 inline-block py-3 font-corpo text-sm font-bold text-berinjela underline decoration-rosa decoration-2 underline-offset-4"
      >
        o cardápio
      </Link>
    </header>
  );
}
