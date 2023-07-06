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
    <header className="flex justify-between shadow bg-[#e6e6e6]  align-middle py-4 px-2 border border-gray-300">
      <p>
        RF<span>Plus</span>
      </p>
      <ul className="flex gap-4">
        <li>
          <Link to={"/trending"}>Trending</Link>
        </li>
        <li>
          <Link
            style={{
              textDecoration: tabSelected === "Home" ? "underline" : "",
            }}
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
