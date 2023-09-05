import React, { useEffect, useReducer, useState } from "react";
import { checkFormBasedOnID, getLocalForms } from "../utils/utils";
import { navigate } from "raviger";
import { formField } from "../types/formTypes";
import { Error } from "./Error";
import { TextPreview } from "./Previews/TextPreview";
import { RadioPreview } from "./Previews/RadioPreview";
import { MultiSelectPreview } from "./Previews/MultiSelectPreview";
import { RangePreview } from "./Previews/RangePreview";
import { IndexAction, InputValueActions } from "../types/previewReducerTypes";

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
    case "edit_input_value_using_e": {
      return action.e.target.value;
    }
    case "edit_input_value_for_radio": {
      return action.value;
    }
    case "edit_input_value_for_multi_select": {
      return action.value.join(" | ").trim();
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

const stateFormIndexReducer = (state: number, action: IndexAction) => {
  switch (action.type) {
    case "increase_index_value": {
      return state + 1;
    }
    case "decrease_index_value": {
      return state - 1;
    }
    default:
      return state;
  }
};

export default function Preview(props: { formId: number }) {
  const [state] = useState(() => initialState(props.formId));
  const [form, setForm] = useState<string[]>([]);

  const [stateFormIndex, stateFormIndexDispatch] = useReducer(
    stateFormIndexReducer,
    0,
  );
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

  if (!checkFormBasedOnID(props.formId)) {
    return (
      <Error
        errorMsg="Preview Not Found"
        desc="A preview with this ID does not exist"
      />
    );
  } else if (state.formFields.length === 0) {
    console.log(state);
    return <Error errorMsg="No Questions" desc="This form has no questions" />;
  }

  const renderField = (formValues: formField) => {
    if (formValues.kind === "radio") {
      return (
        <RadioPreview
          options={formValues.options}
          selectedInputValue={inputValue}
          setInputValueFunctionForRadioCB={(value: string) => {
            inputDispatch({ type: "edit_input_value_for_radio", value });
          }}
        />
      );
    } else if (formValues.kind === "multi-select") {
      return (
        <MultiSelectPreview
          options={formValues.options}
          inputValue={inputValue}
          setInputValueForMultiSelect={(value: string[]) => {
            inputDispatch({
              type: "edit_input_value_for_multi_select",
              value,
            });
          }}
        />
      );
    } else if (formValues.kind === "range") {
      return (
        <RangePreview
          kind={formValues.kind}
          min={formValues.min}
          max={formValues.max}
          step={formValues.step}
          inputValue={inputValue}
          setInputValueUsingECB={(e: React.ChangeEvent<HTMLInputElement>) => {
            inputDispatch({ type: "edit_input_value_using_e", e });
          }}
        />
      );
    } else {
      return (
        <TextPreview
          fieldType={formValues.fieldType}
          inputValue={inputValue}
          setInputValueUsingECB={(e: React.ChangeEvent<HTMLInputElement>) => {
            inputDispatch({ type: "edit_input_value_using_e", e });
          }}
        />
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center text-2xl font-bold">{title}</div>
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
            stateFormIndexDispatch({
              type: "decrease_index_value",
            });
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
            stateFormIndexDispatch({
              type: "increase_index_value",
            });
            console.log(stateFormIndex);
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
            stateFormIndexDispatch({
              type: "increase_index_value",
            });
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
