import styles from "./card.module.css";
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Card() {
  const router = useRouter();


  const [questionActual, setQuestionActual] = useState(0);
  const [answerActual, setAnswerActual] = useState (0);
  const [correctans, setCorrectans] = useState(false);
  const [finishedLvl, setFinishedLvl] = useState(false);

  function handleAnswwerSubmit(){
    //añadir estilos de preguntas (añadir pregunta y cual es la correcta)
    e.target.classList.add(correct ? "corrects" : "incorrects");
    //cambiar a la siguiente pregunta

    setTimeout(() => {
      if (questionActual === questions.length - 1) {
        setFinishedLvl(true);
      } else {
        setQuestionActual(questionActual + 1);
      }
    }, 2000);
  }


  // if(finishedLvl) return (
  //   <main className="card">
  //     <div className="game.finished">
  //       <span></span>
  //       <button onClick={() => (window.location.href = "/")}>Volver a jugar</button>
  //     </div>
  //   </main>
  // )
  if (finishedLvl) {
    return (
      <>
        <Head>
          <title>Juego terminado</title>
        </Head>
        <main className={styles.card}>
          <div className={styles.gameFinished}>
            <span></span>
            <button onClick={() => router.push("/")}>Volver a jugar</button>
          </div>
        </main>
      </>
    );
  }


  return (
    <>
      <Head>
        <title>Preguntas y respuestas</title>
      </Head>
      <main className={styles.card}>
        <article>
          <section className={styles.titleQuestion}>
            <span>{questions.[questionActual].question}</span>
          </section>

          <section className={styles.answerQuestion}>
            {questions[questionActual].answers.map((respuesta) => (
              <button key={answers.correct} onClick={() => handleAnswerSubmit()}>
                {answers.correct}
              </button>
            ))}
          </section>

          <section className={styles.answerQuestion2}>
            {questions[questionActual].answers.map((respuesta) => (
              <button key={answers.correct} onClick={() => handleAnswerSubmit()}>
                {answers.correct}
              </button>
            ))}
          </section>

          <section className={styles.difficultyLevel}>
            <h2>Dificultad</h2>
            <li>Baja</li>
            <li>Media</li>
            <li>Alta</li>
          </section>

          <section className={styles.favoriteAnswer}>
            Añadir pregunta a favoritos
          </section>
        </article>
      </main>
    </>
  );
}
