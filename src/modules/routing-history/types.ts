import { Action as ReduxAction } from 'redux';
import { Location } from 'history';
import ActionTypes from './services/actionTypes';

export type ReducerName = string;

export interface PartialState {
    previousLocation: Location | null;
    activeLocation: Location | null;
}

export interface State {
    [key: string]: PartialState;
}

export interface Action extends ReduxAction<ActionTypes> {
    [extraProps: string]: any;
}
