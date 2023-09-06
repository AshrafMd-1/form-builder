import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  checkFormBasedOnID,
  getLocalForms,
  Options,
  saveFormData,
} from "../utils/utils";
import { formData, formField } from "../types/formTypes";
import { Link } from "raviger";
import { Error } from "./Error";
import LabelledInputs from "./Inputs/LabelledInputs";
import MultiSelectInputs from "./Inputs/MultiSelectInputs";
import { RangeInputs } from "./Inputs/RangeInputs";
import { FormAction } from "../types/formReducerTypes";

const getFormBasedOnID = (id: number) => {
  const localForms = getLocalForms();
  const form = localForms.find((form) => form.id === id);
  return form || { id: 0, title: "Sample Form", formFields: [] };
};

const reducer = (state: formData, action: FormAction) => {
  switch (action.type) {
    case "change_form_title":
      return { ...state, title: action.title };
    case "add_field_to_form":
      action.callback();
      return {
        ...state,
        formFields: action.formField
          ? [...state.formFields, action.formField]
          : [...state.formFields],
      };
    case "remove_field_from_form":
      return {
        ...state,
        formFields: state.formFields.filter(
          (field: formField) => field.id !== action.id,
        ),
      };
    case "edit_form_field_label":
      return {
        ...state,
        formFields: state.formFields.map((field: formField) =>
          field.id === action.id
            ? {
                ...field,
                label: action.label,
              }
            : field,
        ),
      };
    case "add_option_to_form_field":
      return {
        ...state,
        formFields: state.formFields.map((field: formField) =>
          (field.kind === "radio" || field.kind === "multi-select") &&
          field.id === action.id
            ? {
                ...field,
                options:
                  field.options.length > 0 &&
                  field.options.includes("Sample Option 1")
                    ? [
                        ...field.options.slice(
                          0,
                          field.options.indexOf("Sample Option 1"),
                        ),
                        action.option,
                      ]
                    : [...new Set([...field.options, action.option])],
              }
            : field,
        ),
      };
    case "remove_option_from_form_field":
      return {
        ...state,
        formFields: state.formFields.map((field: formField) =>
          (field.kind === "radio" || field.kind === "multi-select") &&
          field.id === action.id
            ? {
                ...field,
                options:
                  field.options.length === 1
                    ? ["Sample Option 1"]
                    : [
                        ...field.options.slice(0, action.index),
                        ...field.options.slice(action.index + 1),
                      ],
              }
            : field,
        ),
      };
    case "edit_range_min_of_form_field":
      return {
        ...state,
        formFields: state.formFields.map((field: formField) =>
          field.id === action.id && field.kind === "range"
            ? {
                ...field,
                min: action.min,
              }
            : field,
        ),
      };
    case "edit_range_max_of_form_field":
      return {
        ...state,
        formFields: state.formFields.map((field: formField) =>
          field.id === action.id && field.kind === "range"
            ? {
                ...field,
                max: action.max,
              }
            : field,
        ),
      };
    case "edit_range_step_of_form_field":
      return {
        ...state,
        formFields: state.formFields.map((field: formField) =>
          field.id === action.id && field.kind === "range"
            ? {
                ...field,
                step: action.step,
              }
            : field,
        ),
      };
    default:
      return state;
  }
};

