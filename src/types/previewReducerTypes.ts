import React from "react";

type EditInputValueUsingE = {
  type: "edit_input_value_using_e";
  e: React.ChangeEvent<HTMLInputElement>;
};

type EditInputValueForRadio = {
  type: "edit_input_value_for_radio";
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

type IncreaseIndexValue = {
  type: "increase_index_value";
};

type DecreaseIndexValue = {
  type: "decrease_index_value";
};

export type InputValueActions =
  | EditInputValueUsingE
  | EditInputValueForRadio
  | EditInputValueForMultiSelect
  | SetInputValueBasedOnIndexValue
  | SetEmptyInputValue;

export type IndexAction = IncreaseIndexValue | DecreaseIndexValue;
