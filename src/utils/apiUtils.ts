import { Form } from "../types/formTypes";
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
  if (response.ok) {
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
