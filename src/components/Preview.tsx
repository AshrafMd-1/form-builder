import React, { useEffect, useReducer, useState } from "react";
import { getLocalForms } from "../utils/utils";
import { navigate } from "raviger";
import { formField } from "../types/formTypes";
import { TextPreview } from "./Previews/TextPreview";
import { RadioPreview } from "./Previews/RadioPreview";
import { MultiSelectPreview } from "./Previews/MultiSelectPreview";
import { InputValueActions } from "../types/previewReducerTypes";

const initialState = (id: number) => {
  const form = getLocalForms().find((form) => form.id === id);
  return form
    ? form
    : {
        id: 1,
        title: "Sample Form",
        formFields: [],
      };
};

const inputReducer = (state: string, action: InputValueActions) => {
  switch (action.type) {
    case "edit_input_value_using_string": {
      return action.value;
    }
    case "edit_input_value_for_multi_select": {
      return action.value.filter((v: string) => v !== "").join(" | ");
    }
    case "set_input_value_based_on_index": {
      return action.value;
    }
    case "set_empty_input_value": {
      return "";
    }
    default:
      return state;
  }
};

export default function Preview(props: { formId: number }) {
  const [state] = useState(() => initialState(props.formId));
  const [form, setForm] = useState<string[]>([]);
  const [stateFormIndex, setStateFormIndex] = useState(0);

  const [inputValue, inputDispatch] = useReducer(inputReducer, "");

  useEffect(() => {
    setForm((form) => {
      const newForm = [...form];
      newForm[stateFormIndex] = inputValue;
      return newForm;
    });
    return () => {};
  }, [stateFormIndex, inputValue]);

  const title = state.title;

  // if (!checkFormBasedOnID(props.formId)) {
  //   return (
  //     <Error
  //       errorMsg="Preview Not Found"
  //       desc="A preview with this ID does not exist"
  //     />
  //   );
  // } else if (state.formFields.length === 0) {
  //   return <Error errorMsg="No Questions" desc="This form has no questions" />;
  // }

  const renderField = (formValues: formField) => {
    if (formValues.kind === "RADIO") {
      return (
        <RadioPreview
          options={formValues.options.options}
          selectedInputValue={inputValue}
          setInputValueUsingStringCB={(value: string) => {
            inputDispatch({ type: "edit_input_value_using_string", value });
          }}
        />
      );
    } else if (formValues.kind === "DROPDOWN") {
      return (
        <MultiSelectPreview
          options={formValues.options.options}
          inputValue={inputValue}
          setInputValueForMultiSelectCB={(value: string[]) => {
            inputDispatch({
              type: "edit_input_value_for_multi_select",
              value,
            });
          }}
        />
      );
    } else {
      return (
        <TextPreview
          fieldType={formValues.kind}
          inputValue={inputValue}
          setInputValueUsingStringCB={(value: string) => {
            inputDispatch({ type: "edit_input_value_using_string", value });
          }}
        />
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center text-2xl font-bold">{title}</div>
      <div className="text-center text-xl flex">
        <span className="text-gray-500 font-bold">Question</span>
        &nbsp;:&nbsp;
        <p className="font-bold">
          {stateFormIndex + 1}&nbsp;
          <span className="font-normal">of</span>
          &nbsp;{state.formFields.length}
        </p>
      </div>
      <div
        className="flex-start flex h-2 overflow-hidden mt-2 rounded-xl bg-gray-300 font-sans text-xs font-medium"
        style={{ width: "50%" }}
      >
        <div
          className="flex h-full items-baseline justify-center overflow-hidden break-all bg-green-500 text-white"
          style={{
            width: `${((stateFormIndex + 1) * 100) / state.formFields.length}%`,
            transition: "width 0.5s ease-in-out",
          }}
        ></div>
      </div>
      <div className="flex flex-col justify-center items-center mt-5 border-2 border-gray-300 p-5 rounded-lg">
        <label className="text-center text-xl font-bold">
          {state.formFields[stateFormIndex].label}
        </label>
        {renderField(state.formFields[stateFormIndex])}
      </div>
      <div className="flex flex-row justify-center items-center">
        <button
          className="border-2 text-white bg-green-500 rounded-lg p-2 m-2 disabled:hidden"
          disabled={stateFormIndex !== 0}
          onClick={() => navigate("/")}
        >
          Back
        </button>
        <button
          className="border-2 bg-blue-600 text-white rounded-lg p-2 m-2 disabled:hidden"
          disabled={stateFormIndex === 0}
          onClick={() => {
            setStateFormIndex((stateFormIndex) => stateFormIndex - 1);
            if (form[stateFormIndex - 1])
              inputDispatch({
                type: "set_input_value_based_on_index",
                value: form[stateFormIndex - 1],
              });
            else inputDispatch({ type: "set_empty_input_value" });
          }}
        >
          Previous
        </button>
        <button
          className="border-2 text-white bg-blue-600 rounded-lg p-2 m-2 disabled:hidden"
          disabled={stateFormIndex === state.formFields.length - 1}
          onClick={() => {
            setStateFormIndex((stateFormIndex) => stateFormIndex + 1);
            if (form[stateFormIndex + 1])
              inputDispatch({
                type: "set_input_value_based_on_index",
                value: form[stateFormIndex + 1],
              });
            else inputDispatch({ type: "set_empty_input_value" });
          }}
        >
          Next
        </button>
        <button
          className="border-2 text-white bg-green-500 rounded-lg p-2 m-2 disabled:hidden"
          disabled={stateFormIndex !== state.formFields.length - 1}
          onClick={() => {
            setStateFormIndex((stateFormIndex) => stateFormIndex + 1);
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
