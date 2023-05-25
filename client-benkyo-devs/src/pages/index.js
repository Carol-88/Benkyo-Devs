import Card from "carol-88/components/card/Card";
import Layout from "carol-88/components/layouts/app";

const SEO = {
  title: "Benkyo Devs - Game",
  description: "Juego para estudiar lenguajes de programacion",
};

export default function Home() {
  return (
    <Layout seo={SEO}>
      <main>
        <Card />
      </main>
    </Layout>
  );
}
