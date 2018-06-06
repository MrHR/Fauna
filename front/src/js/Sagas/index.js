import { spawn, all } from 'redux-saga/effects';
import StorySagas from './StorySagas';
import EncounterSagas from './EncounterSagas'
import EncounterPartsSagas from './EncounterPartsSagas'
import UserSagas from './UserSagas';

export default function* rootSaga() {
    yield all([
        spawn(StorySagas),
        spawn(EncounterSagas),
        spawn(EncounterPartsSagas),
        spawn(UserSagas)
    ]);
}