// src/components/CardView.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CardView from "./CardView";

test("renders CardView component", () => {
  const mockItem = {
    id: "1",
    name: "Item Name",
    availability: "Yes",
    description: "Description",
    imageLinks: ["imageId"],
    sharing: "나눔",
    age: "age",
    category: "category",
    location: "location",
  };
  const mockSetOpenDetailModal = jest.fn();
  const mockSetSelectedItem = jest.fn();

  render(
    <CardView
      item={mockItem}
      setOpenDetailModal={mockSetOpenDetailModal}
      setSelectedItem={mockSetSelectedItem}
    />,
  );

  const itemNameElement = screen.getByText("Item Name");
  expect(itemNameElement).toBeInTheDocument();

  const applyButton = screen.getByText("신청");
  fireEvent.click(applyButton);

  expect(mockSetOpenDetailModal).toHaveBeenCalledWith(true);
  expect(mockSetSelectedItem).toHaveBeenCalledWith({
    name: "Item Name",
    availability: "Yes",
    description: "Description",
    imageLinks: ["https://drive.google.com/thumbnail?id=imageId"],
    sharing: "나눔",
    age: "age",
    category: "category",
    location: "location",
  });
});
