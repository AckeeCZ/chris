function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { all } from 'redux-saga/effects';
/**
 * Helper to combine dependencies handlers for `runRouteDependecies`.
 * Accepts infinite number of handlers objects ({'template': sagaHandler})
 * and returns exactly one for usage in `runRouteDependecies`.
 * Supports same keys in the handlers objects.
 * viz. `runRouteDependecies`
 */

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
              return all(tasks);

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

export default function combineDependenciesHandler() {
  for (var _len2 = arguments.length, routeHandlers = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    routeHandlers[_key2] = arguments[_key2];
  }

  var registeredHandlers = registerRouteHandlers(routeHandlers);
  return createHandlers(registeredHandlers);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy91dGlsaXRpZXMvY29tYmluZURlcGVuZGVuY2llc0hhbmRsZXJzLnRzIl0sIm5hbWVzIjpbImFsbCIsImlzVmFsdWVGbiIsImVudHJ5Iiwid3JhcFNhZ2FzIiwic2FnYXMiLCJhcmdzIiwidGFza3MiLCJtYXAiLCJzYWdhIiwicmVnaXN0ZXJSb3V0ZUhhbmRsZXJzIiwicm91dGVIYW5kbGVycyIsInJlZ2lzdGVyIiwiZGVwZW5kZW5jaWVzIiwiZW50cmllcyIsIk9iamVjdCIsImZpbHRlciIsInJvdXRlIiwiY29uY2F0IiwiY3JlYXRlSGFuZGxlcnMiLCJoYW5kbGVycyIsImNvbWJpbmVEZXBlbmRlbmNpZXNIYW5kbGVyIiwicmVnaXN0ZXJlZEhhbmRsZXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLFNBQVNBLEdBQVQsUUFBb0Isb0JBQXBCO0FBRUE7Ozs7Ozs7O0FBb0JBLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNDLEtBQUQ7QUFBQSxTQUFnRCxPQUFPQSxLQUFLLENBQUMsQ0FBRCxDQUFaLEtBQW9CLFVBQXBFO0FBQUEsQ0FBbEI7O0FBRUEsU0FBU0MsU0FBVCxDQUFtQkMsS0FBbkIsRUFBZ0U7QUFDNUQ7QUFBQTtBQUFBLDRCQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFhQyxJQUFiO0FBQWFBLGdCQUFBQSxJQUFiO0FBQUE7O0FBQ0dDLGNBQUFBLEtBREgsR0FDV0YsS0FBSyxDQUFDRyxHQUFOLENBQVUsVUFBQUMsSUFBSTtBQUFBLHVCQUFJQSxJQUFJLE1BQUosU0FBUUgsSUFBUixDQUFKO0FBQUEsZUFBZCxDQURYO0FBQUE7QUFHSCxxQkFBTUwsR0FBRyxDQUFDTSxLQUFELENBQVQ7O0FBSEc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBUDtBQUFBO0FBS0g7O0FBRUQsU0FBU0cscUJBQVQsQ0FBK0JDLGFBQS9CLEVBQW1GO0FBQy9FLE1BQU1DLFFBQTRCLEdBQUcsRUFBckM7QUFEK0U7QUFBQTtBQUFBOztBQUFBO0FBRy9FLHlCQUEyQkQsYUFBM0IsOEhBQTBDO0FBQUEsVUFBL0JFLFlBQStCO0FBQ3RDLFVBQU1DLE9BQU8sR0FBR0MsTUFBTSxDQUFDRCxPQUFQLENBQWVELFlBQWYsRUFBNkJHLE1BQTdCLENBQW9DZCxTQUFwQyxDQUFoQjtBQURzQztBQUFBO0FBQUE7O0FBQUE7QUFHdEMsOEJBQTRCWSxPQUE1QixtSUFBcUM7QUFBQTtBQUFBLGNBQXpCRyxNQUF5QjtBQUFBLGNBQWxCUixJQUFrQjs7QUFDakMsY0FBTUosS0FBSyxHQUFHTyxRQUFRLENBQUNLLE1BQUQsQ0FBUixJQUFtQixFQUFqQztBQUVBTCxVQUFBQSxRQUFRLENBQUNLLE1BQUQsQ0FBUixHQUFrQlosS0FBSyxDQUFDYSxNQUFOLENBQWFULElBQWIsQ0FBbEI7QUFDSDtBQVBxQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUXpDO0FBWDhFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBYS9FLFNBQU9HLFFBQVA7QUFDSDs7QUFFRCxTQUFTTyxjQUFULENBQXdCUCxRQUF4QixFQUFnRTtBQUM1RCxNQUFNUSxRQUFrQixHQUFHLEVBQTNCOztBQUQ0RCxjQUcvQkwsTUFBTSxDQUFDRCxPQUFQLENBQWVGLFFBQWYsQ0FIK0I7O0FBRzVELCtDQUF1RDtBQUFBO0FBQUEsUUFBM0NLLE9BQTJDO0FBQUEsUUFBcENaLEtBQW9DOztBQUNuRGUsSUFBQUEsUUFBUSxDQUFDSCxPQUFELENBQVIsR0FBa0JiLFNBQVMsQ0FBQ0MsS0FBRCxDQUEzQjtBQUNIOztBQUVELFNBQU9lLFFBQVA7QUFDSDs7QUFFRCxlQUFlLFNBQVNDLDBCQUFULEdBQWlGO0FBQUEscUNBQTFDVixhQUEwQztBQUExQ0EsSUFBQUEsYUFBMEM7QUFBQTs7QUFDNUYsTUFBTVcsa0JBQWtCLEdBQUdaLHFCQUFxQixDQUFDQyxhQUFELENBQWhEO0FBRUEsU0FBT1EsY0FBYyxDQUFDRyxrQkFBRCxDQUFyQjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWxsIH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcblxuLyoqXG4gKiBIZWxwZXIgdG8gY29tYmluZSBkZXBlbmRlbmNpZXMgaGFuZGxlcnMgZm9yIGBydW5Sb3V0ZURlcGVuZGVjaWVzYC5cbiAqIEFjY2VwdHMgaW5maW5pdGUgbnVtYmVyIG9mIGhhbmRsZXJzIG9iamVjdHMgKHsndGVtcGxhdGUnOiBzYWdhSGFuZGxlcn0pXG4gKiBhbmQgcmV0dXJucyBleGFjdGx5IG9uZSBmb3IgdXNhZ2UgaW4gYHJ1blJvdXRlRGVwZW5kZWNpZXNgLlxuICogU3VwcG9ydHMgc2FtZSBrZXlzIGluIHRoZSBoYW5kbGVycyBvYmplY3RzLlxuICogdml6LiBgcnVuUm91dGVEZXBlbmRlY2llc2BcbiAqL1xuXG50eXBlIFJvdXRlSGFuZGxlcnMgPSB7XG4gICAgW3RlbXBsYXRlOiBzdHJpbmddOiBDYWxsYWJsZUZ1bmN0aW9uO1xufTtcblxudHlwZSBIYW5kbGVycyA9IHtcbiAgICBbcm91dGU6IHN0cmluZ106IENhbGxhYmxlRnVuY3Rpb247XG59O1xuXG50eXBlIFJlZ2lzdGVyZWRIYW5kbGVycyA9IHtcbiAgICBbcm91dGU6IHN0cmluZ106IENhbGxhYmxlRnVuY3Rpb25bXTtcbn07XG5cbmNvbnN0IGlzVmFsdWVGbiA9IChlbnRyeTogW3N0cmluZywgQ2FsbGFibGVGdW5jdGlvbl0pOiBib29sZWFuID0+IHR5cGVvZiBlbnRyeVsxXSA9PT0gJ2Z1bmN0aW9uJztcblxuZnVuY3Rpb24gd3JhcFNhZ2FzKHNhZ2FzOiBDYWxsYWJsZUZ1bmN0aW9uW10pOiBDYWxsYWJsZUZ1bmN0aW9uIHtcbiAgICByZXR1cm4gZnVuY3Rpb24qKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGNvbnN0IHRhc2tzID0gc2FnYXMubWFwKHNhZ2EgPT4gc2FnYSguLi5hcmdzKSk7XG5cbiAgICAgICAgeWllbGQgYWxsKHRhc2tzKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiByZWdpc3RlclJvdXRlSGFuZGxlcnMocm91dGVIYW5kbGVyczogUm91dGVIYW5kbGVyc1tdKTogUmVnaXN0ZXJlZEhhbmRsZXJzIHtcbiAgICBjb25zdCByZWdpc3RlcjogUmVnaXN0ZXJlZEhhbmRsZXJzID0ge307XG5cbiAgICBmb3IgKGNvbnN0IGRlcGVuZGVuY2llcyBvZiByb3V0ZUhhbmRsZXJzKSB7XG4gICAgICAgIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhkZXBlbmRlbmNpZXMpLmZpbHRlcihpc1ZhbHVlRm4pO1xuXG4gICAgICAgIGZvciAoY29uc3QgW3JvdXRlLCBzYWdhXSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgICBjb25zdCBzYWdhcyA9IHJlZ2lzdGVyW3JvdXRlXSB8fCBbXTtcblxuICAgICAgICAgICAgcmVnaXN0ZXJbcm91dGVdID0gc2FnYXMuY29uY2F0KHNhZ2EpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlZ2lzdGVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIYW5kbGVycyhyZWdpc3RlcjogUmVnaXN0ZXJlZEhhbmRsZXJzKTogSGFuZGxlcnMge1xuICAgIGNvbnN0IGhhbmRsZXJzOiBIYW5kbGVycyA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBbcm91dGUsIHNhZ2FzXSBvZiBPYmplY3QuZW50cmllcyhyZWdpc3RlcikpIHtcbiAgICAgICAgaGFuZGxlcnNbcm91dGVdID0gd3JhcFNhZ2FzKHNhZ2FzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGFuZGxlcnM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbWJpbmVEZXBlbmRlbmNpZXNIYW5kbGVyKC4uLnJvdXRlSGFuZGxlcnM6IFJvdXRlSGFuZGxlcnNbXSk6IEhhbmRsZXJzIHtcbiAgICBjb25zdCByZWdpc3RlcmVkSGFuZGxlcnMgPSByZWdpc3RlclJvdXRlSGFuZGxlcnMocm91dGVIYW5kbGVycyk7XG5cbiAgICByZXR1cm4gY3JlYXRlSGFuZGxlcnMocmVnaXN0ZXJlZEhhbmRsZXJzKTtcbn1cbiJdfQ==