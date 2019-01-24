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
import { routingHistory } from '@ackee/chris';

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

TBD

#### `runSagas(sagas: {[ActionType]: sagaHandler})`

TBD

---

### Modules

#### Routing history

There is a routing history module for handling history in redux & react-router apps called [routingHistory](./src/modules/routing-history/README.md)

```js
import { routingHistory } from '@ackee/chris';
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

#### `routeDependencies(config?: Config) => ComponentWithRouteDependencies`

High order component used to request data for wrapped component. If you wrap your page components with the HOC it will ensure that data the page need will be request right after component render.

In default HOC call `read` function passed through props when component mount and `clear` before it unmount. If it doesn't suit you, supply a config that define your way of handling. All methods in config are optional and if they aren't supplied, default ones are used.

```typescript
interface Config {
    onRouteEnter?: (props) => void;
    onRouteLeave?: (props) => void;
    shouldReRoute?: (prevProps, nextProps) => boolean;
    propsMapping?: (props: P & OptionalProps) => MappedProps;
}
```

##### Example - Use with default config

```js
const UsersListPageContainer = compose(
    connect(
        state => ({ users: state.users }),
        dispatch => bindActionCreators({ 
            read: requestUsers,
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
        (state: State) => ({ users: state.user }),
        dispatch => ({
            requestUserDetail: delayedDispatch(dispatch, requestUser),
            clearUserDetail: delayedDispatch(dispatch, clearUser),
        }),
    ),
    routeDependencies({
        onRouteEnter: ({ match, requestUserDetail }) => {
            requestUserDetail(match.params.id);
        },
        onRouteLeave: ({ match, clearUserDetail }) => {
            clearUserDetail();
        },
        shouldReroute: (prevProps, props) => {
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
