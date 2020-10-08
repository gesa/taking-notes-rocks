import React from "react";
import {
  render,
  fireEvent,
  RenderResult,
} from "@testing-library/react";
import PeopleList from "./PeopleList";

describe("PeopleList", () => {
  const testPerson = "John Appleseed";
  const testDisabledPerson = "John Q. Public";
  const testPeople = new Map([
    [testPerson, true],
    [testDisabledPerson, false],
  ]);
  const dispatch = jest.fn();

  const t = {} as Record<string, RenderResult>;

  beforeEach(() => {
    t.renderedPeopleList = render(
      <PeopleList
        dispatch={dispatch}
        listVisible={true}
        people={testPeople}
      />
    );
  });

  it("matches snapshot", () => {
    const { container } = t.renderedPeopleList;

    expect(container).toMatchSnapshot();
  });

  it("doesn't apply expanded class if visible is false", () => {
    const { container } = render(
      <PeopleList
        dispatch={dispatch}
        listVisible={false}
        people={testPeople}
      />
    );

    expect(
      container.getElementsByTagName("nav")[0].classList.contains("expanded")
    ).toBeFalsy();
  });

  it("calls the reducer to add a new person on form submit", () => {
    const { baseElement, getByLabelText } = t.renderedPeopleList;
    const newPerson = "Jane Doe";

    fireEvent.change(getByLabelText("Add a person"), {
      target: { value: newPerson },
    });
    fireEvent.submit(baseElement.getElementsByTagName("form")[0]);

    expect(dispatch).toBeCalledWith(
      expect.objectContaining({ action: "enable", person: newPerson })
    );
  });

  it("does nothing on empty form submit", () => {
    const { baseElement } = t.renderedPeopleList;

    fireEvent.submit(baseElement.getElementsByTagName("form")[0]);

    expect(dispatch).not.toBeCalled();
  });

  it("calls the reducer to disable an enabled person when their name is clicked", () => {
    const { getByLabelText } = t.renderedPeopleList;

    fireEvent.click(getByLabelText(testPerson));

    expect(dispatch).toBeCalledWith({
      action: "disable",
      person: testPerson,
    });
  });

  it("calls the reducer to enable a disabled person when their name is clicked", () => {
    const { getByLabelText } = t.renderedPeopleList;

    fireEvent.click(getByLabelText(testDisabledPerson));

    expect(dispatch).toBeCalledWith({
      action: "enable",
      person: testDisabledPerson,
    });
  });

  it("calls the reducer to remove a person when their `&times; is clicked`", () => {
    const { getByLabelText } = t.renderedPeopleList;

    fireEvent.click(getByLabelText(`Remove ${testPerson}`));

    expect(dispatch).toBeCalledWith({
      action: "remove",
      person: testPerson,
    });
  });

  it('calls the reducer to clear the list when "clear list" is clicked', () => {
    const { getByText } = t.renderedPeopleList;

    fireEvent.click(getByText("Clear list"));

    expect(dispatch).toBeCalledWith({
      action: "clear",
    });
  });
});
