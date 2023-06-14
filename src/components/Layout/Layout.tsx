import Footer from "./Footer";
import Header from "./Header";
import styles from "../../styles/Layout.module.css";

interface ILayout {
  children: JSX.Element;
}

const Layout = ({ children }: ILayout): JSX.Element => {
  return (
    <div className={styles.app}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
