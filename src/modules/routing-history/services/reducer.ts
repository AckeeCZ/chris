import { LOCATION_CHANGE } from '../dependecies';

import { Action, PartialState } from '../types';

const initialState: PartialState = {
    previousLocation: null,
    activeLocation: null,
};

export default function(state: PartialState = initialState, action: Action) {
    switch (action.type) {
        case LOCATION_CHANGE: {
            return {
                previousLocation: state.activeLocation,
                activeLocation: action.payload.location,
            };
        }
        default:
            return state;
    }
}
