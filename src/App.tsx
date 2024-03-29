import { useState } from "react";
// import  from "./styles/App.module.css";
import RecipeCard from "./components/RecipeCard";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { GrFormClose } from "react-icons/gr";
import { PlusIcon } from "lucide-react";

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
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${paramsToSearch}&number=4&apiKey=${
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
  };

  return (
    <div className="flex p-4 flex-col items-center ">
      <h1 className="lg:text-4xl text-3xl font-bold mb-2">
        Recipe Finder <span className=" text-orange-500">Plus</span>
      </h1>
      {/* <h3>Welcome to the recipe finder</h3> */}
      <p className="text-base font-semibold mt-4">
        🍽️Embrace your inner chef! Let's find delicious recipes for your
        ingredients.🔎
      </p>
      <div className="flex items-center  w-full sm:w-1/3 lg:w-1/4 gap-4 mt-4">
        <Input
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          type="text"
          placeholder="Add an ingredient"
          className="w-full border border-gray-500"
        />
        <button className="rounded-lg text-green-800 " onClick={handleAddParam}>
          <PlusIcon />
        </button>
      </div>
      <ul className="flex gap-4 mt-4 mb-4">
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
      <h3 className="font-semibold text-red-500 text-base mb-4">
        {inputError}
      </h3>
      <Button onClick={handleSubmit} variant="search">
        Search
      </Button>
      <div className="mt-4 lg:flex lg:flex-wrap lg:justify-center">
        {errorMsg && <p>{errorMsg}</p>}
        {recipes.map((recipe) => {
          return <RecipeCard recipe={recipe} key={recipe.id} />;
        })}
      </div>
    </div>
  );
}

export default App;
