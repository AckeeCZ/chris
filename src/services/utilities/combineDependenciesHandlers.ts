import { all } from 'redux-saga/effects';

/**
 * Helper to combine dependencies handlers for `runRouteDependecies`.
 * Accepts infinite number of handlers objects ({'template': sagaHandler})
 * and returns exactly one for usage in `runRouteDependecies`.
 * Supports same keys in the handlers objects.
 * viz. `runRouteDependecies`
 */

type RouteHandlers = {
    [template: string]: CallableFunction;
};

type Handlers = {
    [route: string]: CallableFunction;
};

type RegisteredHandlers = {
    [route: string]: CallableFunction[];
};

const isValueFn = (entry: [string, CallableFunction]): boolean => typeof entry[1] === 'function';

function wrapSagas(sagas: CallableFunction[]): CallableFunction {
    return function*(...args: any[]) {
        const tasks = sagas.map(saga => saga(...args));

        yield all(tasks);
    };
}

function registerRouteHandlers(routeHandlers: RouteHandlers[]): RegisteredHandlers {
    const register: RegisteredHandlers = {};

    for (const dependencies of routeHandlers) {
        const entries = Object.entries(dependencies).filter(isValueFn);

        for (const [route, saga] of entries) {
            const sagas = register[route] || [];

            register[route] = sagas.concat(saga);
        }
    }

    return register;
}

function createHandlers(register: RegisteredHandlers): Handlers {
    const handlers: Handlers = {};

    for (const [route, sagas] of Object.entries(register)) {
        handlers[route] = wrapSagas(sagas);
    }

    return handlers;
}

export default function combineDependenciesHandler(...routeHandlers: RouteHandlers[]): Handlers {
    const registeredHandlers = registerRouteHandlers(routeHandlers);

    return createHandlers(registeredHandlers);
}
