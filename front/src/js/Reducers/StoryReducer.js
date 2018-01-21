
import {
	STORY_FETCH_LIST,
	STORY_FETCH_LIST_SUCCESS,
	STORY_FETCH_LIST_FAILED,

	STORY_FETCH_ITEM,
	STORY_FETCH_ITEM_SUCCESS,
	STORY_FETCH_ITEM_FAILED,

	STORY_CREATE_ITEM,
	STORY_CREATE_ITEM_SUCCESS,
	STORY_CREATE_ITEM_FAILED
} from './../Actions/StoryActions';

const initialState = {
	list: [],
	created: null,
	loading: false,
	detail: null
}

export function StoryReducer(state = initialState, action) {
	switch(action.type) {
		case STORY_FETCH_LIST:
			return { 
				...state,
				loading: true
			}

		case STORY_FETCH_LIST_SUCCESS:
			return { 
				...state,
				loading: false,
				list: action.data.data
			}
		case STORY_FETCH_ITEM: 
			return {
				...state,
				loading: true
			}

		case STORY_FETCH_ITEM_SUCCESS:
			return {
				...state,
				loading: false,
				detail: action.data
			}
	    case STORY_CREATE_ITEM:
	      console.log("init")
	      return {
	        ...state,
	        loading: true
	      }

	    case STORY_CREATE_ITEM_SUCCESS:
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