export type Form = {
  id?: number;
  title: string;
  description?: string;
  is_public: boolean;
};

export type Errors<T> = Partial<Record<keyof T, string>>;

export const validateForm = (form: Form) => {
  let errors: Errors<Form> = {};
  if (form.title.length < 1) {
    errors.title = "Title is required";
  }
  if (form.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }
  return errors;
};

export interface formData {
  id: number;
  title: string;
  formFields: formField[];
}

type TextField = {
  kind: "text";
  id: number;
  label: string;
  fieldType: string;
  value: string;
};

type MultiSelectField = {
  kind: "multi-select";
  id: number;
  label: string;
  options: string[];
  value: string[];
};

type RadioField = {
  kind: "radio";
  id: number;
  label: string;
  options: string[];
  value: string;
};

type RangeField = {
  kind: "range";
  id: number;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
};

export type formField = TextField | MultiSelectField | RadioField | RangeField;
