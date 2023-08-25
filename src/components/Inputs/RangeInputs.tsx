import {Options} from "../../utils/utils";
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
  typeChangeHandlerCB: (id: number, value: string) => void;
  rangeMinChangeHandlerCB: (id: number, value: number) => void;
  rangeMaxChangeHandlerCB: (id: number, value: number) => void;
  rangeStepChangeHandlerCB: (id: number, value: number) => void;
}

export const RangeInputs = (props: RangeInputsProps) => {
  return (
      <div key={props.id} className="mb-4 p-2 shadow-md rounded-lg border-2 border-gray-300 m-2">
        <div
            className="flex text-center flex-row justify-evenly ">
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
            <label className="mr-2 font-bold">Type</label>
            <select
                className="border-2 mt-2 text-m border-gray-300 bg-white h-10 px-1  rounded-lg  focus:outline-none"
                name="type"
                value={props.kind}
                onChange={(e) =>
                    props.typeChangeHandlerCB(props.id, e.target.value)
                }
            >
              <Options/>
            </select>
          </div>
          <button
              className="ml-2 mt-auto bg-blue-500 hover:bg-red-600 text-white font-bold rounded-lg px-3 py-2 focus:outline-none focus:shadow-outline-red active:bg-red-500"
              onClick={() => props.removeFieldCB(props.id)}
          >
            Remove
          </button>
        </div>
        <div className="flex mt-3 ml-2 flex-row justify-around items-center border-2 border-gray-300 rounded-lg p-2">
          <div
              className="flex flex-row flex-wrap justify-center items-center gap-3"
          >
            <div className="flex gap-1 flex-row justify-center items-center">
              <label className="mr-1 font-bold">Min</label>
              <input
                  className="border-2  border-gray-300 bg-white h-10 px-5 pr-1 rounded-lg text-m focus:outline-none invalid:border-red-500"
                  type="number"
                  name="min"
                  value={props.min}
                  onChange={(e) => {
                    props.rangeMinChangeHandlerCB(props.id, parseInt(e.target.value));
                  }
                  }
              />
            </div>
            <div className="flex gap-1 flex-row justify-center items-center">
              <label className="mr-1 font-bold">Max</label>
              <input
                  className="border-2  border-gray-300 bg-white h-10 px-5 pr-1 rounded-lg text-m focus:outline-none invalid:border-red-500"
                  type="number"
                  value={props.max}
                  onChange={(e) => {
                    props.rangeMaxChangeHandlerCB(props.id, parseInt(e.target.value));
                  }
                  }
              />
            </div>
            <div className="flex gap-1 flex-row justify-center items-center">
              <label className="mr-1 font-bold">Step</label>
              <input
                  className="border-2  border-gray-300 bg-white h-10 px-5 pr-1 rounded-lg text-m focus:outline-none invalid:border-red-500"
                  type="number"
                  name="step"
                  value={props.step}
                  onChange={(e) => {
                    props.rangeStepChangeHandlerCB(props.id, parseInt(e.target.value));
                  }}
              />
            </div>
          </div>
        </div>
      </div>
  );
}
