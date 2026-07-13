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
        d="M8 13h16l-1 12.3a2 2 0 0 1-2 1.7H11a2 2 0 0 1-2-1.7L8 13Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 13c0-3.6 1.6-6 3.5-6s3.5 2.4 3.5 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M13 17.5v6M19 17.5v6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
