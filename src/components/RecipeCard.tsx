import { IRecipe } from "../utils/types";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

interface RecipeCardProps {
  recipe: IRecipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const navigate = useNavigate();

  return (
    // <div onClick={() => navigate(`/recipes/${recipe.id}`)}>
    //   <img src={recipe.image} alt={recipe.title} />
    //   <h1>{recipe.title}</h1>
    //   <div>
    //   </div>
    // </div>
    <Link to={`/recipes/${recipe.id}`}>
      <Card className="bg-lime-400 m-2">
        <CardHeader>
          <CardTitle>{recipe.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <img src={recipe.image} alt={recipe.title} />
        </CardContent>
        <CardFooter>
          <AiOutlineLike />
          <span className="font-semibold">{recipe.likes}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;
