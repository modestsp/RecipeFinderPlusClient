import { useParams } from "react-router-dom";
import { IRecipeIngredient, IRecipeStep } from "../utils/types";
import { useMutation, useQuery } from "react-query";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const Recipe = () => {
  const { recipeId } = useParams();
  const recipeDetails = useQuery("repoData", () =>
    fetch(
      `${import.meta.env.VITE_RECIPES_ROUTE}/${recipeId}/information?apiKey=${
        import.meta.env.VITE_API_KEY
      }&includeNutrition=false`
    ).then((res) => res.json())
  );

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return fetch("https://localhost:7222/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
  });

  if (recipeDetails.isLoading) return <div>Loading...</div>;
  if (recipeDetails.error) return <div>Error</div>;

  const handleAddRecipe = () => {
    console.log({ id: recipeId, title: recipeDetails.data.title });
    mutation.mutate({
      id: recipeId,
      title: recipeDetails.data.title,
      image: recipeDetails.data.image,
      likes: 1,
    });
  };

  return (
    <div>
      <div>
        <h1>{recipeDetails.data.title}</h1>
        <h2>{recipeDetails.data.readyInMinutes}'</h2>
        <img src={recipeDetails.data.image} alt={recipeDetails.data.title} />
      </div>
      <h3>Ingredients</h3>
      <ul>
        {recipeDetails.data.extendedIngredients.map(
          (ingredient: IRecipeIngredient) => (
            <p key={ingredient.original}>{ingredient.original}</p>
          )
        )}
      </ul>
      <div>
        <h3>Instructions</h3>
        {recipeDetails.data.analyzedInstructions[0].steps.map(
          (step: IRecipeStep) => (
            <div key={step.number}>
              <h2>Step {step.number}</h2>
              <p>{step.step}</p>
            </div>
          )
        )}
      </div>
      <p style={{ fontWeight: "bold" }}>{`Leave a like if you like it! :) `}</p>
      <button onClick={handleAddRecipe}>
        {mutation.isLoading ? "Loading..." : <AiOutlineLike />}
      </button>
    </div>
  );
};

export default Recipe;
