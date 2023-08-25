import React from "react";

interface TextPreviewProps {
  fieldType: string,
  inputValue: string;
  setInputValueUsingECB: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextPreview = (props: TextPreviewProps) => {
  return (
      <input
          className="border-2 mt-2 border-gray-300 bg-white h-10 px-5 pr-1 rounded-lg text-m focus:outline-none invalid:border-red-500"
          type={props.fieldType}
          value={props.inputValue}
          onChange={(e) => props.setInputValueUsingECB(e)}
      />
  )
};