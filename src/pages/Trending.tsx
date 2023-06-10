import { useQuery } from "react-query";
import { IRecipe } from "../utils/types";
import RecipeCard from "../components/RecipeCard";
import styles from "../styles/Trending.module.css";
const Trending = () => {
  const { data, isLoading, isError } = useQuery("trendingRecipes", () =>
    fetch(`https://localhost:7222/recipes/trending`).then((res) => res.json())
  );
  if (isLoading) return <div>Loading...</div>;
  console.log(data);
  return (
    <div className={styles.mainContainer}>
      <h1>TRENDING RECIPES</h1>
      {data.map((recipe: IRecipe) => (
        <RecipeCard recipe={recipe} key={recipe.id} />
        // <div key={recipe.id}>
        //   <h2>{recipe.title}</h2>
        //   <img src={recipe.image} alt={recipe.title} />
        //   <p>likes: {recipe.likes}</p>
        // </div>
      ))}
    </div>
  );
};

export default Trending;
