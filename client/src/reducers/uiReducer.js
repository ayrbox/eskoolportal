import { TOGGLE_MENU } from "../actions/types";

const initialState = {
  menuState: "close"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        menuState: action.payload
      };
    default:
      return state;
  }
}
