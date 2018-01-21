
import {
	ENCOUNTER_FETCH_LIST,
	ENCOUNTER_FETCH_LIST_SUCCESS,
	ENCOUNTER_FETCH_LIST_FAILED,

	ENCOUNTER_FETCH_ITEM,
	ENCOUNTER_FETCH_ITEM_SUCCESS,
	ENCOUNTER_FETCH_ITEM_FAILED,

	ENCOUNTER_CREATE_ITEM,
	ENCOUNTER_CREATE_ITEM_SUCCESS,
	ENCOUNTER_CREATE_ITEM_FAILED
} from './../Actions/EncounterActions';

const initialState = {
	list: [],
	created: null,
	loading: false,
	detail: null
}

export function EncounterReducer(state = initialState, action) {
	switch(action.type) {
		case ENCOUNTER_FETCH_LIST:
			return { 
				...state,
				loading: true
			}

		case ENCOUNTER_FETCH_LIST_SUCCESS:
			return { 
				...state,
				loading: false,
				list: action.data
			}
		case ENCOUNTER_FETCH_ITEM: 
			return {
				...state,
				loading: true
			}

		case ENCOUNTER_FETCH_ITEM_SUCCESS:
			return {
				...state,
				loading: false,
				detail: action.data
			}
			
	    case ENCOUNTER_CREATE_ITEM:
	      console.log("init")
	      return {
	        ...state,
	        loading: true
	      }

	    case ENCOUNTER_CREATE_ITEM_SUCCESS:
	      console.log("init")
	      return {
	        ...state,
	        created: action.data,
	        loading: false
	      }

		default: 
			return state;
	}
}