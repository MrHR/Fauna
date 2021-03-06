import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import Auth from './../Modules/Auth';
function* encounterFetchList(action) {
   try {
      const result = yield axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/encounter/story/${action.data}`
      })
      yield put({type: "ENCOUNTER_FETCH_LIST_SUCCESS", data: result.data});
   } catch (e) {
      yield put({type: "ENCOUNTER_FETCH_LIST_FAILED", message: e.message});
   }
}


function* encounterFetchItem(action) {
  //console.log('encounter action', action);

   try {
      const result = yield axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/encounter/${action.uuid}`
      })
      yield put({type: "ENCOUNTER_FETCH_ITEM_SUCCESS", data: result.data});
   } catch (e) {
      yield put({type: "ENCOUNTER_FETCH_ITEM_FAILED", message: e.message});
   }
}


function* encounterCreateItem(action) {
   try {
      const result = yield axios({
        method: 'post',
        headers: { Authorization: `${Auth.getToken()}` },
        url: `${process.env.REACT_APP_API_URL}/encounter`,
        data: action.data
      })

      yield put({type: "ENCOUNTER_FETCH_LIST", data: action.data.story_uuid});
      yield put({type: "ENCOUNTER_CREATE_ITEM_SUCCESS", data: result.data.created});
   } catch (e) {
      yield put({type: "ENCOUNTER_CREATE_ITEM_FAILED", message: e.message});
   }
}

function* encounterDeleteItem(action) {
  try {
     const result = yield axios({
       method: 'delete',
       headers: { Authorization: `${Auth.getToken()}` },
       url: `${process.env.REACT_APP_API_URL}/encounter/${action.data.uuid}`,
     })

     yield put({type: "ENCOUNTER_FETCH_LIST", data: action.data.story_uuid});
     yield put({type: "ENCOUNTER_DELETE_ITEM_SUCCESS", data: result.data.uuid});
  } catch (e) {
     yield put({type: "ENCOUNTER_DELETE_ITEM_FAILED", message: e.message});
  }
}

function* encounterUpdateItem(action) {
  try {
    const result = yield axios({
      method: 'patch',
      headers: {Authorization: `${Auth.getToken()}`},
      url: `${process.env.REACT_APP_API_URL}/encounter`,
      data: action.data
    })

    yield put({type: "ENCOUNTER_FETCH_LIST", data: action.data.story_uuid});
    yield put({type: "ENCOUNTER_UPDATE_ITEM_SUCCESS", created: result.data.created});
  } catch(e) {
    yield put({type: "ENCOUNTER_UPDATE_ITEM_FAILED", message: e.message})
  }
}

function* encounterInitUpdate(action) {
  //console.log('getting there', action)

  try {
    yield call(encounterFetchItem, {uuid: action.id})
    yield put({type: "ENCOUNTER_INIT_UPDATE_SUCCESS", data: action.id})
  } catch(e) {
    yield put({type: "ENCOUNTER_INIT_UPDATE_FAILED", message: e.message})
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* encounterSagas() {
  yield takeEvery("ENCOUNTER_FETCH_LIST", encounterFetchList);
  yield takeEvery("ENCOUNTER_FETCH_ITEM", encounterFetchItem);
  yield takeEvery("ENCOUNTER_CREATE_ITEM", encounterCreateItem);
  yield takeEvery("ENCOUNTER_INIT_UPDATE", encounterInitUpdate);
  yield takeEvery("ENCOUNTER_UPDATE_ITEM", encounterUpdateItem);
  yield takeEvery("ENCOUNTER_DELETE_ITEM", encounterDeleteItem);
}

export default encounterSagas;