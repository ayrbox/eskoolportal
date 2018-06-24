import { TOGGLE_MENU } from "./types";

export const toogleMenu = menuState => {
  return {
    type: TOGGLE_MENU,
    payload: menuState
  };
};
