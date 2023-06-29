import { useQuery } from "react-query";
import { IRecipe } from "../utils/types";
import RecipeCard from "../components/RecipeCard";

const Trending = () => {
  const { data, isLoading, isError } = useQuery("trendingRecipes", () =>
    fetch(`https://localhost:7222/recipes/trending`).then((res) => res.json())
  );
  if (isLoading) return <div>Loading...</div>;
  console.log(data);
  return (
    <div>
      <h1>Trending Recipes</h1>
      <div>
        {data.map((recipe: IRecipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </div>
  );
};

export default Trending;
