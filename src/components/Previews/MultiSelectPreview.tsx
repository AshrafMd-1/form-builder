import React, {useState} from 'react';

interface MultiSelectPreviewProps {
  options: string[],
}

export const MultiSelectPreview = (props: MultiSelectPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  console.log('Selected options:', selectedOptions);

  return (
      <div className="relative">
        <button
            className="border px-4 py-2 rounded-lg"
            onClick={toggleDropdown}
        >
          Open Dropdown
        </button>
        {isOpen && (
            <div className="absolute mt-2 py-2 bg-white border border-gray-300 rounded-lg shadow-lg animate-slide-down">
              {props.options.map((option) => (
                  <label
                      key={option}
                      className="flex items-center px-4 py-2 cursor-pointer"
                  >
                    <input
                        type="checkbox"
                        className="form-checkbox mr-2"
                        checked={selectedOptions.includes(option)}
                        onChange={() => toggleOption(option)}
                    />
                    {option}
                  </label>
              ))}
            </div>
        )}
      </div>
  );
};

