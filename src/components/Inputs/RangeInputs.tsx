import React from "react";

interface RangeInputsProps {
  id: number;
  label: string;
  min: number;
  max: number;
  count: number;
  step: number;
  kind: string;
  removeFieldCB: (id: number) => void;
  columnChangeHandlerCB: (id: number, value: string) => void;
  rangeMinChangeHandlerCB: (id: number, value: number) => void;
  rangeMaxChangeHandlerCB: (id: number, value: number) => void;
  rangeStepChangeHandlerCB: (id: number, value: number) => void;
}

export const RangeInputs = (props: RangeInputsProps) => {
  return (
    <div
      key={props.id}
      className="mb-4 p-2 shadow-md rounded-lg border-2 border-gray-300 m-2"
    >
      <div className="flex text-center flex-row justify-evenly ">
        <div className="flex flex-col">
          <label className=" mb-auto font-bold">S.No</label>
          <p className="text-xl mb-2">{props.count}</p>
        </div>
        <div className="flex flex-col">
          <label className="mr-2 font-bold">Column</label>
          <input
            className="border-2 mt-2 border-gray-300 bg-white h-10 px-2 pr-1 rounded-lg text-m focus:outline-none invalid:border-red-500"
            type="text"
            name="label"
            value={props.label}
            onChange={(e) =>
              props.columnChangeHandlerCB(props.id, e.target.value)
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="m-auto font-bold">Type</label>
          <label className="text-xl mb-2 mx-auto">{props.kind}</label>
        </div>
        <button
          className="ml-2 mt-auto bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg px-3 py-2 focus:outline-none focus:shadow-outline-red active:bg-red-500"
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
      <div className="flex mt-3 ml-2 flex-row justify-around items-center border-2 border-gray-300 rounded-lg p-2">
        <div className="flex flex-row flex-wrap justify-center items-center gap-3">
          <div className="flex gap-1 flex-row justify-center items-center">
            <label className="mr-1 font-bold">Min</label>
            <input
              className="border-2  border-gray-300 bg-white h-10 px-5 pr-1 rounded-lg text-m focus:outline-none invalid:border-red-500"
              type="number"
              name="min"
              value={props.min > 0 ? props.min.toString().slice(0) : 0}
              onChange={(e) => {
                let minValue;
                if (e.target.value === "") {
                  minValue = 0;
                } else if (parseInt(e.target.value) > props.max) {
                  minValue = props.max - 1;
                } else {
                  minValue = parseInt(e.target.value);
                }
                props.rangeMinChangeHandlerCB(props.id, minValue);
              }}
            />
          </div>
          <div className="flex gap-1 flex-row justify-center items-center">
            <label className="mr-1 font-bold">Max</label>
            <input
              className="border-2  border-gray-300 bg-white h-10 px-5 pr-1 rounded-lg text-m focus:outline-none invalid:border-red-500"
              type="number"
              value={props.max > 0 ? props.max.toString().slice(0) : 0}
              onChange={(e) => {
                let maxValue;
                if (e.target.value === "") {
                  maxValue = 0;
                } else if (parseInt(e.target.value) <= props.min) {
                  maxValue = props.min + 1;
                } else {
                  maxValue = parseInt(e.target.value);
                }
                props.rangeMaxChangeHandlerCB(props.id, maxValue);
              }}
            />
          </div>
          <div className="flex gap-1 flex-row justify-center items-center">
            <label className="mr-1 font-bold">Step</label>
            <input
              className="border-2  border-gray-300 bg-white h-10 px-5 pr-1 rounded-lg text-m focus:outline-none invalid:border-red-500"
              type="number"
              name="step"
              value={props.step > 0 ? props.step.toString().slice(0) : 0}
              onChange={(e) => {
                let stepValue;
                if (e.target.value === "") {
                  stepValue = 0;
                } else if (parseInt(e.target.value) > props.max - props.min) {
                  stepValue = props.max - props.min;
                } else {
                  stepValue = parseInt(e.target.value);
                }
                props.rangeStepChangeHandlerCB(props.id, stepValue);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
