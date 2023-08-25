import React, {useState} from "react";
import {Options} from "../../utils/utils";


interface MultiSelectInputsProps {
  id: number;
  label: string;
  option: string[];
  kind: string;
  count: number;
  removeFieldCB: (id: number) => void;
  columnChangeHandlerCB: (id: number, value: string) => void;
  typeChangeHandlerCB: (id: number, value: string) => void;
  addOptionCB: (id: number, value: string) => void;
  optionChangeHandlerCB: (id: number, option: string, index: number) => void;
  removeOptionCB: (id: number, index: number) => void;
}


export default function MultiSelectInputs(props: MultiSelectInputsProps) {
  const [optionInput, setOptionInput] = useState("");

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
              className="flex flex-col justify-center items-center gap-1"
          >
            {props.option.map((optionValues, index) => {
              return (
                  <div key={index} className="flex gap-1 flex-row justify-center items-center">
                    <label className="mr-2 font-bold">Option {index + 1}</label>
                    <input
                        className="border-2  border-gray-300 bg-white h-10 px-5 pr-1 rounded-lg text-m focus:outline-none invalid:border-red-500"
                        type="text"
                        name="label"
                        value={optionValues}
                        onChange={
                          (e) => {
                            props.optionChangeHandlerCB(props.id, e.target.value, index);
                          }
                        }
                    />
                    <button
                        className=" bg-red-500 mb-auto mt-auto rounded-lg hover:bg-red-600 hover:text-white p-1"
                        onClick={(_) => {
                          props.removeOptionCB(props.id, index);
                        }}
                    >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                      >
                        <path d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
              );
            })}
          </div>
          <div className="flex flex-col mb-auto ml-auto mr-auto  ">
            <input
                className="border-2 mt-2 border-gray-300 bg-white h-10 px-5 pr-1 rounded-lg text-m focus:outline-none invalid:border-red-500"
                type="text"
                name="label"
                placeholder="New Option"
                value={optionInput}
                onChange={(e) => {
                  setOptionInput(e.target.value);
                }
                }
            />
            <button
                className="mt-2 bg-blue-500 hover:bg-green-600 text-white font-bold rounded-lg px-3 py-2 focus:outline-none focus:shadow-outline-red"
                onClick={() => {
                  props.addOptionCB(props.id, optionInput);
                  setOptionInput("");
                }
                }
            >
              Add Option
            </button>
          </div>
        </div>
      </div>
  );
}