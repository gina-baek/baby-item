import { useState } from "react";

interface FilteringProps {
  setSelectedSharingOption: (option: string) => void;
}

const options = ["All", "나눔", "렌트"];

export default function Filtering({
  setSelectedSharingOption,
}: FilteringProps) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const handleOptionClick = (option: string) => {
    setOpenDropdown(false);
    setSelectedSharingOption(option);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setOpenDropdown(!openDropdown)}
        aria-expanded={openDropdown}
        aria-haspopup="true"
      >
        나눔vs렌트
        <svg
          className="w-2.5 h-2.5 ml-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1l4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {openDropdown && (
        <div
          id="dropdown"
          className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdownDefaultButton"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {options.map((option, index) => (
              <li key={index} role="menuitem">
                <button
                  onClick={() => handleOptionClick(option)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
