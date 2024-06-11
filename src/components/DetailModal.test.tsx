// src/components/DetailModal.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DetailModal from "./DetailModal";

test("renders DetailModal component", () => {
  const mockItem = {
    name: "Test Item",
    description: "This is a test item",
    availability: "Yes",
    imageLinks: ["image1.jpg", "image2.jpg"],
    sharing: "나눔",
    location: "Test Location",
    age: "Test Age", // Adding age property to mockItem
    category: "Test Category", // Adding category property to mockItem
  };

  const setOpenDetailModal = jest.fn();

  render(
    <DetailModal
      openDetailModal={true}
      setOpenDetailModal={setOpenDetailModal}
      item={mockItem}
    />,
  );

  // Assert that the item name is rendered
  expect(screen.getByText("Test Item")).toBeInTheDocument();

  // Simulate clicking the close button
  fireEvent.click(screen.getByLabelText("Close modal"));
  expect(setOpenDetailModal).toHaveBeenCalledWith(false);
});
