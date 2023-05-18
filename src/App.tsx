import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./styles/App.module.css";

function App() {
  const [current, setCurrent] = useState<string>("");
  const [params, setParams] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);

  const handleSubmit = () => {
    const paramsToSearch = params.join(",");
    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${paramsToSearch}&number=2&apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => setRecipes(data));
    console.log(
      `${import.meta.env.VITE_INGREDIENTS_ROUTE}${params}&number=2&apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );
  };
  return (
    <div className={styles.mainContainer}>
      <h1>RecipeFinderPlus</h1>
      <p>Welcome to the recipe finder</p>
      <div>
        <input
          name="word"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          type="text"
          placeholder="Search"
        />
        <button onClick={() => setParams([...params, current])}>Add</button>
      </div>
      <ul className={styles.paramsList}>
        {params.map((param, index) => {
          return (
            <li key={index} className={styles.paramsListItem}>
              <p>{param}</p>
              <button
                onClick={() => setParams(params.filter((w) => w !== param))}
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={handleSubmit}>Search</button>
      <div>
        {recipes.map((recipe) => {
          return (
            <div key={recipe.id}>
              <h1>{recipe.title}</h1>
              <img src={recipe.image} alt={recipe.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
