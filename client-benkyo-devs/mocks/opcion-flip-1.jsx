import { useState } from "react";

const Card = ({ dato }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <section>
      <h1>{dato.id}</h1>
      <p>{dato.pregunta}</p>
      <p>{dato.opciones[1]}</p>
      <p>{dato.opciones[0]}</p>

      <div
        className={`card ${isFlipped ? "flipped" : ""}`}
        onClick={handleClick}
      >
        <div className="front">Front Content</div>
        <div className="back">Back Content</div>
      </div>

      <button>siguiente Card</button>
    </section>
  );
};

export default Card;
