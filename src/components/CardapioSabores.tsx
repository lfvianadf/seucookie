import { FotoReceita } from "./FotoReceita";
import { SeletorQuantidadeSabor } from "./SeletorQuantidadeSabor";
import { adesivoDoSabor } from "@/lib/adesivos";
import { formatarPreco, type Receita } from "@/lib/site";

export function CardapioSabores({ sabores }: { sabores: Receita[] }) {
  return (
    <ul className="grade-sabores">
      {sabores.map((sabor) => {
        const adesivo = adesivoDoSabor(sabor.nome);
        return (
          <li className="receita" key={sabor.produtoId ?? sabor.nome}>
            <div className="receita-arte">
              {adesivo ? (
                <FotoReceita src={adesivo} nome={`Adesivo de ${sabor.nome}`} arte sizes="(min-width: 701px) 145px, 84px" />
              ) : (
                <span className="monograma" aria-hidden="true">{sabor.nome.slice(0, 1)}</span>
              )}
              {sabor.numero !== "—" && <span className="receita-numero">nº {sabor.numero}</span>}
            </div>
            <div className="receita-texto">
              <h3>{sabor.nome}</h3>
              {sabor.status && <strong className="block text-sm">{sabor.status}</strong>}
              <p>{sabor.ingredientes}{sabor.peso && ` · ${sabor.peso}`}</p>
              <div className="receita-compra">
                <strong>{formatarPreco(sabor.preco)}</strong>
                <SeletorQuantidadeSabor sabor={sabor} />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
