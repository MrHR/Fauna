import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

function* encounterFetchList(action) {
   try {
      const result = yield axios({
        method: 'get',
        url: `http://localhost:3000/encounterparts/${action.data}`
      })
      yield put({type: "ENCOUNTER_PART_FETCH_LIST_SUCCESS", data: result.data});
   } catch (e) {
      yield put({type: "ENCOUNTER_PART_FETCH_LIST_FAILED", message: e.message});
   }
}


function* encounterFetchItem(action) {
   try {
      const result = yield axios({
        method: 'get',
        url: `http://localhost:3000/encounterparts/${action.uuid}`
      })
      yield put({type: "ENCOUNTER_PART_FETCH_ITEM_SUCCESS", data: result.data});
   } catch (e) {
      yield put({type: "ENCOUNTER_PART_FETCH_ITEM_FAILED", message: e.message});
   }
}


function* encounterCreateItem(action) {
   try {
      const result = yield axios({
        method: 'post',
        url: `http://localhost:3000/encounterpart`,
        data: action.data
      })
      yield put({type: "ENCOUNTER_PART_CREATE_ITEM_SUCCESS", data: result.data.created});
   } catch (e) {
      yield put({type: "ENCOUNTER_PART_CREATE_ITEM_FAILED", message: e.message});
   }
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* encounterSagas() {
  yield takeEvery("ENCOUNTER_PART_FETCH_LIST", encounterFetchList);
  yield takeEvery("ENCOUNTER_PART_FETCH_ITEM", encounterFetchItem);
  yield takeEvery("ENCOUNTER_PART_CREATE_ITEM", encounterCreateItem);
}

export default encounterSagas;