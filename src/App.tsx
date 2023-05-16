import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./styles/App.module.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.mainContainer}>
      <h1>RecipeFinderPlus</h1>
      <p>Welcome to the recipe finder</p>
      <p>Seach</p>
      <button>search</button>
    </div>
  );
}

export default App;
