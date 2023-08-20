import React, { useState } from "react";
import { AllForms } from "./AllForms";
import { getLocalForms, initialFormFields, saveLocalForms } from "./utils";

const getAllForms = () => {
  const localForms = getLocalForms();
  return localForms.map((form) => {
    return {
      id: form.id,
      title: form.title,
    };
  });
};

export default function Home() {
  const [state, setState] = useState(() => getAllForms());

  const addForm = () => {
    const localForms = getLocalForms();
    const newForm = {
      id: Number(new Date()),
      title: "Untitled Form",
      formFields: initialFormFields,
    };
    saveLocalForms([...localForms, newForm]);
    setState(getAllForms());
  };

  const removeForm = (id: number) => {
    const localForms = getLocalForms();
    if (localForms.length > 1) {
      const newLocalForms = localForms.filter((form) => form.id !== id);
      saveLocalForms(newLocalForms);
      setState(getAllForms());
    }
  };

  return (
    <div className="flex flex-col justify-content">
      <AllForms forms={state} addFormCB={addForm} removeFormCB={removeForm} />
    </div>
  );
}
