import React, { EventHandler, MouseEvent, useState } from "react";
import "./PeoplePicker.css";
import { People } from "../types";

export default ({
  people,
  onClick,
}: {
  people: People;
  onClick: EventHandler<MouseEvent>;
}) => {
  const suspenseInSeconds = 3;
  const [pencilClass, setPencilClass] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [resultVisibility, setResultVisibility] = useState("hidden");

  const doCountdown = () => {
    const eligiblePeople: string[] = [];

    setPencilClass("animate");

    people.forEach((person) => {
      if (person.eligible) eligiblePeople.push(person.name);
    });

    setTimeout(() => {
      setSelectedPerson(
        eligiblePeople[Math.floor(Math.random() * eligiblePeople.length)]
      );
      setPencilClass("fade");
      setResultVisibility("");
    }, suspenseInSeconds * 1000);
  };

  const Result = () => {
    let pickerResult;

    if (people.every((person) => !person.eligible)) {
      pickerResult = (
        <h2>
          Oh no!
          <br />
          No eligible names.
          <br />
          Try again.
        </h2>
      );
    } else {
      pickerResult = (
        <>
          <h2>Grab a pencil</h2>
          <h1>{selectedPerson}</h1>
          <h2>you're taking notes!</h2>
        </>
      );
    }
    return (
      <div className={`countdown-label ${resultVisibility}`}>
        {pickerResult}
        <button
          className="reset-button"
          onClick={() => {
            setSelectedPerson("");
            setResultVisibility("hidden");
            setPencilClass("");
          }}
        >
          Reset
        </button>
      </div>
    );
  };

  return (
    <main className="flex-center" onClick={onClick}>
      <Result />
      <img
        className={`countdown-button ${pencilClass}`}
        src="/pencil.png"
        alt="An illustration of a pencil"
        onClick={doCountdown}
      />
    </main>
  );
};
