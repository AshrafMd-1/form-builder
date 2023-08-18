import React, { ChangeEvent } from "react";

const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.value === "") {
    e.target.classList.add("border-red-500");
  } else if (!e.target.validity.valid) {
    e.target.classList.add("border-red-500");
  } else {
    e.target.classList.remove("border-red-500");
  }
};

const Input = (props: { field: string; type: string }) => {
  return (
    <>
      <label className="text-xl font-normal pl-1 text-center">
        {props.field}
      </label>

      <input
        type={props.type}
        placeholder={"Please type your " + props.field}
        className="border-2 border-gray-300 rounded-md mb-3 mt-1 w-full h-10 px-2 text-lg focus:outline-none focus:border-blue-500"
        onSelect={handleInput}
      />
    </>
  );
};

export default Input;
