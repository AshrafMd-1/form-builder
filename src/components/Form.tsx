import React, { useState } from "react";
import LabelledInput from "./LabelledInput";

const formFields = [
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

export default function Form(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(formFields);
  const [newField, setNewField] = useState("");

  const addField = () => {
    setState([
      ...state,
      {
        id: Number(new Date()),
        label: newField,
        type: "text",
        value: "",
      },
    ]);
    setNewField("");
  };

  const removeField = (id: number) => {
    setState(state.filter((field) => field.id !== id));
  };

  const clearForm = () => {
    setState(
      state.map((field) => ({
        ...field,
        value: "",
      })),
    );
  };

  const controlField = (id: number, value: string) => {
    setState(
      state.map((field) => ({
        ...field,
        value: field.id === id ? value : field.value,
      })),
    );
  };
  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md">
      {state.map((field) => (
        <LabelledInput
          id={field.id}
          key={field.id}
          value={field.value}
          label={field.label}
          type={field.type}
          removeFieldCB={removeField}
          controlFieldCB={controlField}
        />
      ))}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={newField}
          className="input p-3 block input-bordered input-sm mt-1 mb-1  w-full hover:outline-none focus:outline-none"
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
  );
}
