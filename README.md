# seu cookie

Um caderno de receitas de família que virou loja. Landing page + cardápio, construídos em Next.js seguindo as diretrizes de marca em [claude.md](./claude.md).

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura

- `src/app/page.tsx` — landing page (hero, nossa história, receitas em destaque, como levar pra casa)
- `src/app/cardapio/page.tsx` — cardápio completo, por capítulos
- `src/components/` — componentes visuais próprios (fita, carimbo de receita, flor prensada, selo de status)
- `src/lib/site.ts` — dados de contato (WhatsApp/Instagram) e das receitas — **edite aqui para trocar o cardápio real**
- `src/app/globals.css` — tokens de cor (`papel`, `berinjela`, `massa`, `rosa`, `salvia`, `ameixa`) e textura de papel

## Pendências antes de publicar

- [ ] Trocar as fotos placeholder pelas fotos reais dos cookies (`next/image`)
- [ ] Revisar as receitas de exemplo em `src/lib/site.ts` pelo cardápio real
- [ ] Conferir o checklist da seção 10 do `claude.md`
