# routing-history

Routing history is a module for storing your routing history into redux store. It stores current (active) path info and previous path info. The module depends on a few important packages:

-   **redux** - to store the routing history
-   **connected-react-router** - to access the info about path
-   **redux-saga** - to do the business logic 

As you can see, the module is intended to be used with **React**, **Redux** and **React-router**.

## Usage

To make the module working, you have to inject its reducer and saga into your application.

### reducer.js

```javascript
import { routingHistory } from '@ackee/chris';
...
    
const reducer = combineReducers({
    app,
    history, // do not forget the name of the reducer, you will need it
    ...
})

export default reducer;
```

### saga.js

```javascript
import { routingHistory } from  '@ackee/chris';
...

export default function*() {
    yield all([
        app(),
        history(),
        ...
    ])
}
```

By now, the module is working. It listens on `LOCATION_CHANGE` action from **connected-react-router** and stores the info into the history reducer via the history saga. 
If you want to access the info in the history reducer, we expose you two selectors. You can use them together with our `runRouteDependecies` helper to realize _on-route-change_ and _post-route-change_ actions.

### routeDependeciesSaga.js

```javascript
import { runRouteDependencies } from 'ackee-frontend-toolkit/lib/sagas/routing';
import {
    activeLocationSelectorFactory,
    routingHistory '@ackee/chris';
...

const activeLocationSelector = activeLocationSelectorFactory('history'); // remember i've told you to keep in mind the name of the reducer?
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

With usage of `runRouteDependencies` and `routing-history`, you can exclude business logic from React `componentDidMount` and `componentWillUnmount` and download the data you need for the current page outside of React components. **Seperation of concerns huh? LIT!**
