
import {
	ENCOUNTER_PART_FETCH_LIST,
	ENCOUNTER_PART_FETCH_LIST_SUCCESS,
	ENCOUNTER_PART_FETCH_LIST_FAILED,

	ENCOUNTER_PART_FETCH_ITEM,
	ENCOUNTER_PART_FETCH_ITEM_SUCCESS,
	ENCOUNTER_PART_FETCH_ITEM_FAILED,

	ENCOUNTER_PART_CREATE_ITEM,
	ENCOUNTER_PART_CREATE_ITEM_SUCCESS,
	ENCOUNTER_PART_CREATE_ITEM_FAILED,

	ENCOUNTER_PART_SELECT_ACTIVE,
	ENCOUNTER_PART_SELECT_ACTIVE_SUCCESS,
	ENCOUNTER_PART_SELECT_ACTIVE_FAILED,

	ENCOUNTER_PART_GET_NODE_TREE,
	ENCOUNTER_PART_GET_NODE_TREE_SUCCESS,

	ENCOUNTER_PART_INIT_UPDATE,
	ENCOUNTER_PART_INIT_UPDATE_SUCCESS,
	ENCOUNTER_PART_INIT_UPDATE_FAILED,

	ENCOUNTER_PART_UPDATE_ITEM,
	ENCOUNTER_PART_UPDATE_ITEM_SUCCESS,
	ENCOUNTER_PART_UPDATE_ITEM_FAILED,

} from './../Actions/EncounterPartActions';

import {
	ENCOUNTER_FETCH_ITEM_SUCCESS
} from './../Actions/EncounterActions';

const initialState = {
	list: [],
	created: null,
	loading: false,
	detail: null,
	active: null,
	nodeTree: null
}

export function EncounterPartsReducer(state = initialState, action) {
	switch(action.type) {
		case ENCOUNTER_PART_FETCH_LIST:
			return { 
				...state,
				loading: true
			}

		case ENCOUNTER_FETCH_ITEM_SUCCESS: 
			return {
				...state,
				active: action.data.start_encounter_part_uuid
			}

		case ENCOUNTER_PART_FETCH_LIST_SUCCESS:

			return { 
				...state,
				loading: false,
				list: action.data
			}
		case ENCOUNTER_PART_FETCH_ITEM: 
			return {
				...state,
				loading: true
			}

		case ENCOUNTER_PART_FETCH_ITEM_SUCCESS:
			return {
				...state,
				loading: false,
				detail: action.data
			}
			
	    case ENCOUNTER_PART_CREATE_ITEM:
	      return {
	        ...state,
	        loading: true
	      }

	    case ENCOUNTER_PART_CREATE_ITEM_SUCCESS:
	      return {
	        ...state,
	        created: action.data,
	        loading: false
	      }

			case ENCOUNTER_PART_SELECT_ACTIVE:
	     	return {
	     		...state,
					 loading:true
				}

			case ENCOUNTER_PART_SELECT_ACTIVE_SUCCESS:
	     	return {
	     		...state,
					 active: action.id,
					 active_follows: action.data.follows
				}
				 
			case ENCOUNTER_PART_GET_NODE_TREE:
				return {
					...state,
					loading: true
				}	

			case ENCOUNTER_PART_GET_NODE_TREE_SUCCESS:
				return {
					...state,
					loading: false,
					nodeTree:	action.data
				}	

			case ENCOUNTER_PART_INIT_UPDATE:
				return {
					...state,
					loading: true
				}	
	
			case ENCOUNTER_PART_INIT_UPDATE_SUCCESS:
				return {
					...state,
					loading: false,
					update: action.id
				}	
	
			case ENCOUNTER_PART_UPDATE_ITEM:
				return {
					...state,
					loading: true,
					created: null,
					detail: null
				}	
	
			case ENCOUNTER_PART_UPDATE_ITEM_SUCCESS:
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