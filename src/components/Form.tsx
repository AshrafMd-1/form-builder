import React, {useEffect, useRef, useState} from "react";
import {checkFormBasedOnID, getLocalForms, Options, saveFormData,} from "../utils/utils";

import {formField} from "../types/formTypes";
import {Link} from "raviger";
import {Error} from "./Error";

import LabelledInputs from "./Inputs/LabelledInputs";
import MultiSelectInputs from "./Inputs/MultiSelectInputs";
import {RangeInputs} from "./Inputs/RangeInputs";

export const getFormBasedOnID = (id: number) => {
  const localForms = getLocalForms();
  return localForms.find((form) => form.id === id);
};

export default function Form(props: { formId: number }) {
  const [state, setState] = useState(() => {
    const form = getFormBasedOnID(props.formId);
    return form
        ? form
        : {
          id: props.formId,
          title: "Sample Form",
          formFields: [],
        };
  });
  const [newField, setNewField] = useState(
      {
        fieldType: "",
        value: "",
      });

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("Component Mounted");
    document.title = "Form Editor";

    titleRef.current?.focus();
    return () => {
      document.title = "React App";
    };
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(state);
      console.log("State Saved To Local Storage");
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state])

  if (!checkFormBasedOnID(props.formId)) {
    return (
        <Error
            errorMsg="Form Not Found"
            desc="A form with this ID does not exist"
        />
    );
  }

  const addField = () => {
    if (newField.fieldType === "multi-select") {
      setState({
        ...state,
        formFields: [
          ...state.formFields,
          {
            kind: "multi-select",
            id: Number(new Date()),
            label: newField.value,

            options: [
              "Sample Option 1",
            ],
            value: []
          }
        ],
      });
    } else if (newField.fieldType === "radio") {
      setState({
        ...state,
        formFields: [
          ...state.formFields,
          {
            kind: "radio",
            id: Number(new Date()),
            label: newField.value,
            options: ["Sample Option 1"],
            value: "",
          }
        ],
      });
    } else if (newField.fieldType === "range") {
      setState({
        ...state,
        formFields: [
          ...state.formFields,
          {
            kind: "range",
            id: Number(new Date()),
            label: newField.value,
            min: 0,
            max: 100,
            step: 1,
            value: 0,
          }
        ],
      });
    } else {
      setState({
        ...state,
        formFields: [
          ...state.formFields,
          {
            kind: "text",
            id: Number(new Date()),
            label: newField.value,
            fieldType: "text",
            value: "",
          }
        ],
      });
    }
    setNewField({
      fieldType: "text",
      value: "",
    });
  };

  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter(
          (field: formField) => field.id !== id,
      ),
    });
  };

  const changeTitle = (title: string) => {
    setState({...state, title: title});
  };


  const columnChangeHandler = (id: number, label: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field: formField) =>
          field.id === id ? {...field, label} : field,
      ),
    });
  };

  const typeChangeHandler = (id: number, type: string) => {
    if (type === "radio") {
      setState({
        ...state,
        formFields: state.formFields.map((field: formField) =>
            field.id === id ? {
              id: field.id,
              label: field.label,
              kind: "radio",
              options: ["Sample Option 1"],
              value: "",
            } : field,
        ),
      })
    } else if (type === "multi-select") {
      setState({
        ...state,
        formFields: state.formFields.map((field: formField) =>
            field.id === id ? {
              id: field.id,
              label: field.label,
              kind: "multi-select",
              options: ["Sample Option 1"],
              value: [],
            } : field,
        ),
      })
    } else if (type === "range") {
      setState({
        ...state,
        formFields: state.formFields.map((field: formField) =>
            field.id === id ? {
              id: field.id,
              label: field.label,
              kind: "range",
              min: 0,
              max: 100,
              step: 1,
              value: 0,
            } : field,
        ),
      })
    } else {
      setState({
        ...state,
        formFields: state.formFields.map((field: formField) =>
            field.id === id ? {
              id: field.id,
              label: field.label,
              kind: "text",
              fieldType: type,
              value: "",
            } : field,
        ),
      })
    }
  };

  const addOption = (id: number, option: string) => {
    if (option === "") return;
    setState({
      ...state,
      formFields: state.formFields.map((field: formField) =>
          field.id === id && (field.kind === "radio" || field.kind === "multi-select")
              ? {
                ...field,
                options: [...new Set([...field.options, option])],
              }
              : field
      ),
    });
  };


  const removeOption = (id: number, index: number) => {
    const allOptions = state.formFields.find((field: formField) => field.id === id)
    setState({
      ...state,
      formFields: state.formFields.map((field: formField) => {
            if (field.id === id && (field.kind === "radio" || field.kind === "multi-select")) {
              field.options.splice(index, 1);
              return field;
            } else {
              return field;
            }
          }
      ),
    });
    if (allOptions && (allOptions.kind === "radio" || allOptions.kind === "multi-select") && allOptions.options.length === 0) {
      addOption(id, "Sample Option 1")
    }
  }

  const rangeMinChangeHandler = (id: number, min: number) => {
    setState({
      ...state,
      formFields: state.formFields.map((field: formField) =>
          field.id === id && field.kind === "range"
              ? {
                ...field,
                min: min,
              }
              : field,
      ),
    });
  }

  const rangeMaxChangeHandler = (id: number, max: number) => {
    setState({
      ...state,
      formFields: state.formFields.map((field: formField) =>
          field.id === id && field.kind === "range"
              ? {
                ...field,
                max: max,
              }
              : field,
      ),
    });
  }

  const rangeStepChangeHandler = (id: number, step: number) => {
    setState({
      ...state,
      formFields: state.formFields.map((field: formField) =>
          field.id === id && field.kind === "range"
              ? {
                ...field,
                step: step,
              }
              : field,
      ),
    });
  }

  const renderInputTypes = (field: formField, index: number) => {
    if (field.kind === "radio" || field.kind === "multi-select") {
      return (
          <MultiSelectInputs
              key={field.id}
              id={field.id}
              label={field.label}
              option={field.options}
              kind={field.kind}
              count={index + 1}
              removeFieldCB={removeField}
              columnChangeHandlerCB={columnChangeHandler}
              typeChangeHandlerCB={typeChangeHandler}
              addOptionCB={addOption}
              removeOptionCB={removeOption}
          />
      )
    } else if (field.kind === "range") {
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
              removeFieldCB={removeField}
              columnChangeHandlerCB={columnChangeHandler}
              typeChangeHandlerCB={typeChangeHandler}
              rangeMinChangeHandlerCB={rangeMinChangeHandler}
              rangeMaxChangeHandlerCB={rangeMaxChangeHandler}
              rangeStepChangeHandlerCB={rangeStepChangeHandler}
          />
      )
    } else {
      return (
          <LabelledInputs
              key={field.id}
              id={field.id}
              label={field.label}
              fieldType={field.fieldType}
              count={index + 1}
              removeFieldCB={removeField}
              columnChangeHandlerCB={columnChangeHandler}
              typeChangeHandlerCB={typeChangeHandler}
          />
      )
    }
  }

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
                  changeTitle(e.target.value);
                }}
                ref={titleRef}
            />
          </div>
          {
            state.formFields.map((field: formField, index: number) => (
                renderInputTypes(field, index)
            ))
          }
          <div className="flex gap-3 justify-between items-center mb-4">
            <input
                type="text"
                value={newField.value}
                className="border-2 border-gray-300 rounded-md  mt-1 w-full h-10 px-2 text-lg focus:outline-none focus:border-blue-500"
                placeholder="New Field Title"
                onChange={(e) => {
                  setNewField({
                    ...newField,
                    value: e.target.value,
                  });
                }}
            />
            <select
                className="border-2 border-gray-300 rounded-md  mt-1  h-10 px-2 text-lg focus:outline-none focus:border-blue-500"
                onChange={(e) => {
                  const chosenInput = e.target.value;
                  if (chosenInput === "radio") {
                    setNewField({
                      ...newField,
                      fieldType: "radio",
                    });
                  } else if (chosenInput === "multi-select") {
                    setNewField({
                      ...newField,
                      fieldType: "multi-select"
                    });
                  } else if (chosenInput === "range") {
                    setNewField({
                          ...newField,
                          fieldType: "range"
                        }
                    )
                  } else {
                    setNewField({
                      ...newField,
                      fieldType: "text",
                    });
                  }
                }}
                value={newField.fieldType}
            >
              <Options/>
            </select>
            <button
                className="mt-auto mb-auto ml-2 bg-blue-500 hover:bg-blue-600 text-white pl-3 pr-3 font-bold  rounded-lg focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                onClick={() => addField()}
            >
              Add Field
            </button>
          </div>
          <div className="flex justify-end">
            <button
                onClick={(_) => {
                  saveFormData(state);
                }}
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

