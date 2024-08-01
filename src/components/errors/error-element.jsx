import { useRouteError } from "react-router-dom";

function ErrorElement({ error }) {
  const routeError = useRouteError();
  error = error || routeError;
  return (
    <div className="flex items-center justify-center  p-10">
      <div className="rounded-lg bg-white p-10 text-center ">
        <h1 className="mb-4 text-4xl font-bold text-red-500">Oops!</h1>
        <p className="mb-2 text-xl font-semibold text-gray-800">
          Something went wrong
        </p>
        <p className="mb-6 text-gray-600">
          <i>
            {error?.statusText ||
              error?.message ||
              "An unexpected error occurred."}
          </i>
        </p>
        <a href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </a>
      </div>
    </div>
  );
}
export default ErrorElement;
