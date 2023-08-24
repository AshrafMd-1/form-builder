import { Options } from "./utils";

export default function LabelledInput(props: {
  label: string;
  type: string;
  id: number;
  removeFieldCB: (id: number) => void;
  count: number;
  fieldChangeHandlerCB: (id: number, value: string) => void;
  columnChangeHandlerCB: (id: number, value: string) => void;
  typeChangeHandlerCB: (id: number, value: string) => void;
}) {
  return (
    <div key={props.id} className="mb-4">
      <div className="flex m-2 text-center p-2 flex-row justify-evenly  shadow-md rounded-lg border-2 border-gray-300">
        <div className="flex flex-col">
          <label className=" mb-auto font-bold">S.No</label>
          <p className="text-xl mb-2">{props.count}</p>
        </div>
        <div className="flex flex-col">
          <label className="mr-2 font-bold">Column</label>
          <input
            className="border-2 mt-2 border-gray-300 bg-white h-10 px-5 pr-1 rounded-lg text-m focus:outline-none invalid:border-red-500"
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
            value={props.type}
            onChange={(e) =>
              props.typeChangeHandlerCB(props.id, e.target.value)
            }
          >
            <Options />
          </select>
        </div>
        <button
          className="ml-2 mt-auto bg-blue-500 hover:bg-red-600 text-white font-bold rounded-lg px-3 py-2 focus:outline-none focus:shadow-outline-red active:bg-red-500"
          onClick={() => props.removeFieldCB(props.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
