import {formData, formField} from "../types/formTypes";
import React from "react";

export const initialFormFields: formField[] = [
  {
    kind: "text",
    id: 1,
    label: "First Name",
    fieldType: "text",
    value: "",
  },
  {
    kind: "text",
    id: 2,
    label: "Last Name",
    fieldType: "text",
    value: "",
  },
  {
    kind: "text",
    id: 3,
    label: "Email",
    fieldType: "email",
    value: "",
  },
  {
    kind: "text",
    id: 4,
    label: "Date of Birth",
    fieldType: "date",
    value: "",
  },
  {
    kind: "text",
    id: 5,
    label: "Phone Number",
    fieldType: "tel",
    value: "",
  },
  {
    kind: "radio",
    id: 6,
    label: "What type of phone do you have?",
    options: ["Android", "iPhone", "Other"],
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
        <option value="radio">Radio</option>
        <option value="multi-select">Multi-Select</option>
        <option value="range">Range</option>
        <option value="email">Email</option>
        <option value="number">Number</option>
        <option value="password">Password</option>
        <option value="date">Date</option>
        <option value="time">Time</option>
        <option value="url">Url</option>
        <option value="datetime-local">Datetime-local</option>
        <option value="month">Month</option>
        <option value="week">Week</option>
      </>
  )
}

export const radioObject = (id: number, label: string, options: string[]) => {
  return {
    kind: "radio",
    id: id,
    label: label,
    options: options,
    value: "",
  }
}

export const multiSelectObject = (id: number, label: string, options: string[]) => {
  return {
    kind: "multi-select",
    id: id,
    label: label,
    options: options,
    value: [],
  }
}

export const rangeObject = (id: number, label: string, min: number, max: number, step: number) => {
  return {
    kind: "range",
    id: id,
    label: label,
    min: min,
    max: max,
    step: step,
    value: "",
  }
}

export const checkFormBasedOnID = (id: number) => {
  const localForms = getLocalForms();
  return localForms.find((form) => form.id === id);
};