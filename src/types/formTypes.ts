export type Form = {
  id?: number;
  title: string;
  description?: string;
  is_public: boolean;
};

export type submitAnswers = {
  answers: [
    {
      form_field: number;
      value: string;
    },
  ];
  form: {
    title: string;
    description?: string;
    is_public?: boolean;
  };
};

export type formAnswers = {
  form_field: number;
  value: string;
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
  kind: "TEXT";
  id: number;
  label: string;
  value: string;
};

type DropDownField = {
  kind: "DROPDOWN";
  id: number;
  label: string;
  options: { options: string[] };
  value: string;
};

type RadioField = {
  kind: "RADIO";
  id: number;
  label: string;
  options: { options: string[] };
  value: string;
};

export type formField = TextField | DropDownField | RadioField;
