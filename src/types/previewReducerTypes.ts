type EditInputValueUsingString = {
  type: "edit_input_value_using_string";
  value: string;
};

type EditInputValueForMultiSelect = {
  type: "edit_input_value_for_multi_select";
  value: string[];
};
type SetInputValueBasedOnIndexValue = {
  type: "set_input_value_based_on_index";
  value: string;
};

type SetEmptyInputValue = {
  type: "set_empty_input_value";
};

export type InputValueActions =
  | EditInputValueUsingString
  | EditInputValueForMultiSelect
  | SetInputValueBasedOnIndexValue
  | SetEmptyInputValue;
