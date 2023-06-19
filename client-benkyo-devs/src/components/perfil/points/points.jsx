import React from 'react'
import Image from "next/image"
import { TiArrowRight } from "react-icons/ti";


function Points() {
// Hardcode, hay que implementar la logica

        const user = {
        points: {
          easy: 101,
          medium: 102,
          hard: 103
        },
        logos: {
            facil: '/img/DificultadFacil.png',
            media: '/img/DificultadMedia.png',
            dificil: '/img/DificultadDificil.png'
        }
      }
    const { points, logos } = user
    const { easy, medium, hard } = points
    const { facil, media, dificil } = logos


  return (
    <div className='p-5'>
          <h3 className='font-bold'>Puntuación por nivel</h3>
          <ul className='p-5'>
            <li className='flex items-center border inner-shadow p-3 w-44 m-3'><Image src={facil} width={50} height={50}/> <TiArrowRight/>  {easy}</li>
            <li className='flex items-center border inner-shadow p-3 w-44 m-3'><Image src={media} width={50} height={50}/> <TiArrowRight/>  {medium}</li>
            <li className='flex items-center border inner-shadow p-3 w-44 m-3'><Image src={dificil} width={50} height={50}/> <TiArrowRight/>  {hard}</li>
          </ul>
          
      </div>
  )
}

export default Points