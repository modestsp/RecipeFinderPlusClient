import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { IRecipeStep } from "../utils/types";
import { useRecipesStore } from "../utils/context";
import { useQuery } from "react-query";

const Recipe = () => {
  const { recipeId } = useParams();
  const recipeDetails = useQuery("repoData", () =>
    fetch(
      `${import.meta.env.VITE_RECIPES_ROUTE}/${recipeId}/information?apiKey=${
        import.meta.env.VITE_API_KEY
      }&includeNutrition=false`
    ).then((res) => res.json())
  );
  const recipeInstructions = useQuery("recipeInstructions", () =>
    fetch(
      `${
        import.meta.env.VITE_RECIPES_ROUTE
      }/${recipeId}/analyzedInstructions?apiKey=${import.meta.env.VITE_API_KEY}`
    ).then((res) => res.json())
  );

  // const { isLoading, error, data } = useQuery({
  //   queryKey: ["recipeDetails"],
  //   queryFn: () => {
  //     fetch(
  //       `${import.meta.env.VITE_RECIPES_ROUTE}/${recipeId}/information?apiKey=${
  //         import.meta.env.VITE_API_KEY
  //       }&includeNutrition=false`
  //     ).then((res) => res.json());
  //   },
  //   refetchInterval: 10000000,
  // });

  if (recipeDetails.isLoading || recipeInstructions.isLoading)
    return <div>Loading...</div>;
  if (recipeDetails.error || recipeInstructions.error) return <div>Error</div>;
  const { steps } = recipeInstructions.data[0];
  console.log(recipeDetails.data);
  console.log(recipeInstructions.data);

  return (
    <div>
      <h1>{recipeDetails.data.title}</h1>
      <img src={recipeDetails.data.image} alt={recipeDetails.data.title} />
      {steps.map((step: IRecipeStep) => (
        <div key={step.number}>
          <h2>Step {step.number}</h2>
          <p>{step.step}</p>
        </div>
      ))}
    </div>
  );
};

export default Recipe;
