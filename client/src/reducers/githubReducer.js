import {
  GITHUB_LOADING,
  GET_GITHUB_PROFILE,
  GET_ERRORS
} from "../actions/types";

const initialState = {
  repos: [],
  loading: false,
  errors: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GITHUB_PROFILE:
      return {
        ...state,
        repos: action.payload,
        loading: false
      };
    case GET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case GITHUB_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
