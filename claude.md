# Seu Cookie — Diretrizes de Marca e Site

> Documento de handoff para desenvolvimento no Claude Code.
> Contém a filosofia da marca, o sistema visual completo e a direção de site/experiência.
> **Leia a seção "O que evitar" antes de escrever qualquer linha de código.** Ela é o coração deste doc.

---

## 1. A marca em uma frase

**Seu Cookie é um caderno de receitas de família que virou loja.**

Não é uma "cookie shop" gourmet, não é fast-food doce, não é confeitaria fina. É o afeto de uma receita anotada à mão, feita hoje de manhã, pensando em quem vai comer. Cada cookie é uma receita numerada de um caderno que nunca acaba.

Tudo — cor, texto, foto, layout, microcópia — deve reforçar essa sensação: **caseiro, afetivo, honesto, feito à mão.**

---

## 2. Conceito central: o caderno de receitas

Este é o fio condutor de toda a identidade. Use-o literalmente:

- Cada produto é uma **"receita nº XX"** (receita nº 01, nº 02...). Vira coleção, facilita lançamentos ("chegou a receita nº 12"), cria senso de continuidade.
- A marca **escreve à mão** no caderno. A voz é em primeira pessoa, carinhosa: "anotei essa pensando em você", "essa daqui acaba rápido".
- Grafismos vêm do universo do caderno: **borda tracejada** (picote/costura), **fita adesiva** nos cantos de fotos, **anotações manuscritas** por cima, **flor prensada** como ornamento secundário, número de receita em círculo carimbado.

---

## 3. Paleta de cores

Nomes fazem parte da identidade — use-os nos comentários do código e nos tokens.

| Token            | Hex       | Nome            | Uso |
|------------------|-----------|-----------------|-----|
| `--berinjela`    | `#43303B` | Berinjela       | Texto principal, rodapé, fundos escuros |
| `--papel`        | `#FDF6EC` | Papel envelhecido | Fundo padrão de toda a página |
| `--massa`        | `#F3E5D3` | Massa amanteigada | Cards, superfícies elevadas, seções alternadas |
| `--rosa`         | `#C86B85` | Rosa antigo     | **Só CTA, preços e destaques de ação** |
| `--salvia`       | `#7D9B76` | Sálvia          | Selos de status ("saiu do forno", "disponível") |
| `--ameixa`       | `#6E5A64` | Ameixa suave    | Texto secundário, legendas |

### Regras de cor (invioláveis)
1. **Nunca** use branco puro (`#FFF`) nem preto puro (`#000`). Sempre papel e berinjela.
2. **Rosa antigo é a cor de ação.** Se aparecer fora de CTA/preço, perde a força. Um botão rosa por tela.
3. **Sálvia = "status bom":** pronto, disponível, feito hoje. Nunca use sálvia para ação.
4. Fundos alternam entre papel (`--papel`) e massa (`--massa`) para separar seções — nunca linhas divisórias duras.

---

## 4. Tipografia

| Família        | Fonte (Google Fonts) | Uso |
|----------------|----------------------|-----|
| Título / logo  | **Fraunces** (opsz baixo, soft) | Logo (sempre minúsculas: "seu cookie"), títulos de seção, nome dos produtos |
| Corpo          | **Nunito Sans** (400 / 700) | Textos, botões, cardápio, tudo funcional. Redonda como o cookie |
| Manuscrita     | **Caveat** | Só notas curtas: "o favorito da casa", dedicatórias, preço antigo riscado. **Máximo uma por seção** |

### Regras de tipografia
1. Logo **sempre em minúsculas**. Reforça a intimidade.
2. Caveat com moderação absoluta. Manuscrita demais vira bagunça, não charme.
3. Fraunces nunca em caixa alta. É uma serifada calorosa, não um letreiro.

---

## 5. Voz e microcópia

Escreva como quem anota no caderno, não como quem vende.

| Situação          | ❌ Comum / IA            | ✅ Seu Cookie |
|-------------------|-------------------------|---------------|
| CTA principal     | "Compre agora"          | "Peça o seu" |
| Produto esgotado  | "Indisponível"          | "Esse acabou hoje" |
| Novidade          | "Novo!"                 | "Saiu do forno" |
| Sobre nós         | "Nossa missão é..."     | "Tudo começou com uma receita da..." |
| Frete/retirada    | "Opções de entrega"     | "Como levar pra casa" |

Princípios: primeira pessoa, afeto real, zero tom corporativo, zero "gourmetês". Preço é honesto e direto, sem firula.

---

## 6. O que evitar — anti-padrões de "site feito por IA"

**Esta é a seção mais importante do documento.** O objetivo é fugir do template genérico que todo gerador cospe. Se o site cair em qualquer um destes, refaça:

### Layout
- ❌ Hero centralizado com título gigante + subtítulo + dois botões lado a lado.
  ✅ Layout **assimétrico e editorial** — como uma página de caderno. Texto à esquerda desalinhado, foto "colada" com fita torta, número de receita no canto.
