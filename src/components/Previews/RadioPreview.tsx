import React from "react";

interface RadioPreviewProps {
  options: string[];
  selectedInputValue: string;
  setInputValueUsingStringCB: (value: string) => void;
}

export const RadioPreview = (props: RadioPreviewProps) => {
  return (
      <div className="flex flex-col mt-5 border-2 border-gray-300 p-5 rounded-lg">
        {props.options.map((option, index) => (
            <div className="flex flex-row  items-center" key={index}>
              <input
                  className="mr-2 mt-1  leading-tight text-blue-500 focus:ring focus:ring-blue-200"
                  type="radio"
                  name="radio"
                  value={option}
                  checked={option === props.selectedInputValue}
                  id={index.toString()}
                  onChange={(e) => props.setInputValueUsingStringCB(e.target.value)}
              />
              <label className="text-center text-xl font-bold" htmlFor={index.toString()}>
                {option}
              </label>
            </div>
        ))}
      </div>
  )
};