import {
  GET_STUDENTS,
  GET_STUDENT,
  ADD_STUDENT,
  UPDATE_STUDENT,
  CLEAR_STUDENTS,
  LOADING_STUDENTS
} from "../actions/types";

const initialState = {
  students: [],
  student: undefined,
  loading: true,
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_STUDENTS:
      return {
        ...state,
        loading: true
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
    case UPDATE_STUDENT:
      return {
        ...state,
        student: action.payload,
        loading: false
      };
    case ADD_STUDENT:
      return {
        ...state,
        student: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
