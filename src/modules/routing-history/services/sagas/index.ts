import { sagaEffects, LOCATION_CHANGE } from '../../dependecies';
import { Action } from '../../types';

import { addLocation } from '../actions';

const { put, takeEvery } = sagaEffects;

export default function*() {
    yield takeEvery(LOCATION_CHANGE, function*({ payload }: Action) {
        yield put(addLocation(payload.location, payload.action));
    });
}
