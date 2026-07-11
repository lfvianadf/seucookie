type IconeCestaProps = {
  className?: string;
};

/** Cestinha desenhada à mão — ícone funcional do carrinho, não é de biblioteca. */
export function IconeCesta({ className = "" }: IconeCestaProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 32 32"
      className={className}
      fill="none"
    >
      <path
        d="M5 12h22l-2.4 13.5a2 2 0 0 1-2 1.6H9.4a2 2 0 0 1-2-1.6L5 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M11 12c0-4 2.2-6.5 5-6.5s5 2.5 5 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M12 16.5v6M20 16.5v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
