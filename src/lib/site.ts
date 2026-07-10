export const SITE_URL = "https://seucookiebr.com.br";

export const CONTATO = {
  whatsapp: "5584994082236",
  instagram: "sigaseucookie",
  cidade: "Natal",
};

export function linkWhatsapp(mensagem: string) {
  return `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export type Receita = {
  numero: string;
  nome: string;
  ingredientes: string;
  preco: number;
  status?: "saiu do forno" | "esse acabou hoje";
  favorito?: boolean;
};

export const RECEITAS_DESTAQUE: Receita[] = [
  {
    numero: "01",
    nome: "Chocolate da vó",
    ingredientes: "manteiga, chocolate meio amargo, uma pitada de flor de sal",
    preco: 12,
    favorito: true,
  },
  {
    numero: "04",
    nome: "Doce de leite e nozes",
    ingredientes: "doce de leite cremoso, nozes tostadas, canela",
    preco: 13,
  },
  {
    numero: "07",
    nome: "Red velvet de colher",
    ingredientes: "cacau, cream cheese, baunilha",
    preco: 13,
    status: "saiu do forno",
  },
  {
    numero: "09",
    nome: "Amendoim torrado",
    ingredientes: "amendoim moído na hora, açúcar mascavo, toque de sal",
    preco: 11,
    status: "esse acabou hoje",
  },
];

export const CAPITULOS_CARDAPIO: {
  titulo: string;
  receitas: Receita[];
}[] = [
  {
    titulo: "os clássicos",
    receitas: [
      RECEITAS_DESTAQUE[0],
      {
        numero: "02",
        nome: "Baunilha e gotas de chocolate",
        ingredientes: "baunilha bourbon, gotas de chocolate ao leite",
        preco: 10,
      },
      {
        numero: "03",
        nome: "Aveia com passas",
        ingredientes: "aveia em flocos, passas maceradas no rum",
        preco: 10,
      },
    ],
  },
  {
    titulo: "os atrevidos",
    receitas: [
      RECEITAS_DESTAQUE[1],
      RECEITAS_DESTAQUE[2],
      {
        numero: "08",
        nome: "Pimenta e chocolate",
        ingredientes: "chocolate 70%, pimenta biquinho, flor de sal",
        preco: 14,
      },
    ],
  },
  {
    titulo: "os da estação",
    receitas: [
      RECEITAS_DESTAQUE[3],
      {
        numero: "10",
        nome: "Coco queimado",
        ingredientes: "coco fresco tostado, leite condensado",
        preco: 12,
      },
    ],
  },
];
