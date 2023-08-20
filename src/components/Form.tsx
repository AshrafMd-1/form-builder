import React, { useEffect, useRef, useState } from "react";
import LabelledInput from "./LabelledInput";
import { getLocalForms, saveLocalForms } from "./utils";
import { formData, formField } from "./types";

export const getFormBasedOnID = (id: number) => {
  const localForms = getLocalForms();
  return localForms.find((form) => form.id === id);
};

export const saveFormData = (currentState: formData) => {
  const localForms = getLocalForms();
  const updateLocalForms = localForms.map((form) =>
    form.id === currentState.id ? currentState : form,
  );
  saveLocalForms(updateLocalForms);
};

export default function Form(props: { formId: number }) {
  const [state, setState] = useState(() => {
    const form = getFormBasedOnID(props.formId);
    return form ? form : getLocalForms()[0];
  });
  const [newField, setNewField] = useState("");
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
  }, [state]);

  const addField = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          id: Number(new Date()),
          label: newField,
          type: "text",
          value: "",
        },
      ],
    });
    setNewField("");
  };

  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter(
        (field: formField) => field.id !== id,
      ),
    });
  };

  const clearForm = () => {
    setState({
      ...state,
      formFields: state.formFields.map((field: formField) => ({
        ...field,
        value: "",
      })),
    });
  };

  const changeTitle = (title: string) => {
    const localForms = getLocalForms();
    const updateLocalForms = localForms.map((form) =>
      form.id === state.id ? { ...form, title: title } : form,
    );
    saveLocalForms(updateLocalForms);
    setState({ ...state, title: title });
  };

  const fieldChangeHandler = (id: number, value: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field: formField) =>
        field.id === id ? { ...field, value } : field,
      ),
    });
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
              changeTitle(e.target.value);
            }}
            ref={titleRef}
          />
        </div>

        {state.formFields.map((field: formField) => (
          <LabelledInput
            id={field.id}
            key={field.id}
            value={field.value}
            label={field.label}
            type={field.type}
            removeFieldCB={removeField}
            fieldChangeHandlerCB={fieldChangeHandler}
          />
        ))}

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={newField}
            className="border-2 border-gray-300 rounded-md  mt-1 w-full h-10 px-2 text-lg focus:outline-none focus:border-blue-500"
            placeholder="New Field Title"
            onChange={(e) => {
              setNewField(e.target.value);
            }}
          />
          <button
            className="mt-auto mb-auto ml-2 bg-blue-500 hover:bg-blue-600 text-white pl-3 pr-3 font-bold  rounded-lg focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            onClick={addField}
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
          <a
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-2 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            href="/"
          >
            Close Form
          </a>
          <button
            className="bg-red-500 font-bold text-white px-4 py-2 rounded-xl active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
            onClick={clearForm}
          >
            Clear Form
          </button>
        </div>
      </div>
    </>
  );
}
