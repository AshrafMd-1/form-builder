import React, { useState } from "react";
import { getLocalForms, saveFormData } from "./utils";
import { navigate } from "raviger";

export default function Preview(props: { formId: number }) {
  const [state, setState] = useState(
    getLocalForms().filter((form) => form.id === props.formId)[0],
  );
  const [stateIndex, setStateIndex] = useState(0);
  const title = state.title;

  const saveInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      formFields: state.formFields.map((formField) => {
        if (formField.id === state.formFields[stateIndex].id) {
          return {
            ...formField,
            value: String(e.target.value),
          };
        } else {
          return formField;
        }
      }),
    });
    saveFormData(state);
  };

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
          value={state.formFields[stateIndex].value}
          onChange={(e) => saveInputValue(e)}
        />
      </div>
      <div className="flex flex-row justify-center items-center">
        <button
          className="border-2 bg-blue-600 text-white rounded-lg p-2 m-2 disabled:opacity-50 cursor-not-allowed"
          {...(stateIndex === 0 && { disabled: true })}
          onClick={() => {
            if (stateIndex > 0) {
              setStateIndex(stateIndex - 1);
            }
          }}
        >
          Previous
        </button>
        <button
          className="border-2 text-white bg-blue-600 rounded-lg p-2 m-2 disabled:hidden"
          {...(stateIndex === state.formFields.length - 1 && {
            disabled: true,
          })}
          onClick={() => {
            if (stateIndex < state.formFields.length - 1) {
              setStateIndex(stateIndex + 1);
            }
          }}
        >
          Next
        </button>
        <button
          className="border-2 text-white bg-green-500 rounded-lg p-2 m-2 disabled:hidden"
          {...(stateIndex === state.formFields.length - 1
            ? {
                disabled: false,
              }
            : {
                disabled: true,
              })}
          onClick={() => navigate("/")}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
