import React from "react";

interface LabelledInputsProps {
  id: number;
  label: string;
  fieldType: string;
  count: number;
  removeFieldCB: (id: number) => void;
}

export default function LabelledInputs(props: LabelledInputsProps) {
  return (
    <div key={props.id} className="mb-4">
      <div className="flex m-2 text-center p-2 flex-row justify-evenly  shadow-md rounded-lg border-2 border-gray-300">
        <div className="flex flex-col">
          <label className=" mb-auto font-bold">S.No</label>
          <p className="text-xl mb-2">{props.count}</p>
        </div>
        <div className="flex flex-col">
          <label className="mr-2 font-bold">Column</label>
          <label className="text-xl mb-2 mx-auto">{props.label}</label>
        </div>
        <div className="flex flex-col ">
          <label className="mb-auto  mx-auto font-bold">Type</label>
          <label className="text-xl mb-2 mx-auto">{props.fieldType}</label>
        </div>
        <button
          className="ml-2 my-auto bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg px-3 py-2 focus:outline-none focus:shadow-outline-red active:bg-red-500"
          onClick={() => props.removeFieldCB(props.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
