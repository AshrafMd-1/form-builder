import React, { useEffect, useRef, useState } from "react";
import LabelledInput from "./LabelledInput";
import { AllForms } from "./AllForms";

export interface formData {
  id: number;
  title: string;
  formFields: formField[];
}

interface formField {
  id: number;
  label: string;
  type: string;
  value: string;
}

const initialFormFields: formField[] = [
  { id: 1, label: "First Name", type: "text", value: "" },
  {
    id: 2,
    label: "Last Name",
    type: "text",
    value: "",
  },
  {
    id: 3,
    label: "Email",
    type: "email",
    value: "",
  },
  {
    id: 4,
    label: "Date of Birth",
    type: "date",
    value: "",
  },
  {
    id: 5,
    label: "Phone Number",
    type: "text",
    value: "",
  },
];

const getLocalForms: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

const initialState: () => formData = () => {
  const localForms = getLocalForms();
  if (localForms.length > 0) {
    return localForms[0];
  }
  const newForm = {
    id: Number(new Date()),
    title: "Untitled Form",
    formFields: initialFormFields,
  };
  saveLocalForms([...localForms, newForm]);
  return newForm;
};

const saveLocalForms = (localForm: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForm));
};

const saveFormData = (currentState: formData) => {
  const localForms = getLocalForms();
  const updateLocalForms = localForms.map((form) =>
    form.id === currentState.id ? currentState : form,
  );
  saveLocalForms(updateLocalForms);
};

export default function Form(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(() => initialState());
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
  const addForm = () => {
    const localForms = getLocalForms();
    const newForm = {
      id: Number(new Date()),
      title: "Untitled Form",
      formFields: initialFormFields,
    };
    saveLocalForms([...localForms, newForm]);
    setState(newForm);
  };

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

  const removeForm = (id: number) => {
    const localForms = getLocalForms();
    if (localForms.length > 1) {
      const newLocalForms = localForms.filter((form) => form.id !== id);
      if (state.id === id) {
        setState(newLocalForms[0]);
      } else {
        const currentFormIndex = newLocalForms.findIndex(
          (form) => form.id === state.id,
        );
        setState(newLocalForms[currentFormIndex]);
      }
      saveLocalForms(newLocalForms);
    }
  };

  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    });
  };

  const clearForm = () => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => ({
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
      formFields: state.formFields.map((field) =>
        field.id === id ? { ...field, value } : field,
      ),
    });
  };

  return (
    <>
      <AllForms
        localStorage={getLocalForms()}
        selectFormCB={(form: formData) => setState(form)}
        addFormCB={addForm}
        removeFormCB={removeForm}
      />
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

        {state.formFields.map((field) => (
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
              setState({
                ...state,
              });
            }}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-2 focus:outline-none focus:shadow-outline-green active:bg-green-800"
          >
            Save
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-2 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            onClick={props.closeFormCB}
          >
            Close Form
          </button>
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
