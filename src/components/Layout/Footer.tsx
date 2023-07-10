import githubIcon from "../../assets/githubIcon.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex gap-4 font-semibold mt-auto shadow justify-center items-center p-4 border bg-[#e6e6e6]  border-gray-300 ">
      <Link to="https://github.com/modestsp/RecipeFinderPlusClient">
        <img src={githubIcon} alt="github" />
      </Link>
      <span>Sebastián Perichón © 2023</span>
    </footer>
  );
};

export default Footer;
