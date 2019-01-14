import { Location } from '../dependecies';
import types from './actionTypes';
import { HistoryActions } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const addLocation = (location: Location, action: HistoryActions) => ({
    type: types.ADD_LOCATION,
    payload: {
        location,
        action,
    },
});
