import {
	ENCOUNTER_FETCH_LIST,
	ENCOUNTER_FETCH_LIST_SUCCESS,
	ENCOUNTER_FETCH_LIST_FAILED,

	ENCOUNTER_FETCH_ITEM,
	ENCOUNTER_FETCH_ITEM_SUCCESS,
	ENCOUNTER_FETCH_ITEM_FAILED,

	ENCOUNTER_CREATE_ITEM,
	ENCOUNTER_CREATE_ITEM_SUCCESS,
	ENCOUNTER_CREATE_ITEM_FAILED,

	ENCOUNTER_DELETE_ITEM,
	ENCOUNTER_DELETE_ITEM_SUCCESS,
	ENCOUNTER_DELETE_ITEM_FAILED,

	ENCOUNTER_INIT_UPDATE,
	ENCOUNTER_INIT_UPDATE_SUCCESS,
	ENCOUNTER_INIT_UPDATE_FAILED,

	ENCOUNTER_UPDATE_ITEM,
	ENCOUNTER_UPDATE_ITEM_SUCCESS,
	ENCOUNTER_UPDATE_ITEM_FAILED,

} from './../Actions/EncounterActions';

const initialState = {
	list: [],
	created: null,
	loading: false,
	detail: null,
	update: null,
	active: null
}

export function EncounterReducer(state = initialState, action) {
	switch(action.type) {
		case ENCOUNTER_FETCH_LIST:
			return { 
				...state,
				loading: true,
				list: []
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
				loading: true,
				detail: null
			}

		case ENCOUNTER_FETCH_ITEM_SUCCESS:
			return {
				...state,
				loading: false,
				detail: action.data
			}
			
		case ENCOUNTER_CREATE_ITEM:
			return {
				...state,
				loading: true,
				created: null
			}

		case ENCOUNTER_CREATE_ITEM_SUCCESS:
			return {
				...state,
				loading: false,
				created: action.data
			}

		case ENCOUNTER_DELETE_ITEM:
			return {
				...state,
				loading: true,
				created: null,
				update: null,
				detail: null
			}

		case ENCOUNTER_DELETE_ITEM_SUCCESS:
			return {
				...state,
				loading: false,
				detail: null
			}
			
		case ENCOUNTER_INIT_UPDATE:
			return {
				...state,
				loading: true
			}	

		case ENCOUNTER_INIT_UPDATE_SUCCESS:
			return {
				...state,
				loading: false,
				update: action.id
			}	

		case ENCOUNTER_UPDATE_ITEM:
			return {
				...state,
				loading: true,
				created: null,
			}	

		case ENCOUNTER_UPDATE_ITEM_SUCCESS:
			return {
				...state,
				loading:false,
				detail: null,
				update: null
			}

		default: 
			return state;
	}
}