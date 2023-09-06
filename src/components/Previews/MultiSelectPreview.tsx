import React, {useState} from 'react';

interface MultiSelectPreviewProps {
  options: string[],
  inputValue: string,
  setInputValueForMultiSelect: (value: string[]) => void;
}

export const MultiSelectPreview = (props: MultiSelectPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const toggleOption = (option: string) => {
    if (props.inputValue.includes(option)) {
      props.setInputValueForMultiSelect(props.inputValue.split("|").filter((value) => value !== option));
    } else {
      props.setInputValueForMultiSelect([...props.inputValue.split("|"), option]);
    }
  };

  return (
      <div className="relative">
        <button
            className="border mt-2 px-4 py-2 rounded-lg hover:bg-gray-100 focus:outline-none"
            onClick={toggleDropdown}
        >
          Open Dropdown
        </button>
        {isOpen && (
            <div
                className="absolute w-full mt-1 py-2 bg-white border border-gray-300 rounded-lg shadow-lg animate-slide-down">
              {props.options.map((option) => (
                  <label
                      key={option}
                      className="flex items-center px-4 py-2 cursor-pointer"
                  >
                    <input
                        type="checkbox"
                        className="form-checkbox mr-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        checked={props.inputValue.includes(option)}
                        onChange={() => toggleOption(option)}
                    />
                    {option}
                  </label>
              ))}
            </div>
        )}
      </div>
  );
}