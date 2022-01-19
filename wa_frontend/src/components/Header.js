import "./Header.css";
import NightsStayIcon from "@material-ui/icons/NightsStay";

const Header = () => {
  return (
    <header className="header-style">
      <div>
        Merry Weather
        <NightsStayIcon className="icon" />
      </div>
    </header>
  );
};

export default Header;
