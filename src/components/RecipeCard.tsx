import styles from "../styles/RecipeCard.module.css";
import { IRecipe } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";

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
      <img
        className={styles.recipeImage}
        src={recipe.image}
        alt={recipe.title}
      />
      <h1 className={styles.recipeTitle}>{recipe.title}</h1>
      <div className={styles.cardFooter}>
        <AiOutlineLike />
        <span>{recipe.likes}</span>
      </div>
    </div>
  );
};

export default RecipeCard;
