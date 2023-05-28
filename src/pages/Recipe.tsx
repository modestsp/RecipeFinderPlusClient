import styles from "../styles/RecipePage.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { IRecipeIngredient, IRecipeStep } from "../utils/types";
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

  if (recipeDetails.isLoading || recipeInstructions.isLoading)
    return <div>Loading...</div>;
  if (recipeDetails.error || recipeInstructions.error) return <div>Error</div>;
  const { steps } = recipeInstructions.data[0];
  console.log(recipeDetails.data);
  console.log(recipeInstructions.data);

  return (
    <div>
      <div className={styles.recipeInfoContainer}>
        <h1 className={styles.recipeTitle}>{recipeDetails.data.title}</h1>
        <h2 className={styles.recipeReadyInMinutes}>
          {recipeDetails.data.readyInMinutes}'
        </h2>
        {/* <p>{recipeDetails.data.instructions}</p> */}
        {/* <p>{recipeDetails.data.analyzedInstructions[0].steps[0].step}</p> */}
        <img
          className={styles.recipeImage}
          src={recipeDetails.data.image}
          alt={recipeDetails.data.title}
        />
      </div>
      <ul className={styles.ingredientsList}>Ingredients</ul>
      {recipeDetails.data.extendedIngredients.map(
        (ingredient: IRecipeIngredient) => (
          <p>{ingredient.original}</p>
        )
      )}
      <div className={styles.stepsContainer}>
        <h3>Instructions</h3>
        {recipeDetails.data.analyzedInstructions[0].steps.map(
          (step: IRecipeStep) => (
            <div className={styles.stepContainer} key={step.number}>
              <h2>Step {step.number}</h2>
              <p>{step.step}</p>
            </div>
          )
        )}
      </div>
      <p>{`Rate this Recipe! :) HandsUp or HandsDown`}</p>
    </div>
  );
};

export default Recipe;
