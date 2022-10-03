import { actionType, createAction } from "./store";
import { RESULT_ACTION_TYPES } from "./types";

const ROOT_URL = 'https://1db2775e-5c12-4472-ba45-a118a0c06ef5.mock.pstmn.io/test';


export const postGraduationResult = (data) => (dispatch, getState) => {
  return fetch(ROOT_URL, {
    method: 'POST',
    body: data
  }).then(response => {
    console.log(response);
  })
  .then(result => {
    console.log(result);
  })
}

export const fetchMockApi = () => (dispatch, getState) => {
  dispatch(createAction(RESULT_ACTION_TYPES.FETCH_RESULT_START));
  return fetch(ROOT_URL).then(response => {
    return response.json();
  }).then(result => {
    const {router} = getState();
    dispatch(createAction(RESULT_ACTION_TYPES.FETCH_RESULT_SUCCESS, {
      result
    }));
    router.navigate('/result');
  });
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