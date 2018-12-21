![ackee|chris](https://img.ack.ee/ackee/image/github/js)

# Chris [![Build Status](https://travis-ci.com/AckeeCZ/chris.svg?branch=master)](https://travis-ci.com/AckeeCZ/chris)

> Useful additions for your redux - react-router based app.

> Name of package refers to [Saint Christopher](https://en.wikipedia.org/wiki/Saint_Christopher), patron of travellers at their routes. Chris is just name's [shorter form](https://en.wikipedia.org/wiki/Chris) used for easier remembrance and writability.

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

TBD

#### runRouteActions(handlers: {[ActionType], sagaHandler})

Alias for `runRouteDependencies` saga.

#### `routeRefresh(initType: ActionType, type: ActionType, handlers: function)`

TBD

#### `runSagas(sagas: {[ActionType]: sagaHandler})`

TBD


### <a name="modules"></a>Modules

#### `routing history`

There is a routing history module for handling history in redux & react-router apps called [routingHistory](./src/modules/routing-history/README.md)

```js
import { routingHistory } from '@ackee/chris';
````
