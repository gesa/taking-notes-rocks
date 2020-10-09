import React, { Dispatch, useReducer } from "react";
import "./TakingNotes.css";
import PeopleList from "./components/PeopleList";
import PeoplePicker from "./components/PeoplePicker";
import { State, MutateAction } from "./components/types";

const initialState = () => {
  const localState = localStorage.getItem("state");
  let parsedState = {
    listVisible: false,
    people: null,
  };

  if (localState) {
    parsedState = JSON.parse(localState);
  }

  return {
    people: new Map(parsedState.people),
    listVisible: parsedState.listVisible,
  } as State;
};
function reducer(
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
      people.clear();

      break;
    case "open-list":
      state.listVisible = true;

      break;
    case "close-list":
      state.listVisible = false;

      break;
    default:
  }

  localStorage.setItem(
    "state",
    JSON.stringify({
      listVisible: state.listVisible,
      people: [...people.entries()],
    })
  );
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
  const [state, dispatch] = useReducer(
    reducer,
    initialState(),
    initialState
  );

  return (
    <>
      <PeopleListVisibilityControl dispatch={dispatch} />
      <PeopleList
        dispatch={dispatch}
        people={state.people}
        listVisible={state.listVisible}
      />
      <PeoplePicker dispatch={dispatch} people={state.people} />
    </>
  );
}

export default TakingNotes;
