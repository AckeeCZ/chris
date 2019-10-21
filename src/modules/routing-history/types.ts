import { LocationChangeAction } from 'connected-react-router';
import { AnyAction as ReduxAction } from 'redux';
import { Location } from 'history';

export type ReducerName = string;

export interface PartialState {
    previousLocation: Location | null;
    activeLocation: Location | null;
}

export interface State {
    [key: string]: PartialState;
}

export type Action = LocationChangeAction | ReduxAction;
