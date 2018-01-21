import { fork } from 'redux-saga/effects';
import StorySagas from './StorySagas';
import EncounterSagas from './EncounterSagas'
import EncounterPartsSagas from './EncounterPartsSagas'

export default function* rootSaga() {
    yield [
        fork(StorySagas),
        fork(EncounterSagas),
        fork(EncounterPartsSagas)
    ];
}