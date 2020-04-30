import React from "react";
import { render } from "@testing-library/react";
import TakingNotes from "./TakingNotes";

describe("TakingNotes", () => {
  it("renders the people list control button", () => {
    const { getByText } = render(<TakingNotes />);

    expect(getByText("🙋")).toBeInTheDocument();
  });
});
