'use strict';

export const STORY_FETCH_LIST = 'STORY_FETCH_LIST';
export const STORY_FETCH_LIST_SUCCESS = 'STORY_FETCH_LIST_SUCCESS';
export const STORY_FETCH_LIST_FAILED = 'STORY_FETCH_LIST_FAILED';

export const STORY_FETCH_ITEM = 'STORY_FETCH_ITEM';
export const STORY_FETCH_ITEM_SUCCESS = 'STORY_FETCH_ITEM_SUCCESS';
export const STORY_FETCH_ITEM_FAILED = 'STORY_FETCH_ITEM_FAILED';

export const STORY_CREATE_ITEM = 'STORY_CREATE_ITEM';
export const STORY_CREATE_ITEM_SUCCESS = 'STORY_CREATE_ITEM_SUCCESS';
export const STORY_CREATE_ITEM_FAILED = 'STORY_CREATE_ITEM_FAILED';

export const STORY_DELETE_ITEM = 'STORY_DELETE_ITEM';
export const STORY_DELETE_ITEM_SUCCESS = 'STORY_DELETE_ITEM_SUCCESS';
export const STORY_DELETE_ITEM_FAILED = 'STORY_DELETE_ITEM_FAILED';

export const STORY_UPDATE_ITEM = 'STORY_UPDATE_ITEM';
export const STORY_UPDATE_ITEM_SUCCESS = 'STORY_UPDATE_ITEM_SUCCESS';
export const STORY_UPDATE_ITEM_FAILED = 'STORY_UPDATE_ITEM_FAILED';

export const READ_MODE_TOGGLE = 'READ_MODE_TOGGLE';


export function StoryFetchList(data) {
  return {
    type: STORY_FETCH_LIST,
    data
  }
}
export function StoryFetchItem(uuid) {
  return {
    type: STORY_FETCH_ITEM,
    uuid
  }
}

export function StoryCreateItem(data) {
  return {
    type: STORY_CREATE_ITEM,
    data
  }
}

export function StoryDeleteItem(uuid) {
  return {
    type: STORY_DELETE_ITEM,
    uuid
  }
}

export function StoryUpdateItem(data) {
  return {
    type: STORY_UPDATE_ITEM,
    data
  }
}

export function ReadModeToggle() {
  return {
    type: READ_MODE_TOGGLE
  }
}