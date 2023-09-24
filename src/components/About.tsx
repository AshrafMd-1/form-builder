import React, { useEffect, useState } from "react";
import { Location } from "./Location";
import { User } from "../types/userTypes";
import { listAllForms, me } from "../utils/apiUtils";
import { Form } from "../types/formTypes";
import { navigate } from "raviger";

const fetchForms = async (
  setFormCB: (value: Form[]) => void,
) => {
  try {
    const data = await listAllForms()
    setFormCB(data.results);
  } catch (err) {
    console.error(err);
  }
};

export default function About() {
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [forms, setForms] = useState<Form[]>(() => {
    const localForms = localStorage.getItem("allForms");
    return localForms ? JSON.parse(localForms) : [];
  });


  useEffect(() => {
    me().then((data) => {
      setCurrentUser(data.results[0]);
    });
  }, []);

  useEffect(() => {
    fetchForms(setForms);
  }, []);

  if (!currentUser) return <p className="text-xl text-center">Not Logged In</p>;
  if (!forms) return <p className="text-xl text-center">No Forms</p>;

  return (
    <div className="flex flex-col gap-3 justify-content">
      <div className="relative rounded-lg ">
        <p className="text-xl font-bold text-center">User</p>
        <p className="text-xl text-center">{currentUser?.username}</p>
      </div>
      <div className="relative rounded-lg ">
        <p className="text-xl font-bold text-center">Location</p>
        <Location />
      </div>
      <div className="relative rounded-lg ">
        <p className="text-xl font-bold text-center">Form Count</p>
        <p className="text-xl text-center">{forms.length}</p>
      </div>
      <div className="relative rounded-lg ">
        <p className="text-xl font-bold text-center">Forms</p>
        <div className="flex flex-row justify-center items-center">
          <table className="table-auto border-collapse border border-green-800">
            <thead>
              <tr>
                <th className="border border-green-800 px-4 py-2">Index</th>
                <th className="border border-green-800 px-4 py-2">Title</th>
                <th className="border border-green-800 px-4 py-2">
                  Description
                </th>
                <th className="border border-green-800 px-4 py-2">Status</th>
                <th className="border border-green-800 px-4 py-2">Preview</th>
                <th className="border border-green-800 px-4 py-2">Edit</th>
              </tr>
            </thead>
            <tbody>
            {forms.map((form, index) => (
              <tr key={form.id}>
                <td className="border text-center border-green-800 px-4 py-2">
                  {index + 1}.
                </td>
                <td className="border text-center border-green-800 px-4 py-2">
                  {form.title}
                </td>
                <td className="border text-center border-green-800 px-4 py-2">
                  {form.description}
                </td>
                <td className="border text-center border-green-800 px-4 py-2">
                  {form.is_public ? "Public" : "Private"}
                </td>
                <td className="border text-center border-green-800 px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      navigate(`/preview/${form.id}`);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </td>
                <td className="border text-center border-green-800 px-4 py-2">
                  <button
                    className=" bg-amber-400 font-bold  rounded-lg hover:bg-amber-500 px-3 py-1"
                    onClick={() => {
                      navigate(`/forms/${form.id}`);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
