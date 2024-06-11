// src/components/Filtering.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import Filtering from "./Filtering";

test("renders filtering component", () => {
  render(<Filtering setSelectedSharingOption={() => {}} />);
  const filterElement = screen.getByText(/Filter/i);
  expect(filterElement).toBeInTheDocument();
});
