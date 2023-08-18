import React from "react";
import { formData } from "./Form";

export const AllForms = (prop: {
  localStorage: formData[];
  selectFormCB: (form: formData) => void;
  addFormCB: () => void;
  removeFormCB: (id: number) => void;
}) => {
  return (
    <div className="p-4 border border-gray-300 mb-3 rounded-lg shadow-md">
      <div className="collapse bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium text-center">
          Click to view saved forms
        </div>
        <div className="collapse-content flex flex-col justify-center items-center">
          <div className="flex flex-wrap m-2">
            {prop.localStorage.map((form: formData) => (
              <div
                key={form.id}
                className="flex m-2 p-2 bg-blue-500 text-white items-center rounded-xl focus:outline-none focus:shadow-outline-blue"
              >
                <p className="text-l font-bold">{form.title}</p>
                <div className="flex justify-center items-center">
                  <button
                    className="btn ml-2 hover:bg-amber-400 btn-sm p-1"
                    onClick={(_) => prop.selectFormCB(form)}
                  >
                    🖋️
                  </button>
                  <button
                    className="btn btn-square border-0 hover:bg-red-500 hover:text-white ml-1 btn-sm"
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
    </div>
  );
};
