import styles from "../../styles/Layout.module.css";
import { Link, useLocation } from "react-router-dom";
import githubIcon from "../../assets/githubIcon.svg";
import { useEffect, useState } from "react";

const Header = () => {
  const [tabSelected, setTabSelected] = useState<string | null>(null);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setTabSelected("Home");
    } else if (location.pathname === "/trending") {
      setTabSelected("Trending");
    }
  });
  console.log(location.pathname);
  return (
    <header className={styles.header}>
      <p className={styles.logo}>
        RF<span>Plus</span>
      </p>
      <ul>
        <li>
          <Link className={styles.link} to={"/trending"}>
            Trending
          </Link>
        </li>
        <li>
          <Link
            style={{
              textDecoration: tabSelected === "Home" ? "underline" : "",
            }}
            className={styles.link}
            to={"/"}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            style={{
              textDecoration: tabSelected === "Trending" ? "underline" : "",
            }}
            to="https://github.com/modestsp"
          >
            <img src={githubIcon} alt="github" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
