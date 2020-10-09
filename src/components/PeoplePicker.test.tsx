import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import PeoplePicker from "./PeoplePicker";

describe("PeoplePicker", () => {
  const testPerson = "John Appleseed";
  const testDisabledPerson = "John Q. Public";
  const testPeople = new Map([
    [testPerson, true],
    [testDisabledPerson, false],
  ]);
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("displays the name if there's only one eligible name", () => {
    const { getByAltText, container } = render(
      <PeoplePicker
        dispatch={dispatch}
        people={new Map([[testPerson, true]])}
      />
    );

    act(() => {
      fireEvent.click(getByAltText(/pencil/));
      jest.runAllTimers();
    });

    expect(container).toHaveTextContent(
      "Grab a pencilJohn Appleseedyou're taking notes!"
    );
  });

  it("displays an eligible name from the list", () => {
    const multiplePeople = new Map([
      [testPerson, true],
      ["John Q. Public", true],
      ["Jane Doe", true],
      ["Red Herring", false],
    ]);
    const { getByAltText, container } = render(
      <PeoplePicker dispatch={dispatch} people={multiplePeople} />
    );

    act(() => {
      fireEvent.click(getByAltText(/pencil/));
      jest.runAllTimers();
    });

    const selectedName =
      container.getElementsByTagName("h1")[0].textContent || "";

    expect(container.getElementsByTagName("div")[0].textContent).toMatch(
      `Grab a pencil${selectedName}you're taking notes!`
    );
    expect(multiplePeople.get(selectedName)).toBeTruthy();
  });

  it("displays error message if there are no eligible names", () => {
    const { getByAltText, container } = render(
      <PeoplePicker
        dispatch={dispatch}
        people={new Map([[testDisabledPerson, false]])}
      />
    );

    act(() => {
      fireEvent.click(getByAltText(/pencil/));
      jest.runAllTimers();
    });
    expect(container).toHaveTextContent("Oh no!No eligible names.Try again.");
  });

  it("displays error message if there are no names at all", () => {
    const { getByAltText, container } = render(
      <PeoplePicker dispatch={dispatch} people={new Map()} />
    );

    act(() => {
      fireEvent.click(getByAltText(/pencil/));
      jest.runAllTimers();
    });
    expect(container).toHaveTextContent("Oh no!No eligible names.Try again.");
  });

  it("uses 3 seconds of suspense", () => {
    const { getByAltText, container } = render(
      <PeoplePicker dispatch={dispatch} people={testPeople} />
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
      <PeoplePicker dispatch={dispatch} people={testPeople} />
    );

    expect(container).toMatchSnapshot();

    act(() => {
      fireEvent.click(getByAltText(/pencil/));
      jest.runAllTimers();
    });

    expect(container).toMatchSnapshot();
  });
});
