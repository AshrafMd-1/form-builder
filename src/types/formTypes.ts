export interface formInfo {
  id: number;
  title: string;
  question: number;
}

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
}

type MultiSelectField = {
  kind: "multi-select";
  id: number;
  label: string;
  options: string[];
  value: string[];
}

type RadioField = {
  kind: "radio";
  id: number;
  label: string;
  options: string[];
  value: string;
}

type RangeField = {
  kind: "range";
  id: number;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
}

export type formField = TextField | MultiSelectField | RadioField | RangeField;
