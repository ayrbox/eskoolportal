import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

import profileReducer from "./profileReducer";
import githubReducer from "./githubReducer";
import postReducer from "./postReducer";
import studentReducer from "./studentReducer";
import uiReducer from "./uiReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  github: githubReducer,
  post: postReducer,
  student: studentReducer,
  ui: uiReducer
});
