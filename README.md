![ackee|chris](https://img.ack.ee/ackee/image/github/js)

# Chris [![Build Status](https://travis-ci.com/AckeeCZ/chris.svg?branch=master)](https://travis-ci.com/AckeeCZ/chris)

> Useful additions for your redux - react-router based app.

> Name of package refers to [Saint Christopher](https://en.wikipedia.org/wiki/Saint_Christopher), patron of travellers at their routes. Chris is just it's [shorter form](https://en.wikipedia.org/wiki/Chris) used for easier remembrance and writability.

## Table of contents

* [Installation](#installation)
* [API](#api)
    * [Selectors](#selectors)
    * [Sagas](#sagas)
    * [Modules](#modules)
    

## <a name="installation"></a>Installation

Using npm:

`npm i -s @ackee/chris`

Using yarn:

`yarn add @ackee/chris`

## <a name="api"></a>API

### <a name="selectors"></a>Selectors

#### `routingSelector`

Selector for [`connected-react-router`](https://github.com/supasate/connected-react-router) state, which returns [`location`](https://reacttraining.com/react-router/web/api/location).

----

### <a name="sagas"></a>Sagas

#### `runRouteDependencies(handlers: {[ActionType], sagaHandler}, selector: ReduxSelector)`

With usage of `runRouteDependencies` and [`routing-history`](#module-routing-history), you can exclude business logic from React `componentDidMount` and `componentWillUnmount` and download the data you need for the current page outside of React components.

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

### <a name="modules"></a>Modules

#### <a name="module-routing-history">`routing history`

There is a routing history module for handling history in redux & react-router apps called [routingHistory](./src/modules/routing-history/README.md)

```js
import { routingHistory } from '@ackee/chris';
````
