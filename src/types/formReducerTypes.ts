import { formField } from "./formTypes";

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

type EditFormFieldLabel = {
  type: "edit_form_field_label";
  id: number;
  label: string;
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

type EditRangeMinOfFormField = {
  type: "edit_range_min_of_form_field";
  id: number;
  min: number;
};

type EditRangeMaxOfFormField = {
  type: "edit_range_max_of_form_field";
  id: number;
  max: number;
};

type EditRangeStepOfFormField = {
  type: "edit_range_step_of_form_field";
  id: number;
  step: number;
};

export type FormAction =
  | ChangeFormTitle
  | AddFieldToForm
  | RemoveFieldFromForm
  | EditFormFieldLabel
  | AddOptionToFormField
  | RemoveOptionFromFormField
  | EditRangeMinOfFormField
  | EditRangeMaxOfFormField
  | EditRangeStepOfFormField;
