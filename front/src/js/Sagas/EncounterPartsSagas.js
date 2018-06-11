import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { EncounterPartSelectActive } from '../Actions/EncounterPartActions';
import Auth from './../Modules/Auth'

function* encounterFetchList(action) {
   try {
      const result = yield axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/encounterparts/${action.id}`,
        data: action.data
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
        url: `${process.env.REACT_APP_API_URL}/encounterpart/${action.uuid}`
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
        headers: { Authorization: `${Auth.getToken()}` },
        url: `${process.env.REACT_APP_API_URL}/encounterpart`,
        data: action.data
      })
      yield put({type: "ENCOUNTER_PART_FETCH_LIST", id: action.data.encounter_uuid});
      yield put({type: "ENCOUNTER_PART_CREATE_ITEM_SUCCESS", data: result.data.created});
   } catch (e) {
      yield put({type: "ENCOUNTER_PART_CREATE_ITEM_FAILED", message: e.message});
   }
}

function* encounterPartGetNodeList(action) {
  try {
    const result = yield axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/encounterpartnodetree/${action.id}`
    })
    yield put({type: "ENCOUNTER_PART_GET_NODE_TREE_SUCCESS", data: result.data})
  } catch (e) {
    yield put({type: "ENCOUNTER_PART_GET_NODE_TREE_FAILED", message: e.message})
  }
}

function* encounterPartSelectActive(action) {
  try {
    yield call(encounterPartGetNodeList, { id:action.data.encounter_uuid })
    yield put({type: "ENCOUNTER_PART_SELECT_ACTIVE_SUCCESS", id: action.id, data: action.data})
  } catch(e) {
    yield put({type: "ENCOUNTER_PART_SELECT_ACTIVE_FAILED", message: e.message})
  }
}

function* encounterUpdateItem(action) {
  try {
    const result = yield axios({
      method: 'patch',
      headers: {Authorization: `${Auth.getToken()}`},
      url: `${process.env.REACT_APP_API_URL}/encounterpart`,
      data: action.data
    })

    yield put({type: "ENCOUNTER_PART_FETCH_LIST", id: action.data.encounter_uuid});
    yield put({type: "ENCOUNTER_PART_UPDATE_ITEM_SUCCESS", data: result.data});
  } catch(e) {
    yield put({type: "ENCOUNTER_PART_UPDATE_ITEM_FAILED", message: e.message})
  }
}

function* encounterInitUpdate(action) {
  try {
    yield call(encounterFetchItem, {uuid: action.id})
    yield put({type: "ENCOUNTER_PART_INIT_UPDATE_SUCCESS", data: action.id})
  } catch(e) {
    yield put({type: "ENCOUNTER_PART_INIT_UPDATE_FAILED", message: e.message})
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* encounterSagas() {
  yield takeEvery("ENCOUNTER_PART_SELECT_ACTIVE", encounterPartSelectActive)
  yield takeEvery("ENCOUNTER_PART_FETCH_LIST", encounterFetchList);
  yield takeEvery("ENCOUNTER_PART_FETCH_ITEM", encounterFetchItem);
  yield takeEvery("ENCOUNTER_PART_CREATE_ITEM", encounterCreateItem);
  yield takeEvery("ENCOUNTER_PART_FETCH_LIST", encounterPartGetNodeList);
  yield takeEvery("ENCOUNTER_PART_INIT_UPDATE", encounterInitUpdate);
  yield takeEvery("ENCOUNTER_PART_UPDATE_ITEM", encounterUpdateItem);
}

export default encounterSagas;