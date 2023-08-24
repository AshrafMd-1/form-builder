import React from "react";
import { formInfo } from "./types";
import { Link } from "raviger";

export const AllForms = (prop: {
  forms: formInfo[];
  addFormCB: () => void;
  removeFormCB: (id: number) => void;
  search: string;
}) => {
  return (
    <div className="p-4 border  relative  border-gray-300 mb-3 rounded-lg shadow-md">
      <div className="text-xl font-bold text-center">All Forms</div>
      <div className="absolute top-0 right-0 mr-3 mt-4 flex">
        <div className="text-xl font-bold text-center">
          Count :{" "}
          {
            prop.forms.filter((form) => {
              return form.title
                .toLowerCase()
                .includes(prop.search?.toLowerCase() || "");
            }).length
          }
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-wrap w-full  m-2 justify-center">
          {prop.forms
            .filter((form) => {
              return form.title
                .toLowerCase()
                .includes(prop.search?.toLowerCase() || "");
            })
            .map((form: formInfo) => (
              <div
                key={form.id}
                className="grid grid-cols-5 gap-4 m-2 p-2 w-full mx-5  bg-blue-500 text-white items-center rounded-xl focus:outline-none focus:shadow-outline-blue"
              >
                <p className=" ml-3 text-center text-lg col-span-2 break-words font-bold">
                  {form.title}
                </p>
                <div className="flex justify-center items-center">
                  {form.question === 0 ? (
                    <div className="font-bold text-center  ">No Questions</div>
                  ) : (
                    <div className=" font-bold text-center">
                      Questions : {form.question}
                    </div>
                  )}
                </div>
                <div className="flex col-span-2 justify-center items-center gap-2 flex-wrap">
                  {form.question === 0 ? (
                    <Link
                      href={"/"}
                      className="bg-green-500 font-bold  rounded-lg hover:bg-green-600 px-3 py-1 opacity-50 cursor-not-allowed"
                    >
                      No Preview
                    </Link>
                  ) : (
                    <Link
                      href={"/preview/" + form.id}
                      className="bg-green-500 font-bold  rounded-lg hover:bg-green-600 px-3 py-1 "
                    >
                      PREVIEW
                    </Link>
                  )}

                  <Link
                    href={"/forms/" + form.id}
                    className="bg-amber-400 font-bold  rounded-lg hover:bg-amber-500 px-3 py-1 "
                  >
                    EDIT
                  </Link>
                  <button
                    className=" bg-red-500  rounded-lg hover:bg-red-600 hover:text-white p-1"
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
          ➕ Add Form
        </button>
      </div>
    </div>
  );
};
