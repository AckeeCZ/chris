"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combineDependenciesHandler;

var _effects = require("redux-saga/effects");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var isValueFn = function isValueFn(entry) {
  return typeof entry[1] === 'function';
};

function wrapSagas(sagas) {
  return (
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _len,
          args,
          _key,
          tasks,
          _args = arguments;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args[_key];
              }

              tasks = sagas.map(function (saga) {
                return saga.apply(void 0, args);
              });
              _context.next = 4;
              return (0, _effects.all)(tasks);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })
  );
}

function registerRouteHandlers(routeHandlers) {
  var register = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = routeHandlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var dependencies = _step.value;
      var entries = Object.entries(dependencies).filter(isValueFn);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = entries[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              _route = _step2$value[0],
              saga = _step2$value[1];

          var sagas = register[_route] || [];
          register[_route] = sagas.concat(saga);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return register;
}

function createHandlers(register) {
  var handlers = {};

  var _arr2 = Object.entries(register);

  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    var _arr2$_i = _slicedToArray(_arr2[_i2], 2),
        _route2 = _arr2$_i[0],
        sagas = _arr2$_i[1];

    handlers[_route2] = wrapSagas(sagas);
  }

  return handlers;
}

function combineDependenciesHandler() {
  for (var _len2 = arguments.length, routeHandlers = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    routeHandlers[_key2] = arguments[_key2];
  }

  var registeredHandlers = registerRouteHandlers(routeHandlers);
  return createHandlers(registeredHandlers);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy91dGlsaXRpZXMvY29tYmluZURlcGVuZGVuY2llc0hhbmRsZXJzLnRzIl0sIm5hbWVzIjpbImlzVmFsdWVGbiIsImVudHJ5Iiwid3JhcFNhZ2FzIiwic2FnYXMiLCJhcmdzIiwidGFza3MiLCJtYXAiLCJzYWdhIiwicmVnaXN0ZXJSb3V0ZUhhbmRsZXJzIiwicm91dGVIYW5kbGVycyIsInJlZ2lzdGVyIiwiZGVwZW5kZW5jaWVzIiwiZW50cmllcyIsIk9iamVjdCIsImZpbHRlciIsInJvdXRlIiwiY29uY2F0IiwiY3JlYXRlSGFuZGxlcnMiLCJoYW5kbGVycyIsImNvbWJpbmVEZXBlbmRlbmNpZXNIYW5kbGVyIiwicmVnaXN0ZXJlZEhhbmRsZXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7QUFzQkEsSUFBTUEsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQ0MsS0FBRDtBQUFBLFNBQWdELE9BQU9BLEtBQUssQ0FBQyxDQUFELENBQVosS0FBb0IsVUFBcEU7QUFBQSxDQUFsQjs7QUFFQSxTQUFTQyxTQUFULENBQW1CQyxLQUFuQixFQUFnRTtBQUM1RDtBQUFBO0FBQUEsNEJBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQWFDLElBQWI7QUFBYUEsZ0JBQUFBLElBQWI7QUFBQTs7QUFDR0MsY0FBQUEsS0FESCxHQUNXRixLQUFLLENBQUNHLEdBQU4sQ0FBVSxVQUFBQyxJQUFJO0FBQUEsdUJBQUlBLElBQUksTUFBSixTQUFRSCxJQUFSLENBQUo7QUFBQSxlQUFkLENBRFg7QUFBQTtBQUdILHFCQUFNLGtCQUFJQyxLQUFKLENBQU47O0FBSEc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBUDtBQUFBO0FBS0g7O0FBRUQsU0FBU0cscUJBQVQsQ0FBK0JDLGFBQS9CLEVBQW1GO0FBQy9FLE1BQU1DLFFBQTRCLEdBQUcsRUFBckM7QUFEK0U7QUFBQTtBQUFBOztBQUFBO0FBRy9FLHlCQUEyQkQsYUFBM0IsOEhBQTBDO0FBQUEsVUFBL0JFLFlBQStCO0FBQ3RDLFVBQU1DLE9BQU8sR0FBR0MsTUFBTSxDQUFDRCxPQUFQLENBQWVELFlBQWYsRUFBNkJHLE1BQTdCLENBQW9DZCxTQUFwQyxDQUFoQjtBQURzQztBQUFBO0FBQUE7O0FBQUE7QUFHdEMsOEJBQTRCWSxPQUE1QixtSUFBcUM7QUFBQTtBQUFBLGNBQXpCRyxNQUF5QjtBQUFBLGNBQWxCUixJQUFrQjs7QUFDakMsY0FBTUosS0FBSyxHQUFHTyxRQUFRLENBQUNLLE1BQUQsQ0FBUixJQUFtQixFQUFqQztBQUVBTCxVQUFBQSxRQUFRLENBQUNLLE1BQUQsQ0FBUixHQUFrQlosS0FBSyxDQUFDYSxNQUFOLENBQWFULElBQWIsQ0FBbEI7QUFDSDtBQVBxQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUXpDO0FBWDhFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBYS9FLFNBQU9HLFFBQVA7QUFDSDs7QUFFRCxTQUFTTyxjQUFULENBQXdCUCxRQUF4QixFQUFnRTtBQUM1RCxNQUFNUSxRQUFrQixHQUFHLEVBQTNCOztBQUQ0RCxjQUcvQkwsTUFBTSxDQUFDRCxPQUFQLENBQWVGLFFBQWYsQ0FIK0I7O0FBRzVELCtDQUF1RDtBQUFBO0FBQUEsUUFBM0NLLE9BQTJDO0FBQUEsUUFBcENaLEtBQW9DOztBQUNuRGUsSUFBQUEsUUFBUSxDQUFDSCxPQUFELENBQVIsR0FBa0JiLFNBQVMsQ0FBQ0MsS0FBRCxDQUEzQjtBQUNIOztBQUVELFNBQU9lLFFBQVA7QUFDSDs7QUFFYyxTQUFTQywwQkFBVCxHQUFpRjtBQUFBLHFDQUExQ1YsYUFBMEM7QUFBMUNBLElBQUFBLGFBQTBDO0FBQUE7O0FBQzVGLE1BQU1XLGtCQUFrQixHQUFHWixxQkFBcUIsQ0FBQ0MsYUFBRCxDQUFoRDtBQUVBLFNBQU9RLGNBQWMsQ0FBQ0csa0JBQUQsQ0FBckI7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFsbCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5cbi8qKlxuICogSGVscGVyIHRvIGNvbWJpbmUgZGVwZW5kZW5jaWVzIGhhbmRsZXJzIGZvciBgcnVuUm91dGVEZXBlbmRlY2llc2AuXG4gKiBBY2NlcHRzIGluZmluaXRlIG51bWJlciBvZiBoYW5kbGVycyBvYmplY3RzICh7J3RlbXBsYXRlJzogc2FnYUhhbmRsZXJ9KVxuICogYW5kIHJldHVybnMgZXhhY3RseSBvbmUgZm9yIHVzYWdlIGluIGBydW5Sb3V0ZURlcGVuZGVjaWVzYC5cbiAqIFN1cHBvcnRzIHNhbWUga2V5cyBpbiB0aGUgaGFuZGxlcnMgb2JqZWN0cy5cbiAqIHZpei4gYHJ1blJvdXRlRGVwZW5kZWNpZXNgXG4gKi9cblxudHlwZSBSb3V0ZUhhbmRsZXJzID0ge1xuICAgIFt0ZW1wbGF0ZTogc3RyaW5nXTogQ2FsbGFibGVGdW5jdGlvbjtcbn07XG5cbnR5cGUgSGFuZGxlcnMgPSB7XG4gICAgW3JvdXRlOiBzdHJpbmddOiBDYWxsYWJsZUZ1bmN0aW9uO1xufTtcblxudHlwZSBSZWdpc3RlcmVkSGFuZGxlcnMgPSB7XG4gICAgW3JvdXRlOiBzdHJpbmddOiBDYWxsYWJsZUZ1bmN0aW9uW107XG59O1xuXG5jb25zdCBpc1ZhbHVlRm4gPSAoZW50cnk6IFtzdHJpbmcsIENhbGxhYmxlRnVuY3Rpb25dKTogYm9vbGVhbiA9PiB0eXBlb2YgZW50cnlbMV0gPT09ICdmdW5jdGlvbic7XG5cbmZ1bmN0aW9uIHdyYXBTYWdhcyhzYWdhczogQ2FsbGFibGVGdW5jdGlvbltdKTogQ2FsbGFibGVGdW5jdGlvbiB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKiguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBjb25zdCB0YXNrcyA9IHNhZ2FzLm1hcChzYWdhID0+IHNhZ2EoLi4uYXJncykpO1xuXG4gICAgICAgIHlpZWxkIGFsbCh0YXNrcyk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXJSb3V0ZUhhbmRsZXJzKHJvdXRlSGFuZGxlcnM6IFJvdXRlSGFuZGxlcnNbXSk6IFJlZ2lzdGVyZWRIYW5kbGVycyB7XG4gICAgY29uc3QgcmVnaXN0ZXI6IFJlZ2lzdGVyZWRIYW5kbGVycyA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBkZXBlbmRlbmNpZXMgb2Ygcm91dGVIYW5kbGVycykge1xuICAgICAgICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoZGVwZW5kZW5jaWVzKS5maWx0ZXIoaXNWYWx1ZUZuKTtcblxuICAgICAgICBmb3IgKGNvbnN0IFtyb3V0ZSwgc2FnYV0gb2YgZW50cmllcykge1xuICAgICAgICAgICAgY29uc3Qgc2FnYXMgPSByZWdpc3Rlcltyb3V0ZV0gfHwgW107XG5cbiAgICAgICAgICAgIHJlZ2lzdGVyW3JvdXRlXSA9IHNhZ2FzLmNvbmNhdChzYWdhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZWdpc3Rlcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSGFuZGxlcnMocmVnaXN0ZXI6IFJlZ2lzdGVyZWRIYW5kbGVycyk6IEhhbmRsZXJzIHtcbiAgICBjb25zdCBoYW5kbGVyczogSGFuZGxlcnMgPSB7fTtcblxuICAgIGZvciAoY29uc3QgW3JvdXRlLCBzYWdhc10gb2YgT2JqZWN0LmVudHJpZXMocmVnaXN0ZXIpKSB7XG4gICAgICAgIGhhbmRsZXJzW3JvdXRlXSA9IHdyYXBTYWdhcyhzYWdhcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhhbmRsZXJzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21iaW5lRGVwZW5kZW5jaWVzSGFuZGxlciguLi5yb3V0ZUhhbmRsZXJzOiBSb3V0ZUhhbmRsZXJzW10pOiBIYW5kbGVycyB7XG4gICAgY29uc3QgcmVnaXN0ZXJlZEhhbmRsZXJzID0gcmVnaXN0ZXJSb3V0ZUhhbmRsZXJzKHJvdXRlSGFuZGxlcnMpO1xuXG4gICAgcmV0dXJuIGNyZWF0ZUhhbmRsZXJzKHJlZ2lzdGVyZWRIYW5kbGVycyk7XG59XG4iXX0=