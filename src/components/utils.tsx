import { formData, formField } from "./types";
import React from "react";

export const initialFormFields: formField[] = [
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
    type: "tel",
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
      <option value="text">Text</option>
      <option value="email">Email</option>
      <option value="password">Password</option>
      <option value="number">Number</option>
      <option value="date">Date</option>
      <option value="time">Time</option>
      <option value="url">Url</option>
      <option value="datetime-local">Datetime-local</option>
      <option value="month">Month</option>
      <option value="week">Week</option>
    </>
  );
};
