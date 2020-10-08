import React, { Dispatch, useReducer } from "react";
import "./TakingNotes.css";
import PeopleList from "./components/PeopleList";
import PeoplePicker from "./components/PeoplePicker";
import { State, MutateAction } from "./components/types";

// TODO- re-implement local storage:
//   JSON.parse(localStorage.getItem("people") || "[]") as People maybe
const initialState = { people: new Map(), pickerVisible: false };
function mutatePerson(
  state: State,
  { person = "", action }: MutateAction
): State {
  const { people } = state;

  switch (action) {
    case "enable":
      people.set(person, true);

      break;
    case "remove":
      people.delete(person);

      break;
    case "disable":
      people.set(person, false);

      break;
    case "clear":
      console.log("clear");
      people.clear();

      break;
    case "open-list":
      state.pickerVisible = true;

      break;
    case "close-list":
      state.pickerVisible = false;

      break;
    default:
  }

  return { ...state };
}

function PeopleListVisibilityControl({
  dispatch,
}: {
  dispatch: Dispatch<MutateAction>;
}) {
  return (
    <button
      className="menu-button"
      onClick={() => {
        dispatch({ action: "open-list" });
      }}
    >
      <span className="raised-hand-emoji">
        &#128587;&#127995;&#8205;&#9792;&#65039;
      </span>
    </button>
  );
}

function TakingNotes() {
  const [state, dispatch] = useReducer(mutatePerson, initialState);

  return (
    <>
      <PeopleListVisibilityControl dispatch={dispatch} />
      <PeopleList
        dispatch={dispatch}
        people={state.people}
        listVisible={state.pickerVisible}
      />
      <PeoplePicker
        dispatch={dispatch}
        people={state.people}
        listVisible={state.pickerVisible}
      />
    </>
  );
}

export default TakingNotes;
