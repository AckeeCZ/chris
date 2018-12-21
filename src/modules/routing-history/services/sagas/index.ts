import { sagaEffects, routingSelector, LOCATION_CHANGE, RouterState, Location } from '../../dependecies';

import { State } from '../../types';
import { addLocation } from '../actions';

export type LocationSelector = (state: State & { router: RouterState }) => Location | null;

const { select, put, takeEvery } = sagaEffects;

export default function*(selector: LocationSelector = routingSelector) {
    yield takeEvery(LOCATION_CHANGE, function*() {
        const location = yield select(selector);

        yield put(addLocation(location));
    });
}
