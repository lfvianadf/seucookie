import { renderOgImage, OG_SIZE } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "o cardápio — seu cookie";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("o cardápio.", "o caderno inteiro, aberto — receita por receita.");
}
