import { Action, PartialState } from '../types';
import types from './actionTypes';
import  { HistoryActions } from './constants';

const initialState: PartialState = {
    previousLocation: null,
    activeLocation: null,
};

export default function(state: PartialState = initialState, action: Action) {
    switch (action.type) {
        case types.ADD_LOCATION: {
            const historyAction = action.payload.action;
            if (historyAction === HistoryActions.POP) {
                return {
                    ...state,
                    activeLocation: action.payload.location,
                };
            }
            return {
                previousLocation: state.activeLocation,
                activeLocation: action.payload.location,
            };
        }
        default:
            return state;
    }
}
