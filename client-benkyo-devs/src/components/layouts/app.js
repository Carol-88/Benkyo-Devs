import Head from "next/head";
import Header from '@/components/header/Header';

/*
  El uso de Layout es una práctica muy común en React
  para evitar repetir importar componentes comunmente usados
  en cada página.

  En este caso el componente Layout se encarga de importar
  el componente Header y Footer, y de renderizarlos en cada
  página donde se use Layout minimizando la cantidad de código.
*/
export default function Layout({ title = '', children }) {
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
      <>
        <Header />
        {children}
        <footer>//footer</footer>
      </>
    </>
  );
}