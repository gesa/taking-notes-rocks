import React, {
  ChangeEvent,
  EventHandler,
  FormEvent,
  MouseEvent,
  useEffect,
} from "react";
import "./PeopleList.css";
import { People, Person } from "../types";

function PeopleList({
  className,
  inputChange,
  people,
  person,
  mutatePerson,
}: {
  className: string;
  inputChange: EventHandler<ChangeEvent>;
  people: People;
  person: Person;
  mutatePerson: (event: string) => EventHandler<FormEvent | MouseEvent>;
}) {
  useEffect(() => {
    document
      .getElementById("add-person-input")
      ?.setAttribute("value", person.name);
  }, [person.name]);

  return (
    <nav className={`settings-drawer ${className}`}>
      <ul className="people-selector-list">
        <li className="people-selector-input">
          <form onSubmit={mutatePerson("add")} className="add-person-form">
            <label htmlFor="add-person-input" className="visually-hidden">
              Add a person
            </label>
            <input
              id="add-person-input"
              className="add-person-input"
              placeholder="e.g. John Appleseed"
              autoComplete="name"
              value={person.name}
              onChange={inputChange}
            />
          </form>
        </li>
        {people.map((person, index) => (
          <li className="people-selector-list-item" key={index}>
            <span
              className={`person-name ${person.eligible ? "selected" : ""}`}
              data-index={index}
              onClick={mutatePerson("eligibility")}
            >
              {person.name}
            </span>
            <span
              onClick={mutatePerson("remove")}
              data-index={index}
              aria-label="Remove person"
              className="remove-person"
            >
              &times;
            </span>
          </li>
        ))}
      </ul>
      <button className="clear-people-list" onClick={mutatePerson("clear")}>
        Clear list
      </button>
    </nav>
  );
}

export default PeopleList;
