import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "../ui/hover-card";
import { Button } from "../ui/button";

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
    <header className="flex justify-between shadow bg-[#e6e6e6]  align-middle py-4 px-4 lg:px-10 border border-gray-300">
      <p className="text-2xl font-bold text-gray-700">
        RF<span className=" text-orange-500 font-">Plus</span>
      </p>
      <ul className="flex ">
        <li>
          {" "}
          <Button className="sm:text-base lg:text-lg" variant="link">
            <Link
              style={{
                textDecoration: tabSelected === "Trending" ? "underline" : "",
              }}
              to={"/trending"}
            >
              Trending
            </Link>
          </Button>
        </li>
        <li>
          <Button className="sm:text-base lg:text-lg" variant="link">
            <Link
              style={{
                textDecoration: tabSelected === "Home" ? "underline" : "",
              }}
              to={"/"}
            >
              Home
            </Link>
          </Button>
        </li>
        <li>
          {/* <Link
            style={{
              textDecoration: tabSelected === "Trending" ? "underline" : "",
            }}
            to="https://github.com/modestsp"
          >
            <img src={githubIcon} alt="github" />
          </Link> */}
        </li>
      </ul>
    </header>
  );
};

export default Header;
