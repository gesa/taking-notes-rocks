import React, { Dispatch, useState } from "react";
import "./PeoplePicker.css";
import { MutateAction, People } from "./types";

export default ({
  dispatch,
  people,
}: {
  dispatch: Dispatch<MutateAction>;
  people: People;
}) => {
  const suspenseInSeconds = 3;
  const [pencilClass, setPencilClass] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [resultVisibility, setResultVisibility] = useState("hidden");
  const names = [...people.keys()];

  const doCountdown = () => {
    const eligiblePeople = names.filter((person) => {
      if (people.get(person)) return person;

      return false;
    });

    setPencilClass("animate");

    setTimeout(() => {
      if (eligiblePeople.length === 0) {
        setSelectedPerson("");
      } else {
        const chosenOne =
          eligiblePeople[Math.floor(Math.random() * eligiblePeople.length)];
        setSelectedPerson(chosenOne);
        dispatch({ action: "disable", person: chosenOne });
      }

      setPencilClass("fade");
      setResultVisibility("");
    }, suspenseInSeconds * 1000);
  };

  const Result = () => {
    let resultCopy;

    if (resultVisibility === "hidden") {
      resultCopy = "";
    } else if (selectedPerson === "") {
      resultCopy = (
        <h2>
          Oh no!
          <br />
          No eligible names.
          <br />
          Try again.
        </h2>
      );
    } else {
      resultCopy = (
        <>
          <h2>Grab a pencil</h2>
          <h1>{selectedPerson}</h1>
          <h2>you're taking notes!</h2>
        </>
      );
    }

    return (
      <div className={`countdown-label ${resultVisibility}`}>
        {resultCopy}
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
    <main
      className="flex-center"
      onClick={() => {
        dispatch({ action: "close-list" });
      }}
    >
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
