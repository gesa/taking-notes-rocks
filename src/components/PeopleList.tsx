import React, { ChangeEvent, Dispatch, useEffect, useState } from "react";
import "./PeopleList.css";
import { MutateAction, People } from "./types";

function PeopleList({
  dispatch,
  pickerVisible,
  people,
}: {
  dispatch: Dispatch<MutateAction>;
  pickerVisible: boolean;
  people: People;
}) {
  const [pendingPerson, setPendingPerson] = useState("");

  useEffect(() => {
    document
      .getElementById("add-person-input")
      ?.setAttribute("value", pendingPerson);
  }, [pendingPerson]);

  function renderPerson([person, eligible]: [string, boolean], index: number) {
    const fieldID = person.toLowerCase().replace(/[^A-Za-z]/, "-");

    return (
      <li className="people-selector-list-item" key={index}>
        <label
          className={`person-name ${eligible ? "eligible" : ""}`}
          htmlFor={`check-${fieldID}-${index}`}
        >
          <input
            checked={eligible}
            className="visually-hidden"
            id={`check-${fieldID}-${index}`}
            name={person}
            onChange={() => {
              dispatch({ action: eligible ? "disable" : "enable", person });
            }}
            type="checkbox"
          />
          {person}
        </label>
        <button
          aria-label={`Remove ${person}`}
          onClick={() => {
            dispatch({ action: "remove", person });
          }}
          className="remove-person"
        >
          &times;
        </button>
      </li>
    );
  }

  return (
    <nav className={`settings-drawer ${pickerVisible ? "expanded" : ""}`}>
      <ul className="people-selector-list">
        <li className="people-selector-input">
          <form
            className="add-person-form"
            onSubmit={(event) => {
              event.preventDefault();

              if (!pendingPerson || pendingPerson === "") {
                return false;
              }

              dispatch({ action: "enable", person: pendingPerson });
              setPendingPerson("");
            }}
          >
            <label htmlFor="add-person-input" className="visually-hidden">
              Add a person
            </label>
            <input
              id="add-person-input"
              className="add-person-input"
              placeholder="e.g. John Appleseed"
              autoComplete="name"
              value={pendingPerson}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setPendingPerson(event.target.value);
              }}
            />
          </form>
        </li>
        {[...people.entries()].map(renderPerson)}
      </ul>
      <div className="list-actions">
        <button
          className="clear-people-list"
          onClick={() => {
            dispatch({ action: "clear" });
          }}
        >
          Clear list
        </button>
        {/* TODO: publish functionality*/}
        <button className="publish-people-list">Share list</button>
      </div>
    </nav>
  );
}

export default PeopleList;
