import styles from "../../styles/Layout.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <p>LOGO</p>
      <ul>
        <li>Trending</li>
        <li>Home</li>
        <li>Git</li>
      </ul>
    </header>
  );
};

export default Header;
