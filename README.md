![ackee|chris](./assets/ackee_git_frontend_chris.png)

# [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AckeeCZ/chris/blob/master/LICENSE) [![CI Status](https://img.shields.io/travis/com/AckeeCZ/chris.svg?style=flat)](https://travis-ci.com/AckeeCZ/chris) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request) [![Dependency Status](https://img.shields.io/david/AckeeCZ/chris.svg?style=flat-square)](https://david-dm.org/AckeeCZ/chris)

# Chris

> Useful additions for your redux - react-router based app.

> Name of package refers to [Saint Christopher](https://en.wikipedia.org/wiki/Saint_Christopher), patron of travellers at their routes. Chris is just its [shorter form](https://en.wikipedia.org/wiki/Chris) used for easier remembrance and writability.

## Table of contents

* [Installation](#installation)
* [API](#api)
    * [Selectors](#selectors)
    * [Sagas](#sagas)
    * [Modules](#modules)
    * [Utilities](#utilities)
    * [HOC](#hoc)
    

## Installation

Using npm:

`npm i -s @ackee/chris`

Using yarn:

`yarn add @ackee/chris`

## API

### Selectors

#### `routingSelector`

Selector for [`connected-react-router`](https://github.com/supasate/connected-react-router) state, which returns [`location`](https://reacttraining.com/react-router/web/api/location).

----

### Sagas

#### `runRouteDependencies(handlers: {[ActionType], sagaHandler}, selector: ReduxSelector)`

With usage of `runRouteDependencies` and [`routing-history`](#routing-history), you can exclude business logic from React `componentDidMount` and `componentWillUnmount` and download the data you need for the current page outside of React components.

Example - react to new route

```js
import { runRouteDependencies } from '@ackee/chris';

const handlers = {
    '/user/:id': function* ({ id }) {
        // fetch user data and store it
    }
};

export default function* () {
    yield all([
        takeEvery(LOCATION_CHANGE, runRouteDependencies, handlers),
    ])
}
```

Example - react to new route and clean data when leaving it

```js
import { runRouteDependencies } from '@ackee/chris';
import routingHistory from '@ackee/chris/routing-history';

const { activeLocationSelectorFactory, previousLocationSelectorFactory } = routingHistory;

// 'history' is the name of routingHistory module state
const activeLocationSelector = activeLocationSelectorFactory('history'); 
const previousLocationSelector = previousLocationSelectorFactory('history');

const handlers = {
    '/user/:id': function* ({ id }) {
        // fetch user data and store it
    }
};
const postHandlers = {
    '/user/:id': function* ({ id }) {
        // flush user data from the store
    }
};

export default function* () {
    yield all([
        takeEvery(LOCATION_CHANGE, runRouteDependencies, handlers, activeLocationSelector),
        takeEvery(LOCATION_CHANGE, runRouteDependencies, postHandlers, previousLocationSelector),
    ])
}
```

#### `runRouteActions(handlers: {[ActionType], sagaHandler})`

Alias for `runRouteDependencies` saga.

#### `routeRefresh(initType: ActionType, type: ActionType, handlers: function)`

Saga to refresh route dependecies. It run `runRouteDependencies(handlers)` every time `initType` action is dispatched.
Also action with `type` is dispatched before `runRouteDependencies` is invoked.

Let's say we have an application with more pages that have list of items with paging. Every time page change we want to
load new data for particular page.

```jsx
export default function* () {
    yield all([
        routeRefresh(
            actionTypes.app.SET_PAGE_START,
            actionTypes.app.SET_PAGE,
            {
                '/users': getUsers,
                '/invoices': getInvoices,
                ...
            },
        ),
    ])
}
```

When user change page of viewed list in application action `SET_PAGE_START` instead of `SET_PAGE` should be dispatched.
Then `SET_PAGE_START` is caught in `routeRefresh` and following happen
* action `SET_PAGE` is dispatched with all properties (except the `type` of course) from `SET_PAGE_START`. 
The `SET_PAGE` action should set the page to the state.
* as a next step, route dependencies are procceded with this call
    ```js
    runRouteDependencies({
        '/users': getUsers,
        '/invoices': getInvoices,
        ...
    })
    ```

#### `runSagas(sagas: {[ActionType]: sagaHandler})`

Automatically invokes all given sagas for given event. The invoke of saga is wrapped with try-catch saga that dispatch relevant actions. Look at the example fo better undestanding

```js
function*() getData {
    // This is a pseudo code, implementation of getting data from the API 
    // and setting them back to the state is up to you
    const users = yield api.get(config.api.users);
    yield put(setUsers(users));
}

export default function*() {
    return yield runSagas({
        [actionTypes.designs.REQUEST_USERS]: getData,
        [actionTypes.designs.REQUEST_OTHER_DATA]: getOtherData,
        ...
    });
}
```

* Once `REQUEST_USERS` is dispatched in application it's caught and handled by `getData` handler.
* When `getData` saga
    * throw an error during its run, action `REQUEST_USERS_FAILED` with `error` property is dispatched
    * run without error then action `REQUEST_USERS_SUCCEEDED` with property `result` is dispatched, where result is anything that `getData` saga returns (nothing in our example 😀)
* Action `REQUEST_USERS_COMPLETED` is dispatched at the end every time, no matter if running `getData` failed or succeded

> Little magic explanation:  
Actions dispatched during processing of a saga are automatically created inside the `runSagas` helper as a composition of the initial action (`REQUEST_USERS` in our example) and one of the prefixes - `_FAILED`, `_SUCCEEDED` or `_COMPLETED`.

---

### Modules

#### Routing history

There is a routing history module for handling history in redux & react-router apps called [routingHistory](./src/modules/routing-history/README.md)

```js
import routingHistory from '@ackee/chris/routing-history';
```

--- 

### Utilities

#### `combineDependenciesHandlers(...routeHandlers) => combinedRouteHandlers`

Helper to combine dependencies handlers for `runRouteDependecies`. Accepts infinite number of handlers objects `({'template': sagaHandler})` and returns exactly one for usage in `runRouteDependecies`. Supports same keys in the handlers objects

##### Usage

```js
import { routeHandlers as usersHandlers } from 'Modules/users';
import { routeHandlers as reviewsHandlers } from 'Modules/reviews';

export const appHandlers = {
    '/': homeSaga,
    '/logout': function* () {
        // ...
    },
};

const combinedRouteHandlers = combineDependenciesHandlers(
    appHandlers,
    usersHandlers,
    reviewsHandlers
);

runRouteDependencies(combinedRouteHandlers);
```

Each module (e.g. `Modules/users`) may exports its own `routeHandlers` object and the `combineDependenciesHandlers` utility handles their merging.

--- 

### HOC

#### <a name="fetch-dependencies"></a>`fetchDependencies(config?: Config) => (Component) => ComponentThatFetchDependencies`

High order component used to request data for wrapped component. If you wrap your page components with the HOC it will ensure that data it needs will be requested right after component render.

In default HOC calls `fetch` function passed through props when component mounts and `clear` before it unmounts. If it doesn't suit your needs, supply a config that define your own way of handling. All methods in config are optional and if they aren't supplied, default ones are used.

```typescript
interface Config {
    onLoad?: (props) => void;
    onUnload?: (props) => void;
    shouldReFetch?: (prevProps, nextProps) => boolean;
}
```

##### Example - Use with default config

```js
const UsersListPageContainer = compose(
    connect(
        state => ({ users: state.users }),
        dispatch => bindActionCreators({ 
            fetch: requestUsers,
            clear: deleteUsers 
        }, dispatch),
    ),
    fetchDependencies(),
)(UsersListPage);
    
const App = () => (
    <div>
        <UserListPageContainer />
    </div>
);
```

##### Example - Use with custom config

```js
const UserDetailPageContainer = compose(
    connect(
        (state: State) => ({
            user: state.user,
            userId: state.selectedUserId
        }),
        dispatch => bindActionCreators({
            requestUserDetail: requestUser,
            clearUserDetail: clearUser,
        }, dispatch),
    ),
    fetchDependencies({
        onLoad: ({ userId, requestUserDetail }) => {
            requestUserDetail(userId);
        },
        onUnload: ({ clearUserDetail }) => {
            clearUserDetail();
        },
        shouldReFetch: (prevProps, props) => {
            return prevProps.userId !=== props.userId;
        },
    }),
)(UserDetailPage);

const App = () => (
    <div>
        <UserListPageContainer />
    </div>
);
```

#### <a name="route-dependencies"></a>`routeDependencies(config?: Config) => (Component) => ComponentWithRouteDependencies`

> ![Alert](./assets/alert-icon.png) Important prerequistence for using the HOC is that you **must have `react-router`** in your app.

 HOC has same purpose and works almost same as [`fetchDependencies`](#fetch-dependencies) with few exceptions.

* It wraps component also with [`withRouter`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md) HOC so all props receive also router's `match`, `location` and `history` objects.
* Its config is slightly different especially in method names. Look at the definition:
    ```typescript
    interface Config {
        onRouteEnter?: (props) => void;
        onRouteLeave?: (props) => void;
        shouldReRoute?: (prevProps, nextProps) => boolean;
    }
    ```
* Default implementation of `shouldReRoute` invoke refetch of data every time any part of url change. It's used until you provide your own.

##### Example - Use with default config

```js
const UsersListPageContainer = compose(
    connect(
        state => ({ users: state.users }),
        dispatch => bindActionCreators({ 
            fetch: requestUsers,
            clear: deleteUsers 
        }, dispatch),
    ),
    routeDependencies(),
)(UsersListPage);
    
const App = () => (
    <Router>
        <div>
            <Route path="/users" component={UserListPageContainer}/>
        </div>
    </Router>
);
```

##### Example - Use with custom config

```js
const UserDetailPageContainer = compose(
    connect(
        (state: State) => ({ user: state.user }),
        dispatch => bindActionCreators({
            requestUserDetail: requestUser,
            clearUserDetail: clearUser,
        }, dispatch),
    ),
    routeDependencies({
        onRouteEnter: ({ match, requestUserDetail }) => {
            requestUserDetail(match.params.id);
        },
        onRouteLeave: ({ match, clearUserDetail }) => {
            clearUserDetail();
        },
        shouldReRoute: (prevProps, props) => {
            return prevProps.match.params.id !=== props.match.params.id;
        },
    }),
)(UserDetailPage);

const App = () => (
    <Router>
        <div>
            <Route path="/users/:id" component={UserDetailPageContainer}/>
        </div>
    </Router>
);
```
