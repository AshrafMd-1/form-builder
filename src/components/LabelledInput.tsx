import React from "react";

export default function LabelledInput(props: {
  label: string;
  type: string;
  id: number;
  removeFieldCB: (id: number) => void;
  value: string;
  fieldChangeHandlerCB: (id: number, value: string) => void;
}) {
  return (
    <div key={props.id} className="mb-4">
      <label className="text-xl font-normal pl-1 text-center">
        {props.label}
      </label>
      <div className="flex">
        <input
          className="input p-3 block input-bordered input-sm mt-1 mb-1  w-full hover:outline-none focus:outline-none"
          value={props.value}
          type={props.type}
          onChange={(e) => props.fieldChangeHandlerCB(props.id, e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline-red active:bg-red-500"
          onClick={() => props.removeFieldCB(props.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
