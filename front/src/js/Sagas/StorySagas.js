import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import Auth from './../Modules/Auth'

function* storyFetchList(action) {
   try {
      const result = yield axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/story`
      })
      yield put({type: "STORY_FETCH_LIST_SUCCESS", data: result.data});
   } catch (e) {
      yield put({type: "STORY_FETCH_LIST_FAILED", message: e.message});
   }
}


function* storyFetchItem(action) {
   try {
      const result = yield axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/story/${action.uuid}`
      })
      yield put({type: "STORY_FETCH_ITEM_SUCCESS", data: result.data});
   } catch (e) {
      yield put({type: "STORY_FETCH_ITEM_FAILED", message: e.message});
   }
}


function* storyCreateItem(action) {
   try {
      const result = yield axios({
        method: 'post',
        headers: { Authorization: `${Auth.getToken()}` },
        url: `${process.env.REACT_APP_API_URL}/story`,
        data: action.data
      })
      yield put({type: "STORY_FETCH_LIST"});
      yield put({type: "STORY_CREATE_ITEM_SUCCESS", data: result.data.created});
   } catch (e) {
      yield put({type: "STORY_CREATE_ITEM_FAILED", message: e.message});
   }
}

function* storyUpdateItem(action) {
  console.log('%c updating the item', 'color:green')

  try {
     const result = yield axios({
       method: 'post',
       headers: { Authorization: `${Auth.getToken()}` },
       url: `${process.env.REACT_APP_API_URL}/update_story`,
       data: action.data
     })
     yield put({type: "STORY_FETCH_LIST"});
     yield put({type: "STORY_UPDATE_ITEM_SUCCESS", data: result.data.updated});
  } catch (e) {
     yield put({type: "STORY_UPDATE_ITEM_FAILED", message: e.message});
  }
}

function* storyDeleteItem(action) {
  try {
    const result = yield axios({
      method:'post',
      headers: { Authorization: `${Auth.getToken()}` },
      url:`${process.env.REACT_APP_API_URL}/story/${action.uuid}`
    })
    yield put({type: "STORY_FETCH_LIST"});
    yield put({type: "STORY_DELETE_ITEM_SUCCESS", data: result.data.deleted});
  } catch(e) {
    yield put({type: "STORY_DELETE_ITEM_FAILED", message: e.message});
  }
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* storySagas() {
  yield takeEvery("STORY_FETCH_LIST", storyFetchList);
  yield takeEvery("STORY_FETCH_ITEM", storyFetchItem);
  yield takeEvery("STORY_CREATE_ITEM", storyCreateItem);
  yield takeEvery("STORY_DELETE_ITEM", storyDeleteItem);
  yield takeEvery("STORY_UPDATE_ITEM", storyUpdateItem);
}

export default storySagas;