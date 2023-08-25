export const MultiSelectPreview = () => {
  return (
      <div className="flex flex-col mt-5 border-2 border-gray-300 p-5 rounded-lg">
        <div className="flex flex-row  items-center">
          <input
              className="mr-2 mt-1  leading-tight text-blue-500 focus:ring focus:ring-blue-200"
              type="checkbox"
              name="checkbox"
              value="option1"
              id="0"
          />
          <label className="text-center text-xl font-bold" htmlFor="0">
            option1
          </label>
        </div>
        <div className="flex flex-row  items-center">
          <input
              className="mr-2 mt-1  leading-tight text-blue-500 focus:ring focus:ring-blue-200"
              type="checkbox"
              name="checkbox"
              value="option2"
              id="1"
          />
          <label className="text-center text-xl font-bold" htmlFor="1">
            option2
          </label>
        </div>
        <div className="flex flex-row  items-center">
          <input
              className="mr-2 mt-1  leading-tight text-blue-500 focus:ring focus:ring-blue-200"
              type="checkbox"
              name="checkbox"
              value="option3"
              id="2"
          />
          <label className="text-center text-xl font-bold" htmlFor="2">
            option3
          </label>
        </div>
      </div>
  )
}