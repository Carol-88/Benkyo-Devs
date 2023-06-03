import Head from "next/head";
import Header from "../components/header/Header";
import Card from "carol-88/components/card/Card";
//import NextCard from "carol-88/components/card/button-next-card/next-card";
// import Start from "../components/perfil/StartButton";

export default function Home() {
  return (
    <>
      <Head>
        <title>Benkyo Devs</title>
        <meta
          name="description"
          content="App de estudio de lenguajes de programacion"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Card />
      </main>
      <footer>//footer</footer>
    </>
  );
}
