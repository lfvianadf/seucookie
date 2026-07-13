import { renderOgImage, OG_SIZE } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "seu cookie — um caderno de receitas que virou loja";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("seu cookie.", "um caderno de receitas que virou loja.");
}
