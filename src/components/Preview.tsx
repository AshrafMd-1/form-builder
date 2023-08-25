import React, {useEffect, useState} from "react";
import {getLocalForms} from "../utils/utils";
import {navigate} from "raviger";
import {formField} from "../types/formTypes";
import {Error} from "./Error";
import {TextPreview} from "./Previews/TextPreview";
import {RadioPreview} from "./Previews/RadioPreview";
import {MultiSelectPreview} from "./Previews/MultiSelectPreview";
import {RangePreview} from "./Previews/RangePreview";

export default function Preview(props: { formId: number }) {
  const [state] = useState(() => {
    const form = getLocalForms().find((form) => form.id === props.formId);
    return form
        ? form
        : {
          id: 404,
          title: "Wrong Form",
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
    return () => {
    };
  }, [stateFormFieldIndex, inputValue]);

  if (!state || state.id === 404 || state.formFields.length === 0) {
    return <Error/>;
  }

  const title = state.title

  const setInputValueUsingE = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const setInputValueForRadio = (value: string) => {
    setInputValue(value);
  }

  const renderField = (formValues: formField) => {

    if (formValues.kind === "radio") {
      return (
          <RadioPreview
              formValues={formValues}
              setInputValueFunctionForRadioCB={setInputValueForRadio}/>
      );
    } else if (formValues.kind === "multi-select") {
      return (
          <MultiSelectPreview/>
      );
    } else if (formValues.kind === "range") {
      return (
          <RangePreview
              formValues={formValues}
              inputValue={inputValue}
              setInputValueUsingECB={setInputValueUsingE}/>
      );
    } else {
      return (
          <TextPreview
              formValues={formValues}
              inputValue={inputValue}
              setInputValueUsingECB={setInputValueUsingE}/>
      );
    }
  }


  return (
      <div className="flex flex-col justify-center items-center">
        <div className="text-center text-2xl font-bold">{title}</div>
        <div className="flex flex-col justify-center items-center mt-5 border-2 border-gray-300 p-5 rounded-lg">
          <label className="text-center text-xl font-bold">
            {state.formFields[stateFormFieldIndex].label}
          </label>
          <p>
            {inputValue}
          </p>
          {renderField(state.formFields[stateFormFieldIndex])}
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
                if (form[stateFormFieldIndex - 1]) setInputValue(form[stateFormFieldIndex - 1]);
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
                if (form[stateFormFieldIndex + 1]) setInputValue(form[stateFormFieldIndex + 1]);
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