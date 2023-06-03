import { useState } from "react";
import CardCopi from "carol-88/components/card/CardCopi";
import NextCard from "carol-88/components/card/button-next-card/next-card";
import datos from "../../../mocks/questions.json";

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
    <div className="flex flex-col items-center justify-content">
      <CardCopi data={data} />
      <NextCard handleClick={handleNextCard} />
    </div>
  );
};

export default Card;
