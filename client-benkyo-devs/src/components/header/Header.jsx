/*
  Recomendación
  Al crear componentes es una buena práctica si el componente es el principal dentro de una carpeta
  dejarlo con el nombre index.jsx, esto para que cuando se importe el componente no sea necesario
  escribir el nombre del archivo, solo la carpeta.
  en este ejemplo esto ./difficult en los mismo que ./difficult/index

  el uso de alias es una buena práctica para evitar escribir rutas largas y relativas
  esto @/components/header/difficult es lo mismo que ./difficult
*/
import Difficult from "@/components/header/difficult";
import UserInfo from "./user/user-info";

const Header = () => {
  return (
    <header className="flex flex-row flex-wrap justify-around">
      <UserInfo />
      <Difficult />
    </header>
  );
};

export default Header;
