# routing-history

Routing history is a module for storing your routing history into redux store. It stores current (active) path info and previous path info. The module depends on a few important packages:

-   **redux** - to store the routing history
-   **connected-react-router** - to access the info about path
-   **redux-saga** - to do the business logic 

As you can see, the module is intended to be used with **React**, **Redux** and **React-router**.

## Usage

To make the module working, you have to inject its reducer and saga into your application.

### Reducer

```javascript
import { routingHistory } from '@ackee/chris';
...

const { reducer: history } = routingHistory;
    
const reducer = combineReducers({
    app,
    history, // do not forget the name of the reducer, you will need it
    ...
})

export default reducer;
```

### Saga

```javascript
import { routingHistory } from  '@ackee/chris';
...

const { saga: history } = routingHistory;

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
