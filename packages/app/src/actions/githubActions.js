import axios from "axios";
import { GET_GITHUB_PROFILE, GITHUB_LOADING, GET_ERRORS } from "./types";

export const getGithubProfile = githubusername => dispatch => {
  dispatch(setGithubLoading());

  axios
    .get(`https://api.github.com/users/${githubusername}/repos`)
    .then(res =>
      dispatch({
        type: GET_GITHUB_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })
    );
};

export const setGithubLoading = () => {
  return {
    type: GITHUB_LOADING
  };
};
