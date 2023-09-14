import { formField } from "./formTypes";

type UpdateFormDetails = {
  type: "update_form_details";
  id: number;
  title: string;
};

type UpdateFormFields = {
  type: "update_form_fields";
  formFields: formField[];
};

type ChangeFormTitle = {
  type: "change_form_title";
  title: string;
};

type AddFieldToForm = {
  type: "add_field_to_form";
  formField: formField;
  callback: () => void;
};

type RemoveFieldFromForm = {
  type: "remove_field_from_form";
  id: number;
};

type AddOptionToFormField = {
  type: "add_option_to_form_field";
  id: number;
  option: string;
};

type RemoveOptionFromFormField = {
  type: "remove_option_from_form_field";
  id: number;
  index: number;
};

export type FormAction =
  | UpdateFormDetails
  | UpdateFormFields
  | ChangeFormTitle
  | AddFieldToForm
  | RemoveFieldFromForm
  | AddOptionToFormField
  | RemoveOptionFromFormField;
