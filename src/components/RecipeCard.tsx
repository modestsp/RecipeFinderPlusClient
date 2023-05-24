import styles from "../styles/RecipeCard.module.css";
import { IRecipe } from "../utils/types";

interface RecipeCardProps {
  recipe: IRecipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.recipeTitle}>{recipe.title}</h1>
      <img
        className={styles.recipeImage}
        src={recipe.image}
        alt={recipe.title}
      />
    </div>
  );
};

export default RecipeCard;
