import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

import profileReducer from "./profileReducer";
import githubReducer from "./githubReducer";
import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  github: githubReducer,
  post: postReducer
});
