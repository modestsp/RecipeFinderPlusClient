import Footer from "./Footer";
import Header from "./Header";

interface ILayout {
  children: JSX.Element;
}

const Layout = ({ children }: ILayout): JSX.Element => {
  return (
    <div className="flex bg-[#e6e6e6] flex-col min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
