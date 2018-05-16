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

