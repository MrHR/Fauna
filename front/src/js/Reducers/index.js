import { combineReducers } from 'redux'

import { StoryReducer } from './StoryReducer'
import { EncounterReducer } from './EncounterReducer'
import { EncounterPartsReducer } from './EncounterPartsReducer'
import { UserReducer } from './UserReducer'

const Reducers = combineReducers({
  story: StoryReducer,
  encounter: EncounterReducer,
  encounterParts: EncounterPartsReducer,
  user: UserReducer
})

export default Reducers