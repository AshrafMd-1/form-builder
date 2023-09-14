import React, { useEffect, useState } from "react";
import { AllForms } from "./AllForms";
import { useQueryParams } from "raviger";
import { Form } from "../types/formTypes";
import Modal from "./common/Modal";
import CreateForm from "./CreateForm";
import { deleteForm, listForms } from "../utils/apiUtils";
import { Pagination } from "../types/common";

const fetchForms = async (setFormCB: (value: Form[]) => void) => {
  try {
    const data: Pagination<Form> = await listForms({
      offset: 0,
      limit: 10,
    });
    setFormCB(data.results);
  } catch (err) {
    console.error(err);
  }
};

export default function Home() {
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");
  const [forms, setForms] = useState<Form[]>(() => {
    const localForms = localStorage.getItem("allForms");
    return localForms ? JSON.parse(localForms) : [];
  });
  const [newForm, setNewForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("allForms", JSON.stringify(forms));
  }, [forms]);

  useEffect(() => {
    fetchForms(setForms);
  }, []);

  const removeForm = async (id: number) => {
    await deleteForm(id);
    setForms(forms.filter((form) => form.id !== id));
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
        forms={forms}
        addFormCB={() => setNewForm(true)}
        removeFormCB={removeForm}
        search={search}
      />
      <Modal open={newForm} closeCB={() => setNewForm(false)}>
        <CreateForm />
      </Modal>
    </div>
  );
}
