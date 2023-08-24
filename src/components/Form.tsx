import React, { useEffect, useRef, useState } from "react";
import LabelledInput from "./LabelledInput";
import { getLocalForms, Options, saveFormData } from "./utils";

import { formField } from "./types";
import { Link } from "raviger";
import { Error } from "./Error";

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
          id: 404,
          title: "Wrong Form",
          formFields: [],
        };
  });

  const [newField, setNewField] = useState({
    type: "text",
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
  }, [state]);

  if (!state || state.id === 404) {
    return <Error />;
  }

  const addField = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          id: Number(new Date()),
          label: newField.value,
          type: newField.type,
          value: "",
        },
      ],
    });
    setNewField({
      type: "text",
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

  const columnChangeHandler = (id: number, label: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field: formField) =>
        field.id === id ? { ...field, label } : field,
      ),
    });
  };

  const typeChangeHandler = (id: number, type: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field: formField) =>
        field.id === id
          ? {
              ...field,
              type,
            }
          : field,
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
            label={field.label}
            type={field.type}
            count={state.formFields.indexOf(field) + 1}
            removeFieldCB={removeField}
            fieldChangeHandlerCB={fieldChangeHandler}
            columnChangeHandlerCB={columnChangeHandler}
            typeChangeHandlerCB={typeChangeHandler}
          />
        ))}

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
              setNewField({
                ...newField,
                type: e.target.value,
              });
            }}
            value={newField.type}
          >
            <Options />
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
