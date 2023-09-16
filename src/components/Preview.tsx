import React, { useEffect, useReducer, useState } from "react";
import { getLocalForms } from "../utils/utils";
import { navigate } from "raviger";
import { formAnswers, formField } from "../types/formTypes";
import { TextPreview } from "./Previews/TextPreview";
import { RadioPreview } from "./Previews/RadioPreview";
import { MultiSelectPreview } from "./Previews/MultiSelectPreview";
import { InputValueActions } from "../types/previewReducerTypes";
import {
  getFormDetails,
  getFormFields,
  me,
  submitForm,
} from "../utils/apiUtils";
import { Error } from "./Error";

export const initialState = (id: number) => {
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
  const [state, setState] = useState(() => initialState(props.formId));
  const [form, setForm] = useState<formAnswers[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [stateFormIndex, setStateFormIndex] = useState(0);

  const [inputValue, inputDispatch] = useReducer(inputReducer, "");

  useEffect(() => {
    me().then((data) => {
      setCurrentUser(data.results[0]);
    });
  }, []);

  useEffect(() => {
    setForm((form) => {
      const newForm = [...form];
      newForm[stateFormIndex] = {
        form_field: state.formFields[stateFormIndex]?.id || 0,
        value: inputValue,
      };
      return newForm;
    });
    return () => {};
  }, [stateFormIndex, inputValue, state.formFields]);

  const title = state.title;

  useEffect(() => {
    const fetchFormDetailsAndFields = async () => {
      try {
        const form = await getFormDetails(props.formId);
        const formFields = await getFormFields(props.formId).then(
          (data) => data.results,
        );
        setState((state) => ({
          ...state,
          id: form.id,
          title: form.title,
          formFields,
        }));
      } catch (err) {
        setNotFound(true);
        console.error(err);
      }
    };
    fetchFormDetailsAndFields();
  }, [props.formId]);

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

  if (notFound)
    return (
      <Error
        errorMsg="Form Not Found"
        desc="A form with this ID does not exist"
      />
    );

  if (!currentUser)
    return (
      <Error
        errorMsg={"Login Required"}
        desc={"You need to login to access this page"}
      />
    );

  if (!state || !state.formFields)
    return (
      <Error
        errorMsg={"Preview Not Available"}
        desc={"This form is not available for preview"}
      />
    );

  if (state.formFields.length === 0)
    return (
      <Error
        errorMsg={"Preview Not Available"}
        desc={"This form has no fields"}
      />
    );

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
                value: form[stateFormIndex - 1].value,
              });
            else inputDispatch({ type: "set_empty_input_value" });
          }}
        >
          previous
        </button>
        <button
          className="border-2 text-white bg-blue-600 rounded-lg p-2 m-2 disabled:hidden"
          disabled={
            stateFormIndex === state.formFields.length - 1 ||
            inputValue.length === 0
          }
          onClick={() => {
            setStateFormIndex((stateFormIndex) => stateFormIndex + 1);
            if (form[stateFormIndex + 1])
              inputDispatch({
                type: "set_input_value_based_on_index",
                value: form[stateFormIndex + 1].value,
              });
            else inputDispatch({ type: "set_empty_input_value" });
          }}
        >
          Next
        </button>
        <button
          className="border-2 text-white bg-green-500 rounded-lg p-2 m-2 disabled:hidden"
          disabled={
            stateFormIndex !== state.formFields.length - 1 ||
            inputValue.length === 0
          }
          onClick={() => {
            setStateFormIndex((stateFormIndex) => stateFormIndex + 1);
            console.log(form);
            submitForm(props.formId, form, {
              title: state.title,
            });
            navigate("/");
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
