import {
  GET_STUDENTS,
  GET_STUDENT,
  ADD_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
  CLEAR_STUDENTS,
  LOADING_STUDENTS
} from "../actions/types";

const initialState = {
  students: [],
  student: undefined,
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_STUDENTS:
      return {
        ...state,
        laoding: true
      };
    case CLEAR_STUDENTS:
      return initialState;
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
        loading: false
      };
    case GET_STUDENT:
      return {
        ...state,
        student: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
