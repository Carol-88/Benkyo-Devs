import Image from "next/image"
import { useState } from "react";

/*
  Recomendación
  Es una buena prácticar cuando se repite el uso de algún componente, crear un array de objetos
  con los datos que se van a utilizar, en este caso, los datos de las dificultades
*/
const DIFICULTS = [
  {
    id: 1,
    name: "Fácil",
    img: "/img/DificultadFacil.png",
  },
  {
    id: 2,
    name: "Media",
    img: "/img/DificultadMedia.png",
  },
  {
    id: 3,
    name: "Difícil",
    img: "/img/DificultadDificil.png",
  },
];

const Difficult = () => {
  // Falta implementar que al seleccionar la dificultad, las cards que aparezcan sean de esa dificultad

  const [dificultIdSelected, setDificultIdSelected] = useState(DIFICULTS[0].id)

  /*
    Explicación
    Esta es una forma resumida de hacer eso:
    
    const handleDificultIdSelected = (id) => {
      setDificultIdSelected(id)
    }
  */
  const handleDificultIdSelected = (id) => setDificultIdSelected(id)

  return (
    <section className="flex gap-3">
      {DIFICULTS.map((dificult) => {

        /*
          Explicación
          Esta es una forma de extraer los datos de un objeto
          para no usarlos asi: dificult.id, dificult.name, dificult.img
        */
        const { id, name, img } = dificult;

        /*
          Explicación
          Esta es una forma resumida de hacer eso:
          if (dificultIdSelected === id) {
            opacity = "opacity-100"
          } else {
            opacity = "opacity-50"
          }
        */
        const opacity = dificultIdSelected === id ? "opacity-100" : "opacity-50"
        const grayScale = dificultIdSelected === id ? "grayscale-0" : "grayscale"

        return (
          <div
            key={id}
            className={`
              hover:opacity-100
              transition-all duration-500 ease-in-out
              flex flex-col items-center justify-center 
              cursor-pointer ${grayScale} ${opacity}
            `}
            onClick={() => handleDificultIdSelected(id)}
          >
            <Image src={img} alt={name} width={50} height={50} />
            <p className="text-xs">{name}</p>
          </div>
        );
      })}
    </section>
  );
};

export default Difficult;