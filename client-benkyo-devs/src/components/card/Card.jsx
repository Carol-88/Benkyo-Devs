<<<<<<< HEAD
import { useState } from "react";
import CardEval from "./CardEval";
import datos from "../../../mocks/questions.json";
import NextCard from "./button-next-card/next-card";

// Función que muestra la card obteniendo los datos de CardEval, y el botón de next card
=======
import { useState, useEffect } from "react";
import CardCopi from "@/components/card/CardCopi";
import datos from "../../../mocks/questions.json";
import NextCard from "./button-next-card/next-card";

// Función que muestra la card obteniendo los datos de CardCopi, y el botón de next card
>>>>>>> f85abdc8520397a7d5966615557a3eb56a5de615
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

<<<<<<< HEAD


export default Card;
=======
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
>>>>>>> f85abdc8520397a7d5966615557a3eb56a5de615
