import githubIcon from "../../assets/githubIcon.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex gap-4 font-semibold mt-auto bg-lime-200 shadow justify-center items-center p-4 border-t-2 border-gray-400">
      <Link to="https://github.com/modestsp">
        <img src={githubIcon} alt="github" />
      </Link>
      <span>Sebastián Perichón © 2023</span>
    </footer>
  );
};

export default Footer;