export default function Form(props: { formId: number }) {
  const [state, dispatch] = useReducer(reducer, getFormBasedOnID(props.formId));
  const [newField, setNewField] = useState({ fieldType: "text", value: "" });
  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.title = "Form Editor";
    titleRef.current?.focus();
    return () => {
      document.title = "React App";
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveFormData(state);
      console.log("State Saved To Local Storage");
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  if (!checkFormBasedOnID(props.formId)) {
    return (
      <Error
        errorMsg="Form Not Found"
        desc="A form with this ID does not exist"
      />
    );
  }

  const renderInputTypes = (field: formField, index: number) => {
    switch (field.kind) {
      case "radio":
      case "multi-select":
        return (
          <MultiSelectInputs
            key={field.id}
            id={field.id}
            label={field.label}
            option={field.options}
            kind={field.kind}
            count={index + 1}
            removeFieldCB={(id: number) =>
              dispatch({ type: "remove_field_from_form", id })
            }
            columnChangeHandlerCB={(id: number, label: string) =>
              dispatch({
                type: "edit_form_field_label",
                id,
                label,
              })
            }
            addOptionCB={(id: number, option: string) =>
              dispatch({ type: "add_option_to_form_field", id, option })
            }
            removeOptionCB={(id: number, index: number) =>
              dispatch({
                type: "remove_option_from_form_field",
                id,
                index,
              })
            }
          />
        );
      case "range":
        return (
          <RangeInputs
            key={field.id}
            id={field.id}
            label={field.label}
            min={field.min}
            max={field.max}
            count={index + 1}
            step={field.step}
            kind={field.kind}
            removeFieldCB={(id: number) =>
              dispatch({ type: "remove_field_from_form", id })
            }
            columnChangeHandlerCB={(id: number, label: string) =>
              dispatch({
                type: "edit_form_field_label",
                id,
                label,
              })
            }
            rangeMinChangeHandlerCB={(id: number, min: number) =>
              dispatch({
                type: "edit_range_min_of_form_field",
                id,
                min,
              })
            }
            rangeMaxChangeHandlerCB={(id: number, max: number) =>
              dispatch({
                type: "edit_range_max_of_form_field",
                id,
                max,
              })
            }
            rangeStepChangeHandlerCB={(id: number, step: number) =>
              dispatch({
                type: "edit_range_step_of_form_field",
                id,
                step,
              })
            }
          />
        );
      default:
        return (
          <LabelledInputs
            key={field.id}
            id={field.id}
            label={field.label}
            fieldType={field.fieldType}
            count={index + 1}
            removeFieldCB={(id: number) =>
              dispatch({ type: "remove_field_from_form", id })
            }
            columnChangeHandlerCB={(id: number, label: string) =>
              dispatch({
                type: "edit_form_field_label",
                id,
                label,
              })
            }
          />
        );
    }
  };

  return (
    <>
      <div className="p-4 border border-gray-300 rounded-lg shadow-md">
        <div>
          <input
            type="text"
            value={state.title}
            className="border-2 mb-1 border-gray-300 rounded-md  mt-1 w-full h-10 px-2 text-lg focus:outline-none focus:border-blue-500"
            placeholder="New Form Title"
            onChange={(e) => {
              dispatch({ type: "change_form_title", title: e.target.value });
            }}
            ref={titleRef}
          />
        </div>
        {state.formFields.map((field: formField, index: number) =>
          renderInputTypes(field, index),
        )}
        <div className="flex gap-3 justify-between items-center mb-4">
          <input
            type="text"
            value={newField.value}
            className="border-2 border-gray-300 rounded-md  mt-1 w-full h-10 px-2 text-lg focus:outline-none focus:border-blue-500"
            placeholder="New Field Title"
            onChange={(e) => {
              setNewField({ ...newField, value: e.target.value });
            }}
          />
          <select
            className="border-2 border-gray-300 rounded-md  mt-1  h-10 px-2 text-lg focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              const chosenInput = e.target.value;
              setNewField({ ...newField, fieldType: chosenInput });
            }}
            value={newField.fieldType}
          >
            <Options />
          </select>
          <button
            className="mt-auto mb-auto ml-2 bg-blue-500 hover:bg-blue-600 text-white pl-3 pr-3 font-bold  rounded-lg focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            onClick={() => {
              let newForm: formField;
              switch (newField.fieldType) {
                case "radio":
                  newForm = {
                    kind: "radio",
                    id: Number(new Date()),
                    label: newField.value,
                    options: ["Sample Option 1"],
                    value: "",
                  };
                  break;
                case "multi-select":
                  newForm = {
                    kind: "multi-select",
                    id: Number(new Date()),
                    label: newField.value,
                    options: ["Sample Option 1"],
                    value: [],
                  };
                  break;
                case "range":
                  newForm = {
                    kind: "range",
                    id: Number(new Date()),
                    label: newField.value,
                    min: 0,
                    max: 100,
                    step: 1,
                    value: 0,
                  };
                  break;
                default:
                  newForm = {
                    kind: "text",
                    id: Number(new Date()),
                    label: newField.value,
                    fieldType: newField.fieldType,
                    value: "",
                  };
              }
              dispatch({
                type: "add_field_to_form",
                formField: newForm,
                callback: () => setNewField({ fieldType: "text", value: "" }),
              });
            }}
          >
            Add Field
          </button>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => saveFormData(state)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-2 focus:outline-none focus:shadow-outline-green active:bg-green-800"
          >
            Save
          </button>
          <Link
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-2 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            href="/"
          >
            Close Form
          </Link>
        </div>
      </div>
    </>
  );
}
