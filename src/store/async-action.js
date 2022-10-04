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
    console.log(result);
    const {router} = getState();
    dispatch(createAction(RESULT_ACTION_TYPES.FETCH_RESULT_SUCCESS, {
      result
    }));
    router.navigate('/result');
  });
}

export const fetchLocal = (formData) => (dispatch, getState) => {
  dispatch(createAction(RESULT_ACTION_TYPES.FETCH_RESULT_START));
  return fetch('/api/result', {
    method: 'POST',
    body: formData
  }).then(response => {
    console.log(response);
    return response.text();
  }).then(result => {
    const {router} = getState();
    console.log(result);
    dispatch(createAction(RESULT_ACTION_TYPES.FETCH_RESULT_SUCCESS, {
      result
    }));
    // router.navigate('/result');
  });
}


export const parseGraduationResult = (result) => {
  const basicUserInfo = {...result.basicInfo};
  const categoryList = [];

  const mandatoryMajor = parseMandatoryMajorResult(result.major);
  const electiveyMajor = parseElectiveMajorResult(result.major);

  categoryList.push(mandatoryMajor);
  categoryList.push(electiveyMajor);
  categoryList.push({...result.commonCulture});
  categoryList.push({...result.coreCulture});
  categoryList.push({...result.commonCulture});
  categoryList.push({...result.commonCulture});


}

export const parseMandatoryMajorResult = (majorResult) => {
  const mandatoryMajor = majorResult.detailCategory[0].takenMandatoryLectures.reduce((acc, lecture) => {
    acc.totalCredit += lecture.credit;
    acc.takenCredit += lecture.credit;
    acc.detailCategory[0].totalCredit += lecture.credit;
    acc.detailCategory[0].totalCredit += lecture.credit;
    acc.detailCategory[0].takenMandatoryLectures.push(lecture);
    return acc;
  }, {
    totalCredit: 0,
    takenCredit: 0,
    categoryName: '전필',
    detailCategory: [
      {
        categoryName: '전공필수',
        totalCredit: 0,
        takenCredits: 0,
        takenMandatoryLectures: [],
        haveToMandatoryLectures: [],
        takenElectiveLectures: [],
        haveToElectiveLectures: [],
      }
    ]
  });

  return majorResult.detailCategory[0].haveToMandatoryLectures.reduce((acc, lecture) => {
    acc.totalCredit += lecture.credit;
    acc.detailCategory[0].totalCredit += lecture.credit;
    acc.detailCategory[0].haveToMandatoryLectures.push(lecture);
    return acc;
  }, mandatoryMajor)
}


export const parseElectiveMajorResult = (majorResult) => {
  const electiveMajor = majorResult.detailCategory[0].takenElectiveLectures.reduce((acc, lecture) => {
    acc.totalCredit += lecture.credit;
    acc.takenCredit += lecture.credit;
    acc.detailCategory[0].totalCredit += lecture.credit;
    acc.detailCategory[0].totalCredit += lecture.credit;
    acc.detailCategory[0].takenElectiveLectures.push(lecture);
    return acc;
  }, {
    totalCredit: 0,
    takenCredit: 0,
    categoryName: '전선',
    detailCategory: [
      {
        categoryName: '전공선택',
        totalCredit: 0,
        takenCredits: 0,
        takenMandatoryLectures: [],
        haveToMandatoryLectures: [],
        takenElectiveLectures: [],
        haveToElectiveLectures: [],
      }
    ]
  });

  return majorResult.detailCategory[0].haveToElectiveLectures.reduce((acc, lecture) => {
    acc.totalCredit += lecture.credit;
    acc.detailCategory[0].totalCredit += lecture.credit;
    acc.detailCategory[0].haveToElectiveLectures.push(lecture);
    return acc;
  }, electiveMajor)
}