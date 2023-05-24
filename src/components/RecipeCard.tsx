import styles from "../styles/RecipeCard.module.css";
import { IRecipe } from "../utils/types";
import { useNavigate } from "react-router-dom";

interface RecipeCardProps {
  recipe: IRecipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/recipes/${recipe.id}`)}
      className={styles.container}
    >
      <h1 className={styles.recipeTitle}>{recipe.title}</h1>
      <img
        className={styles.recipeImage}
        src={recipe.image}
        alt={recipe.title}
      />
      <span>likes: {recipe.likes}</span>
    </div>
  );
};

export default RecipeCard;
