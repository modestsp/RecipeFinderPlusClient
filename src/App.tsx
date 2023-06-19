import { useEffect, useState } from "react";
import styles from "./styles/App.module.css";
import RecipeCard from "./components/RecipeCard";

function App() {
  const [current, setCurrent] = useState<string>("");
  const [params, setParams] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [inputError, setInputError] = useState<string>(" ");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAddParam = () => {
    if (current.length === 0) {
      setInputError("Please enter an ingredient");
      setTimeout(() => {
        setInputError(" ");
      }, 3000);
      return;
    }

    setParams([...params, current]);
    setCurrent("");
  };

  const handleSubmit = async () => {
    if (params.length === 0) {
      setErrorMsg("Please enter at least one ingredient");
      return;
    }
    const paramsToSearch = params.join(",");
    const result = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${paramsToSearch}&number=2&apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const recipes = await result.json();
    if (recipes.length == 0) setErrorMsg("No recipes found");
    else setErrorMsg(null);
    setRecipes(recipes);

    console.log(
      `${import.meta.env.VITE_INGREDIENTS_ROUTE}${params}&number=2&apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    console.log(recipes);
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>
        Recipe Finder <span className={styles.plus}>Plus</span>
      </h1>
      <h3>Welcome to the recipe finder</h3>
      <p className={styles.welcomeMsg}>
        Embrace your inner chef! Let's find delicious recipes for your
        ingredients. 🍽️🔎
      </p>
      <div className={styles.addParamContainer}>
        <input
          name="word"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          type="text"
          placeholder="Add an ingredient"
        />
        <button onClick={handleAddParam} className={styles.addButton}>
          +
        </button>
      </div>
      <ul className={styles.paramsList}>
        {params.map((param, index) => {
          return (
            <li
              key={index}
              className={styles.paramsListItem}
              onClick={() => setParams(params.filter((w) => w !== param))}
            >
              <span className={styles.removeParamButton}>X</span>
              <p className={styles.param}>{param}</p>
            </li>
          );
        })}
      </ul>
      <h3>{inputError}</h3>
      <button className={styles.searchButton} onClick={handleSubmit}>
        Search
      </button>
      <div className={styles.recipesContainer}>
        {errorMsg && <p>{errorMsg}</p>}
        {recipes.map((recipe) => {
          return <RecipeCard recipe={recipe} key={recipe.id} />;
        })}
      </div>
    </div>
  );
}

export default App;
