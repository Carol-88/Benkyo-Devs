import { useState } from "react";

const ReverseCard = ({ text }) => {
  const [reversed, setReversed] = useState(false);

  const handleReverse = () => {
    setReversed(!reversed);
  };

  return (
    <div className={`card ${reversed ? "reversed" : ""}`}>
      <p>{text}</p>
      <button onClick={handleReverse}>Respuesta</button>
    </div>
  );
};

export default ReverseCard;
