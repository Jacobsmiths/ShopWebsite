import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      <FaExclamationTriangle className="text-red-600 text-6xl mb-4" />
      <h1 className="font-bold mb-4">404 Not Found</h1>
      <p className="mb-5">This page does not exist</p>
      <Link to="/" className="rounded-md px-3 py-2 mt-4">
        Go Back
      </Link>
    </section>
  );
};
export default NotFoundPage;
