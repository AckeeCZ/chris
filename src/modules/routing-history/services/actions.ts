import { Location } from 'history';
import types from './actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const addLocation = (location: Location) => ({
    type: types.ADD_LOCATION,
    location,
});
