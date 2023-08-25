import React from "react";

interface RangePreviewProps {
  formValues: {
    kind: string;
    min: number;
    max: number;
    step: number;
  },
  inputValue: string,
  setInputValueUsingECB: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RangePreview = (props: RangePreviewProps) => {
  return (
      <>
        <input
            className="border-2 mt-2 border-gray-300 bg-white h-10 pl-1 rounded-lg text-m focus:outline-none invalid:border-red-500"
            type={props.formValues.kind}
            min={props.formValues.min}
            max={props.formValues.max}
            step={props.formValues.step}
            value={props.inputValue || 0}
            onChange={(e) => props.setInputValueUsingECB(e)}
        />
        <label className="mr-2 font-bold">Value : {props.inputValue || 0}</label>
      </>
  )
}