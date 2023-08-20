import React from "react";
import { formInfo } from "./types";

export const AllForms = (prop: {
  forms: formInfo[];
  addFormCB: () => void;
  removeFormCB: (id: number) => void;
}) => {
  return (
    <div className="p-4 border bg-gray-300 border-gray-300 mb-3 rounded-lg shadow-md">
      <div className="text-xl font-bold text-center">Saved Forms</div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-wrap m-2 justify-center">
          {prop.forms.map((form: formInfo) => (
            <div
              key={form.id}
              className="flex m-2 p-2 bg-blue-500 text-white items-center rounded-xl focus:outline-none focus:shadow-outline-blue"
            >
              <p className="text-l font-bold">{form.title}</p>
              <div className="flex justify-center items-center">
                <a
                  href={"/forms/" + form.id}
                  className="bg-amber-400 ml-2 rounded-lg hover:bg-amber-500  p-1"
                >
                  🖋️
                </a>
                <button
                  className=" bg-red-500 ml-1 rounded-lg hover:bg-red-600 hover:text-white p-1"
                  onClick={(_) => prop.removeFormCB(form.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={(_) => prop.addFormCB()}
          className="bg-green-500 ml-auto hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-2 focus:outline-none focus:shadow-outline-green active:bg-green-800"
        >
          Add Form
        </button>
      </div>
    </div>
  );
};
