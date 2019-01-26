"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.history = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _history = require("history");

var _react2 = require("@storybook/react");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _connectedReactRouter = require("connected-react-router");

var _stories = require("../../stories");

var _routeDependencies = _interopRequireDefault(require("./routeDependencies"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _history.createBrowserHistory)();
exports.history = history;
var initialState = {
  users: {
    data: []
  }
};
var store = (0, _stories.configureStore)(initialState, {
  users: function users() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      data: []
    };
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'SET_DATA':
        return {
          data: action.payload
        };

      case _connectedReactRouter.LOCATION_CHANGE:
        return {
          data: []
        };

      default:
        return state;
    }
  },
  router: (0, _connectedReactRouter.connectRouter)(history)
}, (0, _connectedReactRouter.routerMiddleware)(history));

var readAndSetData = function readAndSetData() {
  var readCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  return {
    type: 'SET_DATA',
    payload: [{
      id: 1,
      name: 'Franta Vomáčka'
    }, {
      id: 2,
      name: 'Julian Zápotocký'
    }].slice(0, readCount)
  };
};

var UsersList = function UsersList(_ref) {
  var users = _ref.users,
      loadingText = _ref.loadingText;
  return _react.default.createElement("ul", null, users.length === 0 && loadingText, users.map(function (user) {
    return _react.default.createElement("li", {
      key: user.id
    }, user.name);
  }));
};

UsersList.propTypes = {
  users: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.number.isRequired,
    name: _propTypes.default.string.isRequired
  })).isRequired,
  loadingText: _propTypes.default.string.isRequired
};

var delayedDispatch = function delayedDispatch(dispatch, reduxAction) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    setTimeout(function () {
      return dispatch(reduxAction.apply(void 0, args));
    }, 3000);
  };
};

