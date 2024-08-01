import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex items-center justify-center p-10 ">
      <div className="rounded-lg bg-white p-10 text-center ">
        <h1 className="mb-4 text-4xl font-bold text-red-500">404</h1>
        <p className="mb-2 text-xl font-semibold text-gray-800">
          Page Not Found
        </p>
        <p className="mb-6 text-gray-600">
          <i>
            The page your&apos;e looking for doesn&apos;t exist or has been
            moved.
          </i>
        </p>
        <Link replace={true} href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
export default NotFound;
