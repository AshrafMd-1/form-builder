import {navigate} from "raviger";

export const Error = () => {
  return (
      <div className="flex flex-col justify-center items-center">
        <div className="text-center text-2xl font-bold">404 Not Found</div>
        <div className="flex flex-col justify-center items-center mt-5 border-2 border-gray-300 p-5 rounded-lg">
          <label className="text-center text-xl font-bold">
            The page you are looking for does not exist.
          </label>
          <button
              className="border-2 text-white bg-blue-500 rounded-lg p-2 m-2 disabled:hidden hover:bg-blue-600"
              onClick={() => navigate("/")}
          >
            Home
          </button>
        </div>
      </div>
  );
};