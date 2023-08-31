import React, { useEffect, useState } from "react";
import { getLocalForms } from "./utils";
import { navigate } from "raviger";
import { Error } from "./Error";

export default function Preview(props: { formId: number }) {
  const [state] = useState(() => {
    const form = getLocalForms().find((form) => form.id === props.formId);
    return form
      ? form
      : {
          id: props.formId,
          title: "Sample Form",
          formFields: [],
        };
  });

  const [stateFormFieldIndex, setStateFormFieldIndex] = useState(0);
  const [form, setForm] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setForm((form) => {
      const newForm = [...form];
      newForm[stateFormFieldIndex] = inputValue;
      return newForm;
    });
  }, [stateFormFieldIndex, inputValue]);

  const title = state.title;

  if (state.formFields.length === 0) {
    return <Error errorMsg="No Questions" desc="This form has no questions" />;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center text-2xl font-bold">{title}</div>
      <div className="flex flex-col justify-center items-center mt-5 border-2 border-gray-300 p-5 rounded-lg">
        <label className="text-center text-xl font-bold">
          {state.formFields[stateFormFieldIndex].label}
        </label>
        <input
          className="border-2 mt-2 border-gray-300 bg-white h-10 px-5 pr-1 rounded-lg text-m focus:outline-none invalid:border-red-500"
          type={state.formFields[stateFormFieldIndex].type}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-row justify-center items-center">
        <button
          className="border-2 text-white bg-green-500 rounded-lg p-2 m-2 disabled:hidden"
          disabled={stateFormFieldIndex !== 0}
          onClick={() => navigate("/")}
        >
          Back
        </button>
        <button
          className="border-2 bg-blue-600 text-white rounded-lg p-2 m-2 disabled:hidden"
          disabled={stateFormFieldIndex === 0}
          onClick={() => {
            setStateFormFieldIndex(stateFormFieldIndex - 1);
            if (form[stateFormFieldIndex - 1])
              setInputValue(form[stateFormFieldIndex - 1]);
            else setInputValue("");
          }}
        >
          Previous
        </button>
        <button
          className="border-2 text-white bg-blue-600 rounded-lg p-2 m-2 disabled:hidden"
          disabled={stateFormFieldIndex === state.formFields.length - 1}
          onClick={() => {
            setStateFormFieldIndex(stateFormFieldIndex + 1);
            if (form[stateFormFieldIndex + 1])
              setInputValue(form[stateFormFieldIndex + 1]);
            else setInputValue("");
          }}
        >
          Next
        </button>
        <button
          className="border-2 text-white bg-green-500 rounded-lg p-2 m-2 disabled:hidden"
          disabled={stateFormFieldIndex !== state.formFields.length - 1}
          onClick={() => {
            setStateFormFieldIndex(stateFormFieldIndex + 1);
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
