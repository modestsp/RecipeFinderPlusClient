import styles from "../../styles/Layout.module.css";
import githubIcon from "../../assets/githubIcon.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to="https://github.com/modestsp">
        <img src={githubIcon} alt="github" />
      </Link>
      <span>Sebastián Perichón © 2023</span>
    </footer>
  );
};

export default Footer;
