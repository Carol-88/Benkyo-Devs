import React from 'react';
import { useState} from "react";
import ErrorComponent from "./ErrorComponent";
import AnswerColorEffect from './AnswerColorEffect';

// Función que evalua si la respuesta es correcta y cambia el color de las opciones durante dos segundos

const CardEval = ({ data }) => {
  const { opcion, id, pregunta, opciones, respuesta } = data;
  const [evaluated, setEvaluated] = useState(false);

  if (!opcion || !respuesta) {
    return <ErrorComponent />;
  }

  return (
    <div key={id} className="flex items-center justify-center">
      <section className="flex flex-col items-center justify-center bg-sky-100 rounded-lg mb-5 mt-5 shadow-xl w-auto h-72 pt-3">
        <p className="mb-5 mx-4">{pregunta}</p>
        <form className="flex">
          <AnswerColorEffect
            opcion={opciones[0]}
            respuesta={respuesta}
            evaluated={evaluated}
            setEvaluated={setEvaluated}
          />
          <AnswerColorEffect
            opcion={opciones[1]}
            respuesta={respuesta}
            evaluated={evaluated}
            setEvaluated={setEvaluated}
          />
        </form>
      </section>
    </div>
  );
};









  


export default CardEval;