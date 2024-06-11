import React, { useState, useRef } from "react";
import CheckIcon from "./../images/outline_check_circle_black_24dp.png";
import CrossIcon from "./../images/outline_highlight_off_black_24dp.png";
import "./CardView.css";

interface Item {
  id: string;
  name: string;
  availability: string;
  description: string;
  imageLinks: string[];
  sharing: string;
  age: string;
  category: string;
  location: string;
}

interface Props {
  item: Item;
  setOpenDetailModal: (open: boolean) => void;
  setSelectedItem: (item: any) => void;
}

const itemApply = {
  url: "https://docs.google.com/forms/d/e/1FAIpQLSfw-d01ME6J-hTjt2r57SpYN9q33xom0-AUkWj52I8Iyfdosg/formResponse",
  name: "entry.1944831134",
  email: "entry.1606641345",
  item: "entry.777893010",
  date: "entry.2034319354",
};

export default function CardView({
  item,
  setOpenDetailModal,
  setSelectedItem,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [openOrderModal, setOpenOrderModal] = useState<boolean>(false);

  const handleOrderModalOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    formRef.current?.reset();
    setOpenOrderModal(true);
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = "https://via.placeholder.com/150";
  };

  const handleDetailModalOpen = () => {
    setOpenDetailModal(true);
    setSelectedItem(item);
  };

  return (
    <div className="h-full">
      <iframe
        name="hiddenConfirm"
        title="Hidden Confirmation Frame"
        style={{ display: "none" }}
      ></iframe>

      <button className="w-full h-full" onClick={handleDetailModalOpen}>
        <div className="h-full flex flex-col max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img
            className="rounded-t-lg main-image h-44 md:h-72"
            src={item.imageLinks[0]}
            alt={item.name}
            onError={handleImageError}
          />
          <div className="p-2 md:p-5 text-left">
            <div className="flex">
              <h5 className="md:mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate flex-1">
                {item.name}
              </h5>
              <span className="text-xl dark:text-white">
                {item.sharing === "나눔" ? "나눔" : "렌트"}
              </span>
            </div>
            <p className="md:mb-3 font-normal dark:text-gray-400 truncate">
              {item.description}
            </p>
            {item.sharing !== "나눔" && (
              <span className="availability pb-3 flex items-center">
                <img
                  className="checkIcon"
                  src={item.availability === "Yes" ? CheckIcon : CrossIcon}
                  width={18}
                  height={18}
                  alt={
                    item.availability === "Yes" ? "Available" : "Unavailable"
                  }
                />
                <p
                  className={`ml-2 font-bold ${item.availability === "Yes" ? "text-blue-600" : "text-red-600"}`}
                >
                  {item.availability === "Yes" ? "Available" : "Unavailable"}
                </p>
              </span>
            )}
          </div>
          <div className="w-full px-4 mt-auto">
            <button
              type="button"
              onClick={handleOrderModalOpen}
              disabled={item.availability !== "Yes"}
              className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-auto"
            >
              신청
            </button>
          </div>
        </div>
      </button>

      {openOrderModal && (
        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-300 bg-opacity-70"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  물건 신청
                </h3>
                <button
                  type="button"
                  onClick={() => setOpenOrderModal(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              <form
                ref={formRef}
                action={itemApply.url}
                method="post"
                target="hiddenConfirm"
                onSubmit={() => setOpenOrderModal(false)}
              >
                <div className="p-4 md:p-5 space-y-4">
                  <div className="mb-6">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name={itemApply.name}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="강지나"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name={itemApply.email}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="john.doe@company.com"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="item"
                      className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                    >
                      물건
                    </label>
                    <input
                      type="text"
                      id="item"
                      value={item.name}
                      name={itemApply.item}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="date"
                      className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                    >
                      날짜/ 그 외 메세지
                    </label>
                    <input
                      type="text"
                      id="date"
                      name={itemApply.date}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Type a message"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    신청
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
