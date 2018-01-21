import { combineReducers } from 'redux'

import { StoryReducer } from './StoryReducer'
import { EncounterReducer } from './EncounterReducer'
import { EncounterPartsReducer } from './EncounterPartsReducer'

const Reducers = combineReducers({
  story: StoryReducer,
  encounter: EncounterReducer,
  encounterParts: EncounterPartsReducer
})

export default Reducers