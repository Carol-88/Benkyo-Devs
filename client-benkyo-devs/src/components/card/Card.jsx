import { useState, useEffect } from "react";
import CardCopi from "@/components/card/CardCopi";
import datos from "../../../mocks/questions.json";
import NextCard from "./button-next-card/next-card";

// Función que muestra la card obteniendo los datos de CardCopi, y el botón de next card
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
      <CardCopi data={data} />
      <NextCard handleClick={handleNextCard} />
    </div>
  );
};

//Función de animación que se produce despues del cambio de colores
const FlipCard = ({ data }) => {
  const [flip, setFlip] = useState(false);
  const { reverso } = data;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlip(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`card ${flip ? 'card-flipped' : ''}`}
      onClick={() => {
        setFlip(!flip);
      }}
    >
      {flip ? (
        // Back content card
        <div>
          <p>{reverso}</p>
        </div>
      ) : (
        // Front content card
        <CardCopi data={data} />
      )}
    </div>
  );
};

export { Card, FlipCard };