(0, _react2.storiesOf)('HOC/routeDependencies', module).addDecorator(function (story) {
  return _react.default.createElement(_reactRedux.Provider, {
    store: store
  }, _react.default.createElement(_connectedReactRouter.ConnectedRouter, {
    history: history
  }, story()));
}).add('default enter handler', function () {
  var UsersListContainer = (0, _redux.compose)((0, _reactRedux.connect)(function (state) {
    return {
      users: state.users.data
    };
  }, function (dispatch) {
    return {
      read: delayedDispatch(dispatch, readAndSetData)
    };
  }), (0, _routeDependencies.default)())(UsersList);
  return _react.default.createElement(UsersListContainer, {
    loadingText: "Na\u010D\xEDt\xE1m v\u0161echny u\u017Eivatele..."
  });
}).add('custom enter handler', function () {
  var UsersListContainer = (0, _redux.compose)((0, _reactRedux.connect)(function (state) {
    return {
      users: state.users.data
    };
  }, function (dispatch) {
    return {
      read: delayedDispatch(dispatch, readAndSetData)
    };
  }), (0, _routeDependencies.default)({
    onRouteEnter: function onRouteEnter(_ref2) {
      var read = _ref2.read;

      if (typeof read === 'function') {
        read(1);
      }
    }
  }))(UsersList);
  return _react.default.createElement(UsersListContainer, {
    loadingText: "Na\u010D\xEDt\xE1m prvn\xEDho u\u017Eivatele..."
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9IT0Mvcm91dGVEZXBlbmRlbmNpZXMuc3RvcnkudHN4Il0sIm5hbWVzIjpbImhpc3RvcnkiLCJpbml0aWFsU3RhdGUiLCJ1c2VycyIsImRhdGEiLCJzdG9yZSIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsInBheWxvYWQiLCJMT0NBVElPTl9DSEFOR0UiLCJyb3V0ZXIiLCJyZWFkQW5kU2V0RGF0YSIsInJlYWRDb3VudCIsImlkIiwibmFtZSIsInNsaWNlIiwiVXNlcnNMaXN0IiwibG9hZGluZ1RleHQiLCJsZW5ndGgiLCJtYXAiLCJ1c2VyIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiYXJyYXlPZiIsInNoYXBlIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsInN0cmluZyIsImRlbGF5ZWREaXNwYXRjaCIsImRpc3BhdGNoIiwicmVkdXhBY3Rpb24iLCJhcmdzIiwic2V0VGltZW91dCIsIm1vZHVsZSIsImFkZERlY29yYXRvciIsInN0b3J5IiwiYWRkIiwiVXNlcnNMaXN0Q29udGFpbmVyIiwicmVhZCIsIm9uUm91dGVFbnRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBRU8sSUFBTUEsT0FBTyxHQUFHLG9DQUFoQjs7QUFFUCxJQUFNQyxZQUFZLEdBQUc7QUFDakJDLEVBQUFBLEtBQUssRUFBRTtBQUNIQyxJQUFBQSxJQUFJLEVBQUU7QUFESDtBQURVLENBQXJCO0FBTUEsSUFBTUMsS0FBSyxHQUFHLDZCQUNWSCxZQURVLEVBRVY7QUFDSUMsRUFBQUEsS0FBSyxFQUFFLGlCQUE2QztBQUFBLFFBQTVDRyxLQUE0Qyx1RUFBcEM7QUFBRUYsTUFBQUEsSUFBSSxFQUFFO0FBQVIsS0FBb0M7QUFBQSxRQUF0QkcsTUFBc0I7O0FBQ2hELFlBQVFBLE1BQU0sQ0FBQ0MsSUFBZjtBQUNJLFdBQUssVUFBTDtBQUNJLGVBQU87QUFDSEosVUFBQUEsSUFB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ekJLLFNBTnlCLENBQTNCO0FBUUEsU0FBTyw2QkFBQyxrQkFBRDtBQUFvQixJQUFBLFdBQVcsRUFBQztBQUFoQyxJQUFQO0FBQ0gsQ0FoQkwsRUFpQktvQixHQWpCTCxDQWlCUyxzQkFqQlQsRUFpQmlDLFlBQU07QUFDL0IsTUFBTUMsa0JBQWtCLEdBQUcsb0JBQ3ZCLHlCQUNJLFVBQUNoQyxLQUFEO0FBQUEsV0FBbUI7QUFBRUgsTUFBQUEsS0FBSyxFQUFFRyxLQUFLLENBQUNILEtBQU4sQ0FBWUM7QUFBckIsS0FBbkI7QUFBQSxHQURKLEVBRUksVUFBQTBCLFFBQVE7QUFBQSxXQUFLO0FBQ1RTLE1BQUFBLElBQUksRUFBRVYsZUFBZSxDQUFDQyxRQUFELEVBQVdsQixjQUFYO0FBRFosS0FBTDtBQUFBLEdBRlosQ0FEdUIsRUFPdkIsZ0NBQWtCO0FBQ2Q0QixJQUFBQSxZQUFZLEVBQUUsNkJBQWM7QUFBQSxVQUFYRCxJQUFXLFNBQVhBLElBQVc7O0FBQ3hCLFVBQUksT0FBT0EsSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM1QkEsUUFBQUEsSUFBSSxDQUFDLENBQUQsQ0FBSjtBQUNIO0FBQ0o7QUFMYSxHQUFsQixDQVB1QixFQWN6QnRCLFNBZHlCLENBQTNCO0FBZ0JBLFNBQU8sNkJBQUMsa0JBQUQ7QUFBb0IsSUFBQSxXQUFXLEVBQUM7QUFBaEMsSUFBUDtBQUNILENBbkNMIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVCcm93c2VySGlzdG9yeSB9IGZyb20gJ2hpc3RvcnknO1xuaW1wb3J0IHsgc3Rvcmllc09mIH0gZnJvbSAnQHN0b3J5Ym9vay9yZWFjdCc7XG5pbXBvcnQgeyBBbnlBY3Rpb24sIGNvbXBvc2UsIERpc3BhdGNoLCBBY3Rpb25DcmVhdG9yIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgY29ubmVjdCwgUHJvdmlkZXIgYXMgU3RvcmVQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHJvdXRlck1pZGRsZXdhcmUsIGNvbm5lY3RSb3V0ZXIsIENvbm5lY3RlZFJvdXRlciwgTE9DQVRJT05fQ0hBTkdFIH0gZnJvbSAnY29ubmVjdGVkLXJlYWN0LXJvdXRlcic7XG5cbmltcG9ydCB7IGNvbmZpZ3VyZVN0b3JlIH0gZnJvbSAnLi4vLi4vc3Rvcmllcyc7XG5pbXBvcnQgcm91dGVEZXBlbmRlbmNpZXMgZnJvbSAnLi9yb3V0ZURlcGVuZGVuY2llcyc7XG5cbmV4cG9ydCBjb25zdCBoaXN0b3J5ID0gY3JlYXRlQnJvd3Nlckhpc3RvcnkoKTtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgIHVzZXJzOiB7XG4gICAgICAgIGRhdGE6IFtdLFxuICAgIH0sXG59O1xuXG5jb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKFxuICAgIGluaXRpYWxTdGF0ZSxcbiAgICB7XG4gICAgICAgIHVzZXJzOiAoc3RhdGUgPSB7IGRhdGE6IFtdIH0sIGFjdGlvbjogQW55QWN0aW9uKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnU0VUX0RBVEEnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY2FzZSBMT0NBVElPTl9DSEFOR0U6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJvdXRlcjogY29ubmVjdFJvdXRlcihoaXN0b3J5KSxcbiAgICB9LFxuICAgIHJvdXRlck1pZGRsZXdhcmUoaGlzdG9yeSksXG4pO1xuXG5jb25zdCByZWFkQW5kU2V0RGF0YSA9IChyZWFkQ291bnQ6IG51bWJlciA9IDIpID0+ICh7XG4gICAgdHlwZTogJ1NFVF9EQVRBJyxcbiAgICBwYXlsb2FkOiBbeyBpZDogMSwgbmFtZTogJ0ZyYW50YSBWb23DocSNa2EnIH0sIHsgaWQ6IDIsIG5hbWU6ICdKdWxpYW4gWsOhcG90b2Nrw70nIH1dLnNsaWNlKDAsIHJlYWRDb3VudCksXG59KTtcblxuaW50ZXJmYWNlIFVzZXIge1xuICAgIGlkOiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgUHJvcHMge1xuICAgIHVzZXJzOiBVc2VyW107XG4gICAgbG9hZGluZ1RleHQ6IHN0cmluZztcbn1cblxudHlwZSBDb21wb25lbnRQcm9wcyA9IFBpY2s8UHJvcHMsICdsb2FkaW5nVGV4dCc+O1xuXG5jb25zdCBVc2Vyc0xpc3QgPSAoeyB1c2VycywgbG9hZGluZ1RleHQgfTogUHJvcHMpID0+IChcbiAgICA8dWw+XG4gICAgICAgIHt1c2Vycy5sZW5ndGggPT09IDAgJiYgbG9hZGluZ1RleHR9XG4gICAgICAgIHt1c2Vycy5tYXAoKHVzZXI6IFVzZXIpID0+IChcbiAgICAgICAgICAgIDxsaSBrZXk9e3VzZXIuaWR9Pnt1c2VyLm5hbWV9PC9saT5cbiAgICAgICAgKSl9XG4gICAgPC91bD5cbik7XG5cblVzZXJzTGlzdC5wcm9wVHlwZXMgPSB7XG4gICAgdXNlcnM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgaWQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgfSksXG4gICAgKS5pc1JlcXVpcmVkLFxuICAgIGxvYWRpbmdUZXh0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuXG5pbnRlcmZhY2UgU3RhdGUge1xuICAgIHVzZXJzOiB7XG4gICAgICAgIGRhdGE6IFVzZXJbXTtcbiAgICB9O1xufVxuXG5jb25zdCBkZWxheWVkRGlzcGF0Y2ggPSAoZGlzcGF0Y2g6IERpc3BhdGNoLCByZWR1eEFjdGlvbjogQWN0aW9uQ3JlYXRvcjxhbnk+KSA9PiB7XG4gICAgcmV0dXJuICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGRpc3BhdGNoKHJlZHV4QWN0aW9uKC4uLmFyZ3MpKSwgMzAwMCk7XG4gICAgfTtcbn07XG5cbnN0b3JpZXNPZignSE9DL3JvdXRlRGVwZW5kZW5jaWVzJywgbW9kdWxlKVxuICAgIC5hZGREZWNvcmF0b3Ioc3RvcnkgPT4gKFxuICAgICAgICA8U3RvcmVQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgICAgPENvbm5lY3RlZFJvdXRlciBoaXN0b3J5PXtoaXN0b3J5fT57c3RvcnkoKX08L0Nvbm5lY3RlZFJvdXRlcj5cbiAgICAgICAgPC9TdG9yZVByb3ZpZGVyPlxuICAgICkpXG4gICAgLmFkZCgnZGVmYXVsdCBlbnRlciBoYW5kbGVyJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBVc2Vyc0xpc3RDb250YWluZXIgPSBjb21wb3NlPFJlYWN0LlNGQzxDb21wb25lbnRQcm9wcz4+KFxuICAgICAgICAgICAgY29ubmVjdChcbiAgICAgICAgICAgICAgICAoc3RhdGU6IFN0YXRlKSA9PiAoeyB1c2Vyczogc3RhdGUudXNlcnMuZGF0YSB9KSxcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCA9PiAoeyByZWFkOiBkZWxheWVkRGlzcGF0Y2goZGlzcGF0Y2gsIHJlYWRBbmRTZXREYXRhKSB9KSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICByb3V0ZURlcGVuZGVuY2llcygpLFxuICAgICAgICApKFVzZXJzTGlzdCk7XG5cbiAgICAgICAgcmV0dXJuIDxVc2Vyc0xpc3RDb250YWluZXIgbG9hZGluZ1RleHQ9XCJOYcSNw610w6FtIHbFoWVjaG55IHXFvml2YXRlbGUuLi5cIiAvPjtcbiAgICB9KVxuICAgIC5hZGQoJ2N1c3RvbSBlbnRlciBoYW5kbGVyJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBVc2Vyc0xpc3RDb250YWluZXIgPSBjb21wb3NlPFJlYWN0LlNGQzxDb21wb25lbnRQcm9wcz4+KFxuICAgICAgICAgICAgY29ubmVjdChcbiAgICAgICAgICAgICAgICAoc3RhdGU6IFN0YXRlKSA9PiAoeyB1c2Vyczogc3RhdGUudXNlcnMuZGF0YSB9KSxcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCA9PiAoe1xuICAgICAgICAgICAgICAgICAgICByZWFkOiBkZWxheWVkRGlzcGF0Y2goZGlzcGF0Y2gsIHJlYWRBbmRTZXREYXRhKSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICByb3V0ZURlcGVuZGVuY2llcyh7XG4gICAgICAgICAgICAgICAgb25Sb3V0ZUVudGVyOiAoeyByZWFkIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWFkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkKDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICApKFVzZXJzTGlzdCk7XG5cbiAgICAgICAgcmV0dXJuIDxVc2Vyc0xpc3RDb250YWluZXIgbG9hZGluZ1RleHQ9XCJOYcSNw610w6FtIHBydm7DrWhvIHXFvml2YXRlbGUuLi5cIiAvPjtcbiAgICB9KTtcbiJdfQ==