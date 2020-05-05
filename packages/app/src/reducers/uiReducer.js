import { TOGGLE_MENU, SELECT_MENU } from "../actions/types";

const initialState = {
  menuState: "open",
  navigationSelected: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        menuState: action.payload
      };
    case SELECT_MENU:
      return {
        ...state,
        navigationSelected: action.payload
      };
    default:
      return state;
  }
}