- ❌ Três "feature cards" idênticos em grid (ícone + título + parágrafo).
  ✅ Se precisar listar diferenciais, faça como **itens escritos à mão numa lista de ingredientes**, não cards.
- ❌ Seções empilhadas todas com o mesmo padding, tudo centralizado, tudo simétrico.
  ✅ Ritmo irregular proposital. Uma seção respira mais, outra é apertada. Rotações sutis (−2°, 1°) em fotos e selos.

### Visual
- ❌ Gradiente roxo→azul, glassmorphism, sombras difusas grandes, cantos ultra-arredondados em tudo.
  ✅ Superfícies **flat e quentes**. Sombra só quando simula papel sobreposto. Cantos suaves, não pílulas.
- ❌ Ícones de biblioteca genérica (Feather/Lucide) espalhados como enfeite.
  ✅ Grafismos próprios do universo caderno: picote, fita, carimbo, flor prensada. Ícone só se for funcional.
- ❌ Emoji na interface.
  ✅ Nunca. O charme vem da tipografia e da textura, não de 🍪.
- ❌ Fundo branco liso.
  ✅ Papel envelhecido com **textura sutil** (grão de papel bem leve, quase imperceptível).

### Conteúdo
- ❌ Depoimentos falsos "Maria S. ⭐⭐⭐⭐⭐ Melhor cookie que já comi!".
  ✅ Se houver prova social, que seja real — print de WhatsApp de cliente de verdade, com a estética de mensagem mesmo.
- ❌ Números inventados ("+1000 cookies vendidos", "98% de satisfação").
  ✅ Honestidade. Se é começo, o charme é ser começo: "feito em casa, em Natal, desde 2026".

---

## 7. Estrutura da landing page

Ordem sugerida das seções. A execução visual segue a seção 6 (nada de simetria de template).

1. **Topo / hero** — logo "seu cookie" + a foto que define a categoria: cookie partido ao meio, recheio derretendo, luz quente. Anotação manuscrita sobreposta. CTA "Peça o seu" (rosa).
2. **Nossa história** — o texto que nenhum concorrente pode copiar. A receita/origem real por trás do nome. Estética de página de caderno.
3. **As receitas (cardápio resumido)** — 3 a 4 cookies em destaque, cada um como "receita nº XX". Não é o cardápio completo, é o aperitivo.
4. **Como levar pra casa** — retirada / entrega / encomenda. Honesto e direto.
5. **Prova social real** (opcional) — prints de WhatsApp de clientes reais, se houver.
6. **Rodapé** — WhatsApp, Instagram, localização. Berinjela de fundo.

### Ações
- Todo CTA de compra leva ao **WhatsApp** com mensagem pré-preenchida (`https://wa.me/55DDDNUMERO?text=...`).
- Sem carrinho, sem checkout nesta fase. Pedido é conversa.

---

## 8. Cardápio (fase 2)

Página separada, mesma identidade. Diretrizes:

- Cada item é uma **ficha de receita**: número, nome em Fraunces, "lista de ingredientes" curta como descrição, preço em rosa.
- Faixa de preço: **R$ 9 a R$ 14** (intermediário, artesanal).
- Agrupar por "capítulos do caderno" em vez de categorias frias ("os clássicos", "os atrevidos", "os da estação").
- Item favorito recebe nota manuscrita em Caveat: "o preferido da casa".
- Selo sálvia "saiu do forno" para novidades; "esse acabou hoje" para esgotados (não esconda o item — mostra que é feito de verdade e acaba).

---

## 9. Stack sugerida (para o Claude Code)

Alinhada ao seu ambiente:

- **Next.js** (App Router) + **TypeScript**
- **Tailwind** com os tokens da seção 3 no `tailwind.config` (use os nomes: `papel`, `berinjela`, `rosa`, `salvia`, `massa`, `ameixa`)
- Fontes via `next/font/google`: Fraunces, Nunito Sans, Caveat
- Textura de papel: SVG/PNG bem sutil em `background`, baixa opacidade
- Sem libs de UI pesadas — a identidade é artesanal, componentes são próprios
- Imagens otimizadas com `next/image`
- Deploy Vercel, custo zero na fase inicial

---

## 10. Checklist final antes de publicar

- [ ] Nenhum branco puro nem preto puro no CSS
- [ ] Um único botão rosa por tela (é a cor de ação)
- [ ] Zero emoji na interface
- [ ] Layout assimétrico — nada de hero centralizado + 3 cards
- [ ] Logo em minúsculas em todo lugar
- [ ] Caveat no máximo uma vez por seção
- [ ] Textura de papel no fundo (sutil)
- [ ] CTAs levam ao WhatsApp com texto pré-preenchido
- [ ] Nenhum depoimento ou número inventado
- [ ] A seção "nossa história" conta algo real
- [ ] Passou no teste: "isso parece feito por uma pessoa que ama o que faz, ou por um gerador?"
