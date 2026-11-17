const arquivos: Record<string, string> = {
  nutella: "nutella", churros: "churros", "kinder bueno": "kinder-bueno",
  "red cheese": "red-cheese", ovomaltine: "ovomaltine", coopie: "coopie",
  petiscookie: "petiscookie", "petis cookie": "petiscookie",
  "duplo maltine": "duplo-maltine", "laka oreo": "laka-oreo",
};

export function adesivoDoSabor(nome: string) {
  const arquivo = arquivos[nome.trim().toLowerCase()];
  return arquivo ? `/marca/${arquivo}.webp` : undefined;
}
