import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import PeoplePicker from "./PeoplePicker";

function noop() {
  // noop
}

describe("PeoplePicker", () => {
  const defaultPeopleList = [{ name: "John Appleseed", eligible: true }];
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("displays the name if there's only one eligible name", () => {
    const { getByAltText, container } = render(
      <PeoplePicker people={defaultPeopleList} onClick={noop} />
    );
    act(() => {
      fireEvent.click(getByAltText(/pencil/));
      jest.runAllTimers();
    });

    expect(container).toHaveTextContent(
      "Grab a pencilJohn Appleseedyou're taking notes!"
    );
  });

  it("displays error message if there are no eligible names", () => {
    const { getByAltText, container } = render(
      <PeoplePicker
        people={[{ name: "John Appleseed", eligible: false }]}
        onClick={noop}
      />
    );
    act(() => {
      fireEvent.click(getByAltText(/pencil/));
      jest.runAllTimers();
    });
    expect(container).toHaveTextContent("Oh no!No eligible names.Try again.");
  });

  it("displays error message if there are no names", () => {
    const { getByAltText, container } = render(
      <PeoplePicker people={[]} onClick={noop} />
    );
    act(() => {
      fireEvent.click(getByAltText(/pencil/));
      jest.runAllTimers();
    });
    expect(container).toHaveTextContent("Oh no!No eligible names.Try again.");
  });

  it("uses 3 seconds of suspense", () => {
    const { getByAltText, container } = render(
      <PeoplePicker people={defaultPeopleList} onClick={noop} />
    );
    const initialText = container.textContent;

    act(() => {
      fireEvent.click(getByAltText(/pencil/));
      jest.advanceTimersByTime(1000);
      expect(container.textContent).toBe(initialText);
      jest.runAllTimers();
    });

    expect(container.textContent).not.toBe(initialText);
  });

  it("matches snapshot", () => {
    const { getByAltText, container } = render(
      <PeoplePicker people={defaultPeopleList} onClick={noop} />
    );

    expect(container).toMatchSnapshot();

    act(() => {
      fireEvent.click(getByAltText(/pencil/));
      jest.runAllTimers();
    });

    expect(container).toMatchSnapshot();
  });
});
