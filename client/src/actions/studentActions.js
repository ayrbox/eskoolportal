import axios from "axios";
import {
  GET_STUDENTS,
  GET_STUDENT,
  ADD_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
  CLEAR_STUDENTS,
  LOADING_STUDENTS,
  GET_ERRORS
} from "./types";

export const loadingStudents = () => {
  return {
    type: LOADING_STUDENTS
  };
};

export const clearStudents = () => {
  return {
    type: CLEAR_STUDENTS
  };
};

export const getStudents = () => dispatch => {
  dispatch(loadingStudents());
  axios
    .get("/api/students")
    .then(res =>
      dispatch({
        type: GET_STUDENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_STUDENTS,
        payload: []
      })
    );
};

export const getStudent = id => dispatch => {
  dispatch(loadingStudents());
  axios
    .get(`/api/students/${id}`)
    .then(res =>
      dispatch({
        type: GET_STUDENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_STUDENT,
        payload: {}
      })
    );
};

export const insertStudent = student => dispatch => {
  dispatch(loadingStudents());
  axios
    .post("/api/students/")
    .then(res =>
      dispatch({
        type: GET_STUDENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateStudent = (id, student) => dispatch => {
  dispatch(loadingStudents());
  axios
    .put(`/api/students/${id}`, student)
    .then(res =>
      dispatch({
        type: GET_STUDENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
