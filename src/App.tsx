import { useEffect, useState } from "react";
// import  from "./styles/App.module.css";
import RecipeCard from "./components/RecipeCard";
import { motion } from "framer-motion";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { GrFormClose } from "react-icons/gr";

function App() {
  const [current, setCurrent] = useState<string>("");
  const [params, setParams] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [inputError, setInputError] = useState<string>(" ");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAddParam = () => {
    if (current.length === 0) {
      setInputError("Cannot add empty ingredient");
      setTimeout(() => {
        setInputError("");
      }, 3000);
      return;
    }

    setParams([...params, current]);
    setCurrent("");
  };

  const handleSubmit = async () => {
    if (params.length === 0) {
      setInputError("Please enter at least one ingredient");
      setTimeout(() => {
        setInputError("");
      }, 3000);

      return;
    }
    const paramsToSearch = params.join(",");
    const result = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${paramsToSearch}&number=2&apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const recipes = await result.json();
    if (recipes.length == 0) {
      setErrorMsg("No recipes found");
      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
    } else setErrorMsg(null);
    setRecipes(recipes);

    console.log(
      `${import.meta.env.VITE_INGREDIENTS_ROUTE}${params}&number=2&apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    console.log(recipes);
  };

  return (
    <div className="flex p-4 flex-col items-center ">
      <h1 className="text-3xl font-bold">
        Recipe Finder <span>Plus</span>
      </h1>
      <h3>Welcome to the recipe finder</h3>
      <p>
        🍽️Embrace your inner chef! Let's find delicious recipes for your
        ingredients.🔎
      </p>
      <div className="flex items-center gap-4 mt-4">
        {/* <input
          name="word"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          type="text"
          placeholder="Add an ingredient"
        /> */}
        <Input
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          type="text"
          placeholder="Add an ingredient"
        />
        <button
          className="rounded-lg text-2xl text-green-800 "
          onClick={handleAddParam}
        >
          +
        </button>
      </div>
      <ul className="flex gap-4 mt-4 mb-2">
        {params.map((param, index) => {
          return (
            <li
              className="flex items-center bg-lime-300 p-1  gap-1 border border-gray-500 rounded-sm hover:bg-lime-200 cursor-pointer "
              key={index}
              onClick={() => setParams(params.filter((w) => w !== param))}
            >
              <GrFormClose />
              <p className="text-sm font-semibold ">{param}</p>
            </li>
          );
        })}
      </ul>
      <h3>{inputError}</h3>
      {/* <motion.button whileTap={{ scale: 0.97 }} onClick={handleSubmit}>
        Search
      </motion.button> */}
      <Button onClick={handleSubmit} variant="search">
        Search
      </Button>
      <div className="mt-4">
        {errorMsg && <p>{errorMsg}</p>}
        {recipes.map((recipe) => {
          return <RecipeCard recipe={recipe} key={recipe.id} />;
        })}
      </div>
    </div>
  );
}

export default App;
