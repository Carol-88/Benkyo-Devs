import React from "react";
import Image from "next/image";

function NextCard({ handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="flex justify-center items-center p-5 rounded-xl w-40"
    >
<<<<<<< HEAD
      <Image src={"/img/flecha-correcta.png"} width={100} height={100} alt="Flecha para cambiar de tarjeta" />
=======
      <Image src={"img/flecha-correcta.png"} width={100} height={100} alt="Flecha para cambiar de tarjeta" />
>>>>>>> f85abdc8520397a7d5966615557a3eb56a5de615
    </button>
  );
}

export default NextCard;
