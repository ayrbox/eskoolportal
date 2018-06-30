import { TOGGLE_MENU, SELECT_MENU } from "./types";

export const toogleMenu = menuState => {
  return {
    type: TOGGLE_MENU,
    payload: menuState
  };
};

export const selectMenu = menuSelected => {
  return {
    type: SELECT_MENU,
    payload: menuSelected
  };
};
