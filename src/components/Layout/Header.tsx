import styles from "../../styles/Layout.module.css";
import { Link } from "react-router-dom";
import githubIcon from "../../assets/githubIcon.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <p className={styles.logo}>LOGO</p>
      <ul>
        <li>
          <Link className={styles.link} to={"/trending"}>
            Trending
          </Link>
        </li>
        <li>
          <Link className={styles.link} to={"/"}>
            Home
          </Link>
        </li>
        <li>
          <Link to="https://github.com/modestsp">
            <img src={githubIcon} alt="github" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
