import React from "react";
import Image from "next/image";

function NextCard({ handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="flex justify-center items-center p-5 rounded-xl w-40"
    >
      <Image src={"/img/flecha-correcta.png"} width={100} height={100} alt="Flecha para cambiar de tarjeta" />
    </button>
  );
}

export default NextCard;
