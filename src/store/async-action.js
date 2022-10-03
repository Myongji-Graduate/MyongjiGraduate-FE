import { actionType, createAction } from "./store";
import { RESULT_ACTION_TYPES } from "./types";

const ROOT_URL = 'http://localhost:3001/api';


export const postGraduationResult = (data) => (dispatch, getState) => {
  return fetch(ROOT_URL, {
    method: 'POST',
    body: data
  }).then(response => response.json())
  .then(result => {
    console.log(result);
  })
}

export const fetchApi = () => (dispatch, getState) => {
  console.log(dispatch);
  dispatch(createAction(RESULT_ACTION_TYPES.FETCH_RESULT_START));
  setTimeout(() => {
    dispatch(createAction(RESULT_ACTION_TYPES.FETCH_RESULT_SUCCESS, {
      result: 'asd'
    }));
  }, 3000);
}