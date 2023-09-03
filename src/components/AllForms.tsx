import React from "react";
import {formInfo} from "../types/formTypes";
import {Link} from "raviger";

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
                              <svg
                                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                  stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                              </svg>

                            </Link>
                        ) : (
                            <Link
                                href={"/preview/" + form.id}
                                className="bg-green-500 font-bold  rounded-lg hover:bg-green-600 px-3 py-1 "
                            >
                              <svg
                                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                  stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              </svg>

                            </Link>
                        )}
                        <Link
                            href={"/forms/" + form.id}
                            className="bg-amber-400 font-bold  rounded-lg hover:bg-amber-500 px-3 py-1 "
                        >
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none" viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                          </svg>

                        </Link>
                        <button
                            className=" bg-red-500  rounded-lg hover:bg-red-600 hover:text-white p-1"
                            onClick={(_) => prop.removeFormCB(form.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                               stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
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
