import React, { useEffect, useReducer, useRef, useState } from "react";
import { getLocalForms, Options, saveFormData } from "../utils/utils";
import { formData, formField } from "../types/formTypes";
import { Link } from "raviger";
import LabelledInputs from "./Inputs/LabelledInputs";
import MultiSelectInputs from "./Inputs/MultiSelectInputs";
import { FormAction } from "../types/formReducerTypes";
import {
  addFormField,
  deleteFormField,
  getFormDetails,
  getFormFields,
  me,
  updateOptionOfFormField,
  updateTitle,
} from "../utils/apiUtils";
import { Error } from "./Error";
import { User } from "../types/userTypes";

const getFormBasedOnID = (id: number) => {
  const localForms = getLocalForms();
  const form = localForms.find((form) => form.id === id);
  return form || { id: 0, title: "Sample Form", formFields: [] };
};

const reducer = (state: formData, action: FormAction) => {
  switch (action.type) {
    case "update_form_details":
      return { ...state, id: action.id, title: action.title };
    case "update_form_fields":
      return { ...state, formFields: action.formFields };
    case "change_form_title": {
      return { ...state, title: action.title };
    }
    case "add_field_to_form": {
      action.callback();
      return {
        ...state,
        formFields: action.formField
          ? [...state.formFields, action.formField]
          : [...state.formFields],
      };
    }
    case "remove_field_from_form":
      return {
        ...state,
        formFields: state.formFields.filter(
          (field: formField) => field.id !== action.id,
        ),
      };
    case "add_option_to_form_field": {
      return {
        ...state,
        formFields: state.formFields.map((field: formField) =>
          (field.kind === "RADIO" || field.kind === "DROPDOWN") &&
          field.id === action.id
            ? {
                ...field,
                options:
                  field.options.options.length > 0 &&
                  field.options.options.includes("Sample Option 1")
                    ? {
                        options: [
                          ...field.options.options.slice(
                            0,
                            field.options.options.indexOf("Sample Option 1"),
                          ),
                          action.option,
                        ],
                      }
                    : {
                        options: [
                          ...new Set([...field.options.options, action.option]),
                        ],
                      },
              }
            : field,
        ),
      };
    }
    case "remove_option_from_form_field":
      return {
        ...state,
        formFields: state.formFields.map((field: formField) =>
          (field.kind === "RADIO" || field.kind === "DROPDOWN") &&
          field.id === action.id
            ? {
                ...field,
                options:
                  field.options.options.length === 1
                    ? {
                        options: ["Sample Option 1"],
                      }
                    : {
                        options: [
                          ...field.options.options.slice(0, action.index),
                          ...field.options.options.slice(action.index + 1),
                        ],
                      },
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
  const [newField, setNewField] = useState({ fieldType: "TEXT", value: "" });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [notFound, setNotFound] = useState(false);

  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    me().then((data) => {
      setCurrentUser(data.results[0]);
    });
  }, []);

  useEffect(() => {
    document.title = "Form Editor";
    titleRef.current?.focus();
    return () => {
      document.title = "React App";
    };
  }, []);

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const form = await getFormDetails(props.formId);

        dispatch({
          type: "update_form_details",
          id: form.id,
          title: form.title,
        });
      } catch (err) {
        setNotFound(true);
        console.error(err);
      }
    };
    const fetchFormFields = async () => {
      try {
        const formFields = await getFormFields(props.formId).then(
          (data) => data.results,
        );
        dispatch({
          type: "update_form_fields",
          formFields,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchFormDetails();
    fetchFormFields();
  }, []);

  useEffect(() => {
    if (state.title === "" || state.id === 0) return;
    const timeout = setTimeout(() => {
      updateTitle(props.formId, state.title);
      console.log("Title Updated");
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [state.title]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveFormData(state);
      console.log("State Saved To Local Storage");
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  const renderInputTypes = (field: formField, index: number) => {
    switch (field.kind) {
      case "RADIO":
      case "DROPDOWN":
        return (
          <MultiSelectInputs
            key={field.id}
            id={field.id}
            label={field.label}
            option={field.options.options}
            kind={field.kind}
            count={index + 1}
            removeFieldCB={(id: number) => {
              deleteFormField(props.formId, id);
              dispatch({ type: "remove_field_from_form", id });
            }}
            addOptionCB={(
              id: number,
              label: string,
              kind: string,
              option: string,
            ) => {
              if (option === "") return;
              const currentOption = state.formFields.filter(
                (field: formField) => {
                  return (
                    (field.kind === "RADIO" || field.kind === "DROPDOWN") &&
                    field.id === id
                  );
                },
              );

              let newOptions = currentOption.map((field: formField) => {
                if (field.kind === "RADIO" || field.kind === "DROPDOWN") {
                  return {
                    options:
                      field.options.options.length > 0 &&
                      field.options.options.includes("Sample Option 1")
                        ? [
                            ...field.options.options.slice(
                              0,
                              field.options.options.indexOf("Sample Option 1"),
                            ),
                            option,
                          ]
                        : [...new Set([...field.options.options, option])],
                  };
                }
              });
              if (
                newOptions[0] &&
                newOptions[0].options &&
                newOptions[0].options.length > 0
              ) {
                newOptions[0].options = newOptions[0].options.filter(
                  (option) => option !== "",
                );
                updateOptionOfFormField(
                  props.formId,
                  id,
                  label,
                  kind,
                  newOptions[0],
                );
                dispatch({ type: "add_option_to_form_field", id, option });
              }
            }}
            removeOptionCB={(
              id: number,
              label: string,
              kind: string,
              option: string,
            ) => {
              const currentOption = state.formFields.filter(
                (field: formField) => {
                  return (
                    (field.kind === "RADIO" || field.kind === "DROPDOWN") &&
                    field.id === id
                  );
                },
              );
              let newOptions = currentOption.map((field: formField) => {
                if (field.kind === "RADIO" || field.kind === "DROPDOWN") {
                  return {
                    options:
                      field.options.options.length === 1
                        ? {
                            options: ["Sample Option 1"],
                          }
                        : {
                            options: [
                              ...field.options.options.slice(
                                0,
                                field.options.options.indexOf(option),
                              ),
                              ...field.options.options.slice(
                                field.options.options.indexOf(option) + 1,
                              ),
                            ],
                          },
                  };
                }
              });
              if (
                newOptions[0] &&
                newOptions[0].options &&
                newOptions[0].options.options.length > 0
              ) {
                newOptions[0].options.options =
                  newOptions[0].options.options.filter(
                    (option) => option !== "",
                  );
                updateOptionOfFormField(
                  props.formId,
                  id,
                  label,
                  kind,
                  newOptions[0].options,
                );
                dispatch({
                  type: "remove_option_from_form_field",
                  id,
                  index,
                });
              }
            }}
          />
        );
      default:
        return (
          <LabelledInputs
            key={field.id}
            id={field.id}
            label={field.label}
            fieldType={field.kind}
            count={index + 1}
            removeFieldCB={(id: number) => {
              deleteFormField(props.formId, id);
              dispatch({ type: "remove_field_from_form", id });
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

  return (
    <>
      <div className="p-4 border border-gray-300 rounded-lg shadow-md">
        <div>
          <input
            type="Text"
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
            onClick={async () => {
              let newForm: formField;
              switch (newField.fieldType) {
                case "RADIO":
                  newForm = {
                    kind: "RADIO",
                    id: Number(new Date()),
                    label: newField.value,
                    options: {
                      options: ["Sample Option 1"],
                    },
                    value: "",
                  };
                  break;
                case "DROPDOWN":
                  newForm = {
                    kind: "DROPDOWN",
                    id: Number(new Date()),
                    label: newField.value,
                    options: {
                      options: ["Sample Option 1"],
                    },
                    value: "",
                  };
                  break;
                default:
                  newForm = {
                    kind: "TEXT",
                    id: Number(new Date()),
                    label: newField.value,
                    value: "",
                  };
              }

              const response = await addFormField(state.id, newForm);
              newForm.id = response.id;
              dispatch({
                type: "add_field_to_form",
                formField: newForm,
                callback: () => setNewField({ fieldType: "TEXT", value: "" }),
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
