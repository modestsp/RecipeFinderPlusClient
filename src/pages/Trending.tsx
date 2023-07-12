import { useQuery } from "react-query";
import { IRecipe } from "../utils/types";
import RecipeCard from "../components/RecipeCard";

const Trending = () => {
  const { data, isLoading } = useQuery("trendingRecipes", () =>
    fetch(`https://localhost:7222/recipes/trending`).then((res) => res.json())
  );

  if (isLoading)
    return (
      <div className="flex flex-1 justify-center items-center min-w-full min-h-full">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  console.log(data);
  return (
    <div>
      <p className="md:text-4xl px-4 py-4 mb-4 text-orange-500 text-3xl font-bold">
        Trending Recipes
      </p>
      <div className="flex flex-col items-center">
        {data.map((recipe: IRecipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </div>
  );
};

export default Trending;
