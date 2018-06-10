import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

import profileReducer from "./profileReducer";
import githubReducer from "./githubReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  github: githubReducer
});
