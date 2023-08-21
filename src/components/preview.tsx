import React, { useEffect, useState } from "react";
import { getLocalForms } from "./utils";
import { navigate } from "raviger";

export default function Preview(props: { formId: number }) {
  const [state] = useState(
    getLocalForms().filter((form) => form.id === props.formId)[0],
  );

  const [stateIndex, setStateIndex] = useState(0);
  const [form, setForm] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setForm((form) => {
      const newForm = [...form];
      newForm[stateIndex] = inputValue;
      return newForm;
    });
    return () => {};
  }, [stateIndex, inputValue]);

  const title = state.title;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center text-2xl font-bold">{title}</div>
      <div className="flex flex-col justify-center items-center mt-5 border-2 border-gray-300 p-5 rounded-lg">
        <label className="text-center text-xl font-bold">
          {state.formFields[stateIndex].label}
        </label>
        <input
          className="border-2 mt-2 border-gray-300 bg-white h-10 px-5 pr-1 rounded-lg text-m focus:outline-none invalid:border-red-500"
          type={state.formFields[stateIndex].type}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className="flex flex-row justify-center items-center">
        <button
          className="border-2 text-white bg-green-500 rounded-lg p-2 m-2 disabled:hidden"
          disabled={stateIndex !== 0}
          onClick={() => navigate("/")}
        >
          Back
        </button>
        <button
          className="border-2 bg-blue-600 text-white rounded-lg p-2 m-2 disabled:hidden"
          disabled={stateIndex === 0}
          onClick={() => {
            setStateIndex(stateIndex - 1);
            if (form[stateIndex - 1]) setInputValue(form[stateIndex - 1]);
            else setInputValue("");
          }}
        >
          Previous
        </button>
        <button
          className="border-2 text-white bg-blue-600 rounded-lg p-2 m-2 disabled:hidden"
          disabled={stateIndex === state.formFields.length - 1}
          onClick={() => {
            setStateIndex(stateIndex + 1);
            if (form[stateIndex + 1]) setInputValue(form[stateIndex + 1]);
            else setInputValue("");
          }}
        >
          Next
        </button>
        <button
          className="border-2 text-white bg-green-500 rounded-lg p-2 m-2 disabled:hidden"
          disabled={stateIndex !== state.formFields.length - 1}
          onClick={() => {
            setStateIndex(stateIndex + 1);
            console.log(form);
            navigate("/");
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
