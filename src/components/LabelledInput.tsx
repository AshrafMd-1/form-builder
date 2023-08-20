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
          className="border-2 border-gray-300 rounded-md  mt-1 w-full h-10 px-2 text-lg focus:outline-none focus:border-blue-500"
          value={props.value}
          type={props.type}
          onChange={(e) => props.fieldChangeHandlerCB(props.id, e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 hover:bg-red-600 text-white font-bold rounded-lg px-3 py-2 mt-auto mb-auto focus:outline-none focus:shadow-outline-red active:bg-red-500"
          onClick={() => props.removeFieldCB(props.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
