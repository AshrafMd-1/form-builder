import { formData, formField } from "../types/formTypes";
import React from "react";

export const initialFormFields: formField[] = [
  {
    kind: "TEXT",
    id: 1,
    label: "First Name",
    value: "",
  },
  {
    kind: "TEXT",
    id: 2,
    label: "Last Name",
    value: "",
  },
  {
    kind: "TEXT",
    id: 3,
    label: "Email",
    value: "",
  },
  {
    kind: "TEXT",
    id: 4,
    label: "Date of Birth",
    value: "",
  },
  {
    kind: "TEXT",
    id: 5,
    label: "Phone Number",
    value: "",
  },
  {
    kind: "RADIO",
    id: 6,
    label: "What type of phone do you have?",
    options: {
      options: ["Android", "iPhone", "Other"],
    },
    value: "",
  },
];

export const getLocalForms: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

export const saveLocalForms = (localForm: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForm));
};

export const saveFormData = (currentState: formData) => {
  const localForms = getLocalForms();
  const updateLocalForms = localForms.map((form) =>
    form.id === currentState.id ? currentState : form,
  );
  saveLocalForms(updateLocalForms);
};

export const Options = () => {
  return (
    <>
      <option value="TEXT">Text</option>
      <option value="RADIO">Radio</option>
      <option value="DROPDOWN">Dropdown</option>
    </>
  );
};
