import { sagaEffects, routingSelector, LOCATION_CHANGE, LocationSelector } from '../../dependecies';

import { addLocation } from '../actions';

const { select, put, takeEvery } = sagaEffects;

export default function*(selector: LocationSelector = routingSelector) {
    yield takeEvery(LOCATION_CHANGE, function*() {
        const location = yield select(selector);

        yield put(addLocation(location));
    });
}
