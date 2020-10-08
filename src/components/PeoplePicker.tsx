import React, { Dispatch, useState } from "react";
import "./PeoplePicker.css";
import { MutateAction, People } from "./types";

export default ({
  dispatch,
  people,
  listVisible,
}: {
  dispatch: Dispatch<MutateAction>;
  people: People;
  listVisible: boolean;
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

    if (listVisible) dispatch({ action: "close-list" });

    setPencilClass("animate");
    setTimeout(() => {
      const chosenOne =
        eligiblePeople[Math.floor(Math.random() * eligiblePeople.length)];
      setSelectedPerson(chosenOne);
      setPencilClass("fade");
      setResultVisibility("");
      dispatch({ action: "disable", person: chosenOne });
    }, suspenseInSeconds * 1000);
  };

  const Result = () => {
    let pickerResult;

    if (selectedPerson === "") {
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
