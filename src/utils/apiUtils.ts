import { Form, formAnswers, formField } from "../types/formTypes";
import { PaginationParams } from "../types/common";

const API_BASE_URL = "https://tsapi.coronasafe.live/api/";

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

export const request = async (
  endpoint: string,
  method: RequestMethod,
  data: any = {},
) => {
  let url;
  let payload: string;
  if (method === "GET") {
    const requestParams = new URLSearchParams(data);
    url = API_BASE_URL + endpoint + "?" + requestParams.toString();
    payload = "";
  } else {
    url = API_BASE_URL + endpoint;
    payload = data ? JSON.stringify(data) : "";
  }
  const token = localStorage.getItem("token");
  const auth = token ? "Token " + localStorage.getItem("token") : "";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: method !== "GET" ? payload : null,
  });
  if (response.status === 204) {
    return {};
  } else if (response.ok) {
    return await response.json();
  } else {
    const errorJson = await response.json();
    throw Error(errorJson);
  }
};

export const createForm = async (form: Form) => {
  return await request("forms/", "POST", form);
};

export const me = () => {
  return request("users/", "GET", {});
};

export const login = (username: string, password: string) => {
  return request("auth-token/", "POST", { username, password });
};

export const listForms = (pageParams: PaginationParams) => {
  return request("forms/", "GET", pageParams);
};

export const deleteForm = (formId: number) => {
  return request(`forms/${formId}/`, "DELETE");
};

export const getFormFields = (formId: number) => {
  return request(`forms/${formId}/fields/`, "GET");
};

export const getFormDetails = (formId: number) => {
  return request(`forms/${formId}/`, "GET");
};

export const addFormField = (formId: number, formField: formField) => {
  return request(`forms/${formId}/fields/`, "POST", formField);
};

export const updateTitle = (formId: number, title: string) => {
  return request(`forms/${formId}/`, "PATCH", { title });
};

export const deleteFormField = (formId: number, formFieldId: number) => {
  return request(`forms/${formId}/fields/${formFieldId}/`, "DELETE");
};

export const updateOptionOfFormField = async (
  formId: number,
  formFieldId: number,
  label: string,
  kind: string,
  options: { options: string[] },
) => {
  return request(`forms/${formId}/fields/${formFieldId}/`, "PUT", {
    label,
    kind,
    options,
  });
};

export const submitForm = async (
  formId: number,
  answers: formAnswers[],
  form: {
    title: string;
    description?: string;
    is_public?: boolean;
  },
) => {
  return request(`forms/${formId}/submission/`, "POST", {
    answers,
    form,
  });
};

export const getFormSubmissions = async (formId: number) => {
  return request(`forms/${formId}/submission/`, "GET");
};

export const getSubmission = async (formId: number, submissionId: number) => {
  return request(`forms/${formId}/submission/${submissionId}/`, "GET");
};
