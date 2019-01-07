import _ from 'lodash';
import pathToRegex from 'path-to-regexp';
import { Action as ReduxAction } from 'redux';
import { put, select, all, takeEvery, takeLatest } from 'redux-saga/effects';
import { Location } from 'history';

import { logger } from '../../config';
import { routingSelector } from '../selectors';
import { LocationSelector } from '../../types';

type PathParams = { [key: string]: string };

type RouteHandlers = { [template: string]: GeneratorFunction };

/**
 * Single saga runner, automatic try-catch with _COMPLETED, _SUCCEEDED, _FAILED event dispatches
 */
function* tryCatch(type: string, saga: GeneratorFunction): Generator {
    const completed = (action: ReduxAction) => ({ type: `${action.type}_COMPLETED` });
    const succeeded = (action: ReduxAction, result: any) => ({
        type: `${action.type}_SUCCEEDED`,
        result,
    });
    const failed = (action: ReduxAction, error: Error) => ({
        type: `${action.type}_FAILED`,
        error,
    });

    return yield takeLatest(type, function* invokeSaga(...args: any[]) {
        const action = args[0];
        try {
            const result = yield saga(...args);
            yield put(succeeded(action, result));
        } catch (e) {
            yield put(failed(action, e));
        }
        yield put(completed(action));
    });
}

/**
 * Automatically invokes all given sagas for given event
 */
export function* runSagas(sagas: { [actionType: string]: GeneratorFunction }) {
    const handlers = [];
    const actionKeys = _.keys(sagas);
    for (const type of actionKeys) {
        const saga = sagas[type];
        handlers.push(tryCatch(type, saga));
    }
    yield all(handlers);
}

/**
 * Function that matches path to template and returns object of paramters if matched
 */
function matchPathToTemplate(path: string, template: string): PathParams | null {
    const keys: pathToRegex.Key[] = [];
    const params: RegExpExecArray | null = pathToRegex(template, keys).exec(path);
    const reducer = (res: PathParams, x: pathToRegex.Key, i: number) => {
        res[x.name] = params![i + 1];
        return res;
    };
    return params ? keys.reduce(reducer, {}) : null;
}

/**
 * Dependecies saga runner that runs sagaHandler for given route path if matches template
 * Sagas: {'template': sagaHandler}
 */
export function* runRouteDependencies(
    handlers: RouteHandlers,
    selector: LocationSelector = routingSelector,
) {
    const routing: Location = yield select(selector);
    const pathname = _.get(routing, 'pathname');

    if (typeof pathname !== 'string') {
        logger.warn(
            `
            Pathname is expected to be string but is ${typeof pathname}\n
            This is likely caused by custom selector you have passed via parameters.
            `,
        );
        return;
    }

    const handlersToRun = [];
    // tslint:disable-next-line
    for (const template in handlers) {
        const params = matchPathToTemplate(pathname, template);
        if (params) {
            handlersToRun.push(handlers[template](params));
        }
    }
    yield all(handlersToRun);
}

// Alias for runRouteDependecies
export function* runRouteActions(handlers: RouteHandlers, selector: LocationSelector) {
    yield runRouteDependencies(handlers, selector);
}

/**
 * Saga to refresh route dependecies after action is done
 */
export function* routeRefresh(initType: string|string[], type: string, handlers: RouteHandlers) {
    yield takeEvery(initType, function*(action: ReduxAction) {
        yield put({
            ...action,
            type,
        });
        yield runRouteDependencies(handlers);
    });
}
