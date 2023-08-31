import { navigate } from "raviger";

export const Error = (props: { errorMsg: string; desc: string }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center text-2xl font-bold">{props.errorMsg}</div>
      <div className="flex flex-col justify-center items-center mt-2 mb-2 ">
        <label className="text-center text-xl ">{props.desc}</label>
        <button
          className="border-2 mt-5 text-white bg-blue-500 rounded-lg p-2 m-2 disabled:hidden hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>
    </div>
  );
};
