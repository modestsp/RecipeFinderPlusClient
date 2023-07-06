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

  if (recipeDetails.isLoading)
    return (
      <div className="flex flex-1 justify-center items-center min-w-full min-h-full">
        <p className="text-2xl">Loading...</p>
      </div>
    );
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
        <CardTitle className="md:text-3xl text-orange-500 text-2xl font-bold ">
          {recipeDetails.data.title}
        </CardTitle>
        {/* <CardDescription>
              Ready in {recipeDetails.data.readyInMinutes}'
            </CardDescription> */}
      </CardHeader>
      <CardContent>
        <img src={recipeDetails.data.image} alt={recipeDetails.data.title} />
        <div className="border lg:w-1/2  border-gray-400 rounded-sm mt-2 px-1 py-1 ">
          <p className="lg:text-3xl text-2xl font-bold mb-1 ">Ingredients</p>
          <ul className="list-disc pl-7  ">
            {recipeDetails.data.extendedIngredients.map(
              (ingredient: IRecipeIngredient) => (
                <li key={ingredient.original}>{ingredient.original}</li>
              )
            )}
          </ul>
        </div>
        <div className="mt-2 px-1 py-1">
          <p className="lg:text-3xl text-2xl font-bold mt-2 mb-2">
            Instructions
          </p>
          {recipeDetails.data.analyzedInstructions[0].steps.map(
            (step: IRecipeStep) => (
              <ul
                className="list-disc pl-4 mb-2 rounded-sm py-1"
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
