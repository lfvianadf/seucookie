type IconeMenuProps = {
  aberto?: boolean;
  className?: string;
};

/** Três traços à mão livre — ícone funcional do menu, não é de biblioteca. */
export function IconeMenu({ aberto = false, className = "" }: IconeMenuProps) {
  if (aberto) {
    return (
      <svg aria-hidden viewBox="0 0 32 32" className={className} fill="none">
        <path
          d="M8 8l16 16M24 8 8 24"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className} fill="none">
      <path
        d="M6 10.5c5-1 15-1 20 0M6 16h20M6 21.5c6 1 14 1 20 0"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
