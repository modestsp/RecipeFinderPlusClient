import { IRecipe } from "../utils/types";
import { Link } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

interface RecipeCardProps {
  recipe: IRecipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    // <div onClick={() => navigate(`/recipes/${recipe.id}`)}>
    //   <img src={recipe.image} alt={recipe.title} />
    //   <h1>{recipe.title}</h1>
    //   <div>
    //   </div>
    // </div>
    <Link to={`/recipes/${recipe.id}`}>
      <Card className="bg-[#e6e6e6] hover:border-gray-600 lg:h-[26rem] md:w-96 w-80 border transition border-gray-400 m-4">
        <CardHeader>
          <CardTitle className="lg:text-3xl text-2xl text-orange-500 font-bold ">
            {recipe.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <img className="align-middle" src={recipe.image} alt={recipe.title} />
        </CardContent>
        <CardFooter>
          <AiOutlineLike />
          <span className="font-semibold ">{recipe.likes}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;
