'use strict';

export const ENCOUNTER_FETCH_LIST = 'ENCOUNTER_FETCH_LIST';
export const ENCOUNTER_FETCH_LIST_SUCCESS = 'ENCOUNTER_FETCH_LIST_SUCCESS';
export const ENCOUNTER_FETCH_LIST_FAILED = 'ENCOUNTER_FETCH_LIST_FAILED';

export const ENCOUNTER_FETCH_ITEM = 'ENCOUNTER_FETCH_ITEM';
export const ENCOUNTER_FETCH_ITEM_SUCCESS = 'ENCOUNTER_FETCH_ITEM_SUCCESS';
export const ENCOUNTER_FETCH_ITEM_FAILED = 'ENCOUNTER_FETCH_ITEM_FAILED';

export const ENCOUNTER_CREATE_ITEM = 'ENCOUNTER_CREATE_ITEM';
export const ENCOUNTER_CREATE_ITEM_SUCCESS = 'ENCOUNTER_CREATE_ITEM_SUCCESS';
export const ENCOUNTER_CREATE_ITEM_FAILED = 'ENCOUNTER_CREATE_ITEM_FAILED';

export const ENCOUNTER_DELETE_ITEM = 'ENCOUNTER_DELETE_ITEM';
export const ENCOUNTER_DELETE_ITEM_SUCCESS = 'ENCOUNTER_DELETE_ITEM_SUCCESS';
export const ENCOUNTER_DELETE_ITEM_FAILED = 'ENCOUNTER_DELETE_ITEM_FAILED';

export const ENCOUNTER_UPDATE_ITEM = 'ENCOUNTER_UPDATE_ITEM';
export const ENCOUNTER_UPDATE_ITEM_SUCCESS = 'ENCOUNTER_UPDATE_ITEM_SUCCESS';
export const ENCOUNTER_UPDATE_ITEM_FAILED = 'ENCOUNTER_UPDATE_ITEM_FAILED';

export const ENCOUNTER_INIT_UPDATE = 'ENCOUNTER_INIT_UPDATE';
export const ENCOUNTER_INIT_UPDATE_SUCCESS = 'ENCOUNTER_INIT_UPDATE_SUCCESS';
export const ENCOUNTER_INIT_UPDATE_FAILED = 'ENCOUNTER_INIT_UPDATE_FAILED';



export function EncounterFetchList(data) {
  return {
    type: ENCOUNTER_FETCH_LIST,
    data
  }
}
export function EncounterFetchItem(uuid) {
  return {
    type: ENCOUNTER_FETCH_ITEM,
    uuid
  }
}
export function EncounterCreateItem(data) {
  return {
    type: ENCOUNTER_CREATE_ITEM,
    data
  }
}

export function EncounterDeleteItem(data) {
  return {
    type: ENCOUNTER_DELETE_ITEM,
    data
  }
}

export function EncounterUpdateItem(data) {
  return {
    type: ENCOUNTER_UPDATE_ITEM,
    data
  }
}

export function EncounterInitUpdate(id) {
  return {
    type: ENCOUNTER_INIT_UPDATE,
    id
  }
}

