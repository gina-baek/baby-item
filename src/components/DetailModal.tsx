import React, { useState } from "react";
import CheckIcon from "./../images/outline_check_circle_black_24dp.png";
import CrossIcon from "./../images/outline_highlight_off_black_24dp.png";

interface Item {
  name: string;
  availability: string;
  description: string;
  imageLinks: string[];
  sharing: string;
  age: string;
  category: string;
  location: string;
}

interface DetailModalProps {
  openDetailModal: boolean;
  setOpenDetailModal: (open: boolean) => void;
  item: Item;
}

export default function DetailModal({
  openDetailModal,
  setOpenDetailModal,
  item,
}: DetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const updateCurrentImageIndex = (index: number) => {
    if (index >= item.imageLinks.length) {
      setCurrentImageIndex(item.imageLinks.length - 1);
    } else if (index < 0) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(index);
    }
  };

  return (
    <div
      id="detail-modal"
      tabIndex={-1}
      aria-hidden={!openDetailModal}
      className={`${openDetailModal ? "" : "hidden"} flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-300 bg-opacity-70`}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {item.name}
            </h3>
            <button
              type="button"
              onClick={() => setOpenDetailModal(false)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              aria-label="Close modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4">
            <div
              id="controls-carousel"
              className="relative w-full"
              data-carousel="static"
            >
              <p className="text-end font-normal text-green-600 dark:text-gray-400">
                {item.sharing === "나눔" ? "나눔" : "렌트"}
              </p>
              {/* Carousel wrapper */}
              <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {item.imageLinks?.map((link, index) => (
                  <div
                    key={index}
                    className={`${
                      currentImageIndex === index ? "" : "hidden"
                    } duration-700 ease-in-out`}
                    data-carousel-item
                  >
                    <img
                      src={link}
                      className="absolute block w-full h-80 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-contain"
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              {/* Slider controls */}
              <button
                type="button"
                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
                onClick={() => updateCurrentImageIndex(currentImageIndex - 1)}
                aria-label="Previous"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 dark:bg-gray-800/30 group-hover:bg-black/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </span>
              </button>
              <button
                type="button"
                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
                onClick={() => updateCurrentImageIndex(currentImageIndex + 1)}
                aria-label="Next"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 dark:bg-gray-800/30 group-hover:bg-black/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <p className="dark:text-white">{item.description}</p>
            <p className="dark:text-white">위치: {item.location}</p>
          </div>
          {/* Modal footer */}
          <div className="flex flex-col items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            {item.sharing === "나눔" ? null : item.availability === "Yes" ? (
              <div className="availability pb-3 flex items-center">
                <img
                  className="checkIcon"
                  src={CheckIcon}
                  width={18}
                  height={18}
                  alt="Available"
                />
                <p className="text-blue-600 font-bold ml-2">Available</p>
              </div>
            ) : (
              <div className="availability pb-3 flex items-center">
                <img
                  className="closeIcon"
                  src={CrossIcon}
                  width={18}
                  height={18}
                  alt="Unavailable"
                />
                <p className="text-red-600 font-bold ml-2">Unavailable</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
