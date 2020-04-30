import React, {
  ChangeEvent,
  EventHandler,
  FormEvent,
  MouseEvent,
  useState,
} from "react";
import "./TakingNotes.css";
import PeopleList from "./components/PeopleList";
import PeoplePicker from "./components/PeoplePicker";
import { People, Person } from "./types";

function TakingNotes() {
  const initialPerson: Person = { name: "", eligible: false };
  const [people, setPeople] = useState(
    JSON.parse(localStorage.getItem("people") || "[]") as People
  );
  const updatePeople = (peopleState = people) => {
    setPeople(peopleState);
    localStorage.setItem("people", JSON.stringify(peopleState));
  };
  const [person, setPerson] = useState(initialPerson);
  const [drawerClass, setDrawerClass] = useState("");

  function mutatePerson(action: string): EventHandler<FormEvent | MouseEvent> {
    switch (action) {
      case "add":
        return function (event: FormEvent<HTMLFormElement>) {
          const currentPeople = [...people, person];

          event.preventDefault();

          setPerson(initialPerson);
          updatePeople(currentPeople);
        };
      case "remove":
        return function (event: MouseEvent<HTMLSpanElement>) {
          const currentPeople = [...people];

          currentPeople.splice(Number(event.currentTarget.dataset.index), 1);

          updatePeople(currentPeople);
        };
      case "eligibility":
        return function (event: MouseEvent<HTMLSpanElement>) {
          const element = event.currentTarget;
          const currentPerson = people[Number(element.dataset.index)];

          currentPerson.eligible = !currentPerson.eligible;
          element.classList.toggle("selected");
          updatePeople();
        };
      case "clear":
        return function () {
          updatePeople([]);
        };
      default:
        return function () {};
    }
  }

  function inputChange(event: ChangeEvent<HTMLInputElement>) {
    setPerson({ name: `${event.target.value}`, eligible: true });
    event.target.value = person.name;
  }

  function PeopleListControl() {
    return (
      <button
        className="menu-button"
        onClick={() => {
          setDrawerClass("expanded");
        }}
      >
        <span className="no-good-gesture-emoji">&#128587;</span>
      </button>
    );
  }

  return (
    <>
      <PeopleListControl />
      <PeopleList
        className={drawerClass}
        inputChange={inputChange}
        people={people}
        person={person}
        mutatePerson={mutatePerson}
      />
      <PeoplePicker
        people={people}
        onClick={() => {
          if (drawerClass === "expanded") setDrawerClass("");
        }}
      />
    </>
  );
}

export default TakingNotes;
