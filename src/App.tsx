import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./styles/App.module.css";

function App() {
  const [current, setCurrent] = useState<string>("");
  const [words, setWords] = useState<string[]>([]);

  const handleSubmit = () => {
    const params = words.join(",");
    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${params}&number=2&apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
    console.log(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${params}&number=2&apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );
  };

  return (
    <div className={styles.mainContainer}>
      <input
        name="word"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        type="text"
        placeholder="Search"
      />
      <button onClick={() => setWords([...words, current])}>Add</button>
      <h1>RecipeFinderPlus</h1>
      <p>Welcome to the recipe finder</p>
      <ul>
        {words.map((word, index) => {
          console.log("aca la word", words[index]);
          return (
            <li key={index}>
              <p>{word}</p>
              <button onClick={() => setWords(words.filter((w) => w !== word))}>
                delete
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
}

export default App;
