import { useParams } from "react-router-dom";
import { IRecipeIngredient, IRecipeStep } from "../utils/types";
import { useMutation, useQuery } from "react-query";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Car } from "lucide-react";
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
        method: `POST`,
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
    <Card>
      <CardHeader>
        <CardTitle>{recipeDetails.data.title}</CardTitle>
        {/* <CardDescription>
              Ready in {recipeDetails.data.readyInMinutes}'
            </CardDescription> */}
      </CardHeader>
      <CardContent>
        <img src={recipeDetails.data.image} alt={recipeDetails.data.title} />

        <p className="text-3xl font-bold mt-2 mb-2">Ingredients</p>
        <ul className="list-disc pl-7 bg-slate-300 rounded-sm shadow-lg p-2">
          {recipeDetails.data.extendedIngredients.map(
            (ingredient: IRecipeIngredient) => (
              <li key={ingredient.original}>{ingredient.original}</li>
            )
          )}
        </ul>
        <div>
          <p className="text-3xl font-bold mt-2 mb-2">Instructions</p>
          {recipeDetails.data.analyzedInstructions[0].steps.map(
            (step: IRecipeStep) => (
              <ul
                className="list-disc pl-4 shadow bg-gray-400 mb-2 rounded-sm py-1"
                key={step.number}
              >
                <p className="text-xl font-semibold ">Step {step.number}</p>
                <p>{step.step}</p>
              </ul>
            )
          )}
        </div>
        <p
          style={{ fontWeight: "bold" }}
        >{`Leave a like if you like it! :) `}</p>
        <button onClick={handleAddRecipe}>
          {mutation.isLoading ? "Loading..." : <AiOutlineLike />}
        </button>
      </CardContent>
    </Card>
  );
};

export default Recipe;
