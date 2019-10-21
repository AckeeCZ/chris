# routing-history

Routing history is a module for storing your routing history into redux store. It stores current (active) path info and previous path info. The module depends on a few important packages:

-   **redux** - to store the routing history
-   **connected-react-router** - to access the info about path

As you can see, the module is intended to be used with **React**, **Redux** and **React-router**.

## Table of contents

* [Reducer](#reducer)
* [Selectors](#selectors)

## Usage

To make the module working, you have to inject its reducer into your application.

### Reducer

```javascript
import routingHistory from '@ackee/chris/routing-history';
...

const { reducer: history } = routingHistory;
    
const reducer = combineReducers({
    app,
    history, // do not forget the name of the reducer, you will need it
    ...
})

export default reducer;
```

By now, the module is working. It listens on `LOCATION_CHANGE` action from **connected-react-router** and stores the info into the history reducer via the history saga. 

### Selectors
If you want to access the info in the history reducer, we expose you two selectors factories to make the selectors. 

For example of using factories we're going to use `history` for a reducer name as in reducer usage example.

* #### `previousLocationSelectorFactory(reducerName: string): Function`

    Selector returns previous route at app or `{ pathname: '' }` if it's a first route.

    ```js
    import routingHistory from '@ackee/chris/routing-history';

    const previousLocationSelector = previousLocationSelectorFactory('history');

    const mapStateToProps = state => ({
        previousLocation: previousLocationSelector(state),
    });
    ```


* #### `activeLocationSelectorFactory(reducerName: string): Function`

    Selector returns current app route or `{ pathname: '' }` if current route not set yet.

    ```js
    import routingHistory from '@ackee/chris/routing-history';

    const activeLocationSelector = activeLocationSelectorFactory('history');

    const mapStateToProps = state => ({
        activeLocation: activeLocationSelector(state),
    });
    ```

You can use the selectors together with our `runRouteDependecies` helper to realize _on-route-change_ and _post-route-change_ actions.
