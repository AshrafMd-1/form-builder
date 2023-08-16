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
        className="input p-3 block input-bordered input-m mt-1 mb-1  w-full hover:outline-none focus:outline-none"
        onSelect={handleInput}
      />
    </>
  );
};

export default Input;
