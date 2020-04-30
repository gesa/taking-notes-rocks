import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import PeopleList from "./PeopleList";

function noop() {
  // noop
}

describe("PeopleList", () => {
  const testPeople = [{ name: "John Appleseed", eligible: true }];
  const testPerson = { name: "Jane Doe", eligible: true };
  let mutatorAction = "";

  function mockMutator(action: string): () => void {
    return function () {
      mutatorAction = action;
    };
  }

  beforeEach(() => {
    mutatorAction = "";
  });

  it("matches snapshot", () => {
    const { container } = render(
      <PeopleList
        className=""
        inputChange={noop}
        people={testPeople}
        person={testPerson}
        mutatePerson={() => noop}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("updates text field value to be passed in person prop", () => {
    const { getByPlaceholderText } = render(
      <PeopleList
        className=""
        inputChange={noop}
        people={testPeople}
        person={testPerson}
        mutatePerson={() => noop}
      />
    );

    expect(getByPlaceholderText("e.g. John Appleseed")).toHaveValue("Jane Doe");
  });

  it("fires the change handler when the input field changes", () => {
    let changeFired = false;
    const { getByPlaceholderText } = render(
      <PeopleList
        className=""
        inputChange={() => {
          changeFired = true;
        }}
        people={testPeople}
        person={testPerson}
        mutatePerson={() => noop}
      />
    );

    expect(changeFired).toBe(false);

    act(() => {
      fireEvent.change(getByPlaceholderText("e.g. John Appleseed"), {
        target: { value: "Foo" },
      });

      expect(changeFired).toBe(true);
    });
  });

  it("fires the `add` mutator on form submit", () => {
    const { baseElement } = render(
      <PeopleList
        className=""
        inputChange={noop}
        people={testPeople}
        person={testPerson}
        mutatePerson={mockMutator}
      />
    );

    act(() => {
      fireEvent.submit(baseElement.getElementsByTagName("form")[0]);
    });

    expect(mutatorAction).toBe("add");
  });

  it("fires the `remove` mutator when `&times; is clicked`", () => {
    const { getAllByLabelText } = render(
      <PeopleList
        className=""
        inputChange={noop}
        people={testPeople}
        person={testPerson}
        mutatePerson={mockMutator}
      />
    );

    act(() => {
      fireEvent.click(getAllByLabelText("Remove person")[0]);
    });

    expect(mutatorAction).toBe("remove");
  });

  it('fires the `clear` mutator when "clear list" is clicked', () => {
    const { getByText } = render(
      <PeopleList
        className=""
        inputChange={noop}
        people={testPeople}
        person={testPerson}
        mutatePerson={mockMutator}
      />
    );

    act(() => {
      fireEvent.click(getByText("Clear list"));
    });

    expect(mutatorAction).toBe("clear");
  });
});
