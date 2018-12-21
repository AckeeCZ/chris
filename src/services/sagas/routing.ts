import _ from 'lodash';
import pathToRegex from 'path-to-regexp';
import { put, select, all, takeEvery, takeLatest } from 'redux-saga/effects';

import { routingSelector } from '../selectors';

/**
 * Single saga runner, automatic try-catch with _COMPLETED, _SUCCEEDED, _FAILED event dispatches
 * @param type : String
 * @param saga : Generator
 * @returns {*} : Generator
 */
function* tryCatch(type, saga) {
    const completed = action => ({ type: `${action.type}_COMPLETED` });
    const succeeded = (action, result) => ({
        type: `${action.type}_SUCCEEDED`,
        result,
    });
    const failed = (action, error) => ({
        type: `${action.type}_FAILED`,
        error,
    });

    return yield takeLatest(type, function* invokeSaga(...args) {
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
 * Sagas: {[ActionType]: sagaHandler}
 * @param sagas : Object
 */
export function* runSagas(sagas) {
    const handlers = [];
    const actionKeys = _.keys(sagas);
    for (type of actionKeys.length; i += 1) {
        const type = actionKeys[i];
        const saga = sagas[type];
        handlers.push(tryCatch(type, saga));
    }
    yield all(handlers);
}

/**
 * Function that matches path to template and returns object of paramters if matched
 * @param path : String
 * @param template : String
 * @returns params : Object
 */
function matchPathToTemplate(path, template) {
    const keys = [];
    const params = pathToRegex(template, keys).exec(path);
    const reducer = (res, x, i) => {
        res[x.name] = params[i + 1];
        return res;
    };
    return params ? keys.reduce(reducer, {}) : null;
}

/**
 * Dependecies saga runner that runs sagaHandler for given route path if matches template
 * Sagas: {'template': sagaHandler}
 * @param sagas : Object
 * @param selector: (state: Object) => ({ pathname: String }: Object)
 */
export function* runRouteDependencies(handlers, selector = routingSelector) {
    const routing = yield select(selector);
    const pathname = _.get(routing, 'pathname');

    if (typeof pathname !== 'string') {
        console.warn(
            `Pathname is expected to be string but is ${typeof pathname}\nThis is likely caused by custom selector you have passed via parameters.`,
        );
        return;
    }

    const handlersToRun = [];
    // eslint-disable-next-line
    for (const template in handlers) {
        const params = matchPathToTemplate(pathname, template);
        if (params) {
            handlersToRun.push(handlers[template](params));
        }
    }
    yield all(handlersToRun);
}

// Alias for runRouteDependecies
export function* runRouteActions(handlers, selector) {
    yield runRouteDependencies(handlers, selector);
}

/**
 * Saga to refresh route dependecies after action is done
 * @param {*} initType - intial action
 * @param {*} type - action to be dispatched into store
 * @param {*} handlers - viz. runRouteDependecies
 */
export function* routeRefresh(initType, type, handlers) {
    yield takeEvery(initType, function*(action) {
        yield put({
            ...action,
            type,
        });
        yield runRouteDependencies(handlers);
    });
}
