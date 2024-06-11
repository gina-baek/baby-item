import React, { useEffect, useState } from "react";
import CardView from "./components/CardView";
import DetailModal from "./components/DetailModal";
import Filtering from "./components/Filtering";

import "./App.css";

const sheetID = "1l_5KtWKU_AjrdCKcuaeL6i_b0ijj-pxV_n-oWMTZEno";
const key = "AIzaSyB0rZEbcANT3h4g8QE9OR-_RLwSnpQhuHA";
const range = "Form Responses 1";

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

function App() {
  const [cardData, setCardData] = useState<Item[]>([]);
  const [originalData, setOriginalData] = useState<Item[]>([]);
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${key}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        const rows = data.values.slice(1).map((row: string[]) => ({
          id: row[0],
          name: row[1],
          availability: row[2],
          description: row[3],
          imageLinks: row[4] ? row[4].split(", ") : [],
          sharing: row[5],
          age: row[7] || "Unknown",
          category: row[8],
          location: row[9],
        }));
        setCardData(rows);
        setOriginalData(rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const setSelectedSharingOption = (option: string) => {
    if (option === "All") {
      setCardData(originalData);
    } else {
      const sharingItems = originalData.filter(
        (item) => item.sharing === option,
      );
      setCardData(sharingItems);
    }
  };

  const groupedByAge = cardData.reduce(
    (acc: { [key: string]: Item[] }, item: Item) => {
      const ageGroup = item.age || "Unknown";
      if (!acc[ageGroup]) {
        acc[ageGroup] = [];
      }
      acc[ageGroup].push(item);
      return acc;
    },
    {},
  );

  const sortedAgeGroups = Object.keys(groupedByAge).sort((a, b) =>
    a.localeCompare(b),
  );

  return (
    <div className="App flex flex-row items-start mb-12">
      <div className="hidden md:block sticky top-0 h-screen bg-gray-100 p-4">
        <ul className="space-y-2 pt-8">
          {sortedAgeGroups.map((age) => (
            <li key={age}>
              <a
                href={`#ageGroup-${age}`}
                className="text-blue-600 hover:underline"
              >
                <div className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 min-w-36">
                  {`${age}`}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1">
        <h1 className="pt-8 text-2xl md:text-4xl pb-4 text-center">
          Bridgeway 애기 물건 나눔 & 렌트
        </h1>
        <div className="uploadButton w-full flex justify-end max-w-6xl">
          <Filtering setSelectedSharingOption={setSelectedSharingOption} />
          <a
            href="https://forms.gle/WsHe8RU4grELDugBA"
            target="_blank"
            rel="noreferrer"
            className="ml-3"
          >
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Upload
            </button>
          </a>
        </div>

        {sortedAgeGroups.map((age) => (
          <div
            id={`ageGroup-${age}`}
            key={age}
            className="ageGroupContainer flex flex-col items-center container mx-auto px-1 md:px-12 w-full"
          >
            <span className="mt-5 mb-2 bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
              <h2 className="text-lg md:text-xl font-bold py-1">{`Age Group: ${age}`}</h2>
            </span>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-8 max-w-6xl w-full">
              {groupedByAge[age].map((item) => (
                <div key={item.id}>
                  <CardView
                    item={item}
                    setOpenDetailModal={setOpenDetailModal}
                    setSelectedItem={setSelectedItem}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {selectedItem && (
          <DetailModal
            openDetailModal={openDetailModal}
            setOpenDetailModal={setOpenDetailModal}
            item={selectedItem}
          />
        )}
      </div>
    </div>
  );
}

export default App;
