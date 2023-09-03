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
              className="ml-2 mt-auto bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg px-3 py-2 focus:outline-none focus:shadow-outline-red active:bg-red-500"
              onClick={() => props.removeFieldCB(props.id)}
          >
            <svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
            </svg>

          </button>
        </div>
        <div className="flex mt-3 ml-2 flex-row  justify-around items-center border-2 border-gray-300 rounded-lg p-2">
          <div
              className="flex flex-col ml-auto  justify-center items-center  gap-1"
          >
            {props.option.map((optionValues, index) => {
              return (
                  <div key={index} className="grid grid-cols-5 gap-2">
                    <label className="mr-2 col-span-1 text-center font-bold">Option {index + 1}</label>
                    <label
                        className="mr-2 col-span-3 text-center my-auto break-all ">{optionValues}</label>
                    <button
                        className=" col-span-1 bg-red-500 mb-auto mt-auto mr-auto text-white rounded-lg hover:bg-red-600 p-1"
                        onClick={(_) => {
                          props.removeOptionCB(props.id, index);
                        }}
                    >
                      <svg
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                          className="w-5 h-5">
                        <path
                            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
                      </svg>
                    </button>
                  </div>
              );
            })}
          </div>
          <div className="flex flex-col mb-auto mr-auto ">
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
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg px-3 py-2 focus:outline-none focus:shadow-outline-red"
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