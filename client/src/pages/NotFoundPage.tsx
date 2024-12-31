import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6">
      <h1 className="text-8xl font-bold mb-6">404</h1>
      <p className="text-lg mb-8">
        Oops! The page   does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
