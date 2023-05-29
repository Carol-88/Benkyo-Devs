import React from "react";

const StartButton = () => (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        JavaScript
      </button>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <img src="img/DificultadBaja.png" alt="Fácil" />
      <img src="img/DificultaMedia.png" alt="Medio" />
      <img src="img/DificultadDificil.png" alt="Difícil" />
    </div>
  </div>
);

export default StartButton;
