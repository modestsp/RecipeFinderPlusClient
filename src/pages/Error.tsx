import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex h-[80vh]  font-bold font-mono flex-col items-center justify-center gap-4">
      <h1 className="text-4xl ">Oops!</h1>
      <p className=" text-4xl">Page Not Found</p>
      <Link className=" text-2xl hover:text-gray-600 mt-4" to="/">
        Go back
      </Link>
    </div>
  );
};

export default Error;
