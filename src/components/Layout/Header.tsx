import styles from "../../styles/Layout.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <p>LOGO</p>
      <ul>
        <li>
          <Link to={"/trending"}>Trending</Link>
        </li>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>Git</li>
      </ul>
    </header>
  );
};

export default Header;
