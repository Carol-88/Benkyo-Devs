import Head from "next/head";
import Header from '@/components/header/Header';
import Footer from '@/components/footer';

const DEFAULT_SEO = {
  title: 'Benkyo Devs',
  description: 'App de estudio de lenguajes de programacion',
}

/*
  El uso de Layout es una práctica muy común en React
  para evitar repetir importar componentes comunmente usados
  en cada página.

  En este caso el componente Layout se encarga de importar
  el componente Header y Footer, y de renderizarlos en cada
  página donde se use Layout minimizando la cantidad de código.
*/
export default function Layout({ seo = DEFAULT_SEO, children }) {

  const { title, description } = seo;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container-sm mx-auto min-h-screen flex flex-col justify-between">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}