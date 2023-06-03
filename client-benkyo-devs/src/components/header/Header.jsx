import Difficult from "./difficult/Difficult";
import UserInfo from "./user/user-info";
const Header = () => {
  return (
    <header
      className="
      flex
      flex-row
      flex-wrap
      justify-around
      items-center
      w-full
      border-b-2
      border-gray-200
    "
    >
      <UserInfo />
      <Difficult />
    </header>
  );
};

export default Header;
