import React, { useState } from "react";
import { AllForms } from "./AllForms";
import {
  getLocalForms,
  initialFormFields,
  saveLocalForms,
} from "../utils/utils";
import { navigate, useQueryParams } from "raviger";

const getAllForms = () => {
  const localForms = getLocalForms();
  return localForms.map((form) => {
    return {
      id: form.id,
      title: form.title,
      question: form.formFields.length,
    };
  });
};

export default function Home() {
  const [state, setState] = useState(() => getAllForms());
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");

  const addForm = () => {
    const localForms = getLocalForms();
    const id = Number(new Date());
    const newForm = {
      id: id,
      title: "Untitled Form",
      formFields: initialFormFields,
    };
    saveLocalForms([...localForms, newForm]);
    setState(getAllForms());
    navigate("/forms/" + id);
  };

  const removeForm = (id: number) => {
    const localForms = getLocalForms();
    const newLocalForms = localForms.filter((form) => form.id !== id);
    saveLocalForms(newLocalForms);
    setState(getAllForms());
  };

  return (
    <div className="flex flex-col justify-content">
      <div className="flex flex-col mt-3 mb-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setQuery({ search: searchString });
          }}
        >
          <label className="mr-2">Search</label>
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-1 rounded-lg text-m focus:outline-none"
            type="search"
            name="search"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </form>
      </div>
      <AllForms
        forms={state}
        addFormCB={addForm}
        removeFormCB={removeForm}
        search={search}
      />
    </div>
  );
}
