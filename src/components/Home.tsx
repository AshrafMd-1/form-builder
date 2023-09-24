import React, { useEffect, useState } from "react";
import { AllForms } from "./AllForms";
import { useQueryParams } from "raviger";
import { Form } from "../types/formTypes";
import Modal from "./common/Modal";
import CreateForm from "./CreateForm";
import { deleteForm, listForms, me } from "../utils/apiUtils";
import { PaginationData, PaginationForms } from "../types/common";
import { User } from "../types/userTypes";
import { Pagination } from "./common/Pagination";

const fetchForms = async (
  setFormCB: (value: Form[]) => void,
  pageData: PaginationData,
  setPageCB: (value: PaginationData) => void,
) => {
  try {
    const data: PaginationForms<Form> = await listForms({
      offset: pageData.offset,
      limit: pageData.limit,
    });
    setPageCB({
      ...pageData,
      totalCount: data.count,
    });
    setFormCB(data.results);
  } catch (err) {
    console.error(err);
  }
};

export default function Home() {
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [forms, setForms] = useState<Form[]>(() => {
    const localForms = localStorage.getItem("allForms");
    return localForms ? JSON.parse(localForms) : [];
  });
  const [newForm, setNewForm] = useState(false);
  const [pageData, setPageData] = useState<PaginationData>({
    offset: 0,
    limit: 10,
    totalCount: 0,
  });

  useEffect(() => {
    me().then((data) => {
      setCurrentUser(data.results[0]);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("allForms", JSON.stringify(forms));
  }, [forms]);

  useEffect(() => {
    fetchForms(setForms, pageData, setPageData);
  }, [pageData.offset]);

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
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-1 rounded-lg text-m "
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
        currentUser={currentUser}
      />

      <Modal
        open={newForm}
        currentUser={currentUser}
        closeCB={() => setNewForm(false)}
      >
        <CreateForm />
      </Modal>
      <Pagination pageData={pageData} setPageDataCB={setPageData} />
    </div>
  );
}
