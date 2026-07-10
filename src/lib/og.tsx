import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export async function renderOgImage(titulo: string, subtitulo: string) {
  const epoche = await readFile(join(process.cwd(), "public/epoche.otf"));

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#43303B",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 30,
            color: "#C86B85",
            fontFamily: "Epoche",
          }}
        >
          nº receitas — seu cookie
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 96,
            lineHeight: 1.05,
            color: "#FDF6EC",
            fontFamily: "Epoche",
          }}
        >
          {titulo}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 34,
            color: "#F3E5D3",
            maxWidth: 900,
          }}
        >
          {subtitulo}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Epoche", data: epoche, style: "normal", weight: 400 },
      ],
    },
  );
}
