import { useState } from "react";
import CardEval from "./CardEval";
import datos from "../../../mocks/questions.json";
import NextCard from "./button-next-card/next-card";

// Función que muestra la card obteniendo los datos de CardEval, y el botón de next card
const Card = () => {
  const [indexCardCurrent, setIndexCardCurrent] = useState(0);
  const data = datos.faciles[indexCardCurrent];

  const handleNextCard = () => {
    const nextIndexCard = indexCardCurrent + 1;

    if (nextIndexCard >= datos.faciles.length) {
      alert("No hay más preguntas");
      return;
    }

    setIndexCardCurrent(nextIndexCard);
  };

  if (!data) return <p>Cargando...</p>;

  return (
    <div className="flex flex-col items-center justify-content p-20">
      <CardEval data={data} />
      <NextCard handleClick={handleNextCard} />
    </div>
  );
};



export default Card;
