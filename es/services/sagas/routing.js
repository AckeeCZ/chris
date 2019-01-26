function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(tryCatch),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(runSagas),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(runRouteDependencies),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(runRouteActions),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(routeRefresh);

import _ from 'lodash';
import pathToRegex from 'path-to-regexp';
import { put, select, all, takeEvery, takeLatest } from 'redux-saga/effects';
import { logger } from '../../config';
import { routingSelector } from '../selectors';

/**
 * Single saga runner, automatic try-catch with _COMPLETED, _SUCCEEDED, _FAILED event dispatches
 */
function tryCatch(type, saga) {
  var completed, succeeded, failed;
  return regeneratorRuntime.wrap(function tryCatch$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          completed = function completed(action) {
            return {
              type: "".concat(action.type, "_COMPLETED")
            };
          };

          succeeded = function succeeded(action, result) {
            return {
              type: "".concat(action.type, "_SUCCEEDED"),
              result: result
            };
          };

          failed = function failed(action, error) {
            return {
              type: "".concat(action.type, "_FAILED"),
              error: error
            };
          };

          _context2.next = 5;
          return takeLatest(type,
          /*#__PURE__*/
          regeneratorRuntime.mark(function invokeSaga() {
            var action,
                result,
                _args = arguments;
            return regeneratorRuntime.wrap(function invokeSaga$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    action = _args.length <= 0 ? undefined : _args[0];
                    _context.prev = 1;
                    _context.next = 4;
                    return saga.apply(void 0, _args);

                  case 4:
                    result = _context.sent;
                    _context.next = 7;
                    return put(succeeded(action, result));

                  case 7:
                    _context.next = 13;
                    break;

                  case 9:
                    _context.prev = 9;
                    _context.t0 = _context["catch"](1);
                    _context.next = 13;
                    return put(failed(action, _context.t0));

                  case 13:
                    _context.next = 15;
                    return put(completed(action));

                  case 15:
                  case "end":
                    return _context.stop();
                }
              }
            }, invokeSaga, this, [[1, 9]]);
          }));

        case 5:
          return _context2.abrupt("return", _context2.sent);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked, this);
}
/**
 * Automatically invokes all given sagas for given event
 */


export function runSagas(sagas) {
  var handlers, actionKeys, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, type, saga;

  return regeneratorRuntime.wrap(function runSagas$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          handlers = [];
          actionKeys = _.keys(sagas);
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 5;

          for (_iterator = actionKeys[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            type = _step.value;
            saga = sagas[type];
            handlers.push(tryCatch(type, saga));
          }

          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](5);
          _didIteratorError = true;
          _iteratorError = _context3.t0;

        case 13:
          _context3.prev = 13;
          _context3.prev = 14;

          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }

        case 16:
          _context3.prev = 16;

          if (!_didIteratorError) {
            _context3.next = 19;
            break;
          }

          throw _iteratorError;

        case 19:
          return _context3.finish(16);

        case 20:
          return _context3.finish(13);

        case 21:
          _context3.next = 23;
          return all(handlers);

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked2, this, [[5, 9, 13, 21], [14,, 16, 20]]);
}
/**
 * Function that matches path to template and returns object of paramters if matched
 */

function matchPathToTemplate(path, template) {
  var keys = [];
  var params = pathToRegex(template, keys).exec(path);

  var reducer = function reducer(res, x, i) {
    res[x.name] = params[i + 1];
    return res;
  };

  return params ? keys.reduce(reducer, {}) : null;
}
/**
 * Dependecies saga runner that runs sagaHandler for given route path if matches template
 * Sagas: {'template': sagaHandler}
 */


export function runRouteDependencies(handlers) {
  var selector,
      routing,
      pathname,
      handlersToRun,
      _template,
      params,
      _args4 = arguments;

  return regeneratorRuntime.wrap(function runRouteDependencies$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          selector = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : routingSelector;
          _context4.next = 3;
          return select(selector);

        case 3:
          routing = _context4.sent;
          pathname = _.get(routing, 'pathname');

          if (!(typeof pathname !== 'string')) {
            _context4.next = 8;
            break;
          }

          logger.warn("\n            Pathname is expected to be string but is ".concat(_typeof(pathname), "\n\n            This is likely caused by custom selector you have passed via parameters.\n            "));
          return _context4.abrupt("return");

        case 8:
          handlersToRun = []; // tslint:disable-next-line

          for (_template in handlers) {
            params = matchPathToTemplate(pathname, _template);

            if (params) {
              handlersToRun.push(handlers[_template](params));
            }
          }

          _context4.next = 12;
          return all(handlersToRun);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked3, this);
} // Alias for runRouteDependecies

export function runRouteActions(handlers, selector) {
  return regeneratorRuntime.wrap(function runRouteActions$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return runRouteDependencies(handlers, selector);

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked4, this);
}
/**
 * Saga to refresh route dependecies after action is done
 */

export function routeRefresh(initType, type, handlers) {
  return regeneratorRuntime.wrap(function routeRefresh$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return takeEvery(initType,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(action) {
            return regeneratorRuntime.wrap(function _callee$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return put(_objectSpread({}, action, {
                      type: type
                    }));

                  case 2:
                    _context6.next = 4;
                    return runRouteDependencies(handlers);

                  case 4:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee, this);
          }));

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked5, this);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9zYWdhcy9yb3V0aW5nLnRzIl0sIm5hbWVzIjpbInRyeUNhdGNoIiwicnVuU2FnYXMiLCJydW5Sb3V0ZURlcGVuZGVuY2llcyIsInJ1blJvdXRlQWN0aW9ucyIsInJvdXRlUmVmcmVzaCIsIl8iLCJwYXRoVG9SZWdleCIsInB1dCIsInNlbGVjdCIsImFsbCIsInRha2VFdmVyeSIsInRha2VMYXRlc3QiLCJsb2dnZXIiLCJyb3V0aW5nU2VsZWN0b3IiLCJ0eXBlIiwic2FnYSIsImNvbXBsZXRlZCIsImFjdGlvbiIsInN1Y2NlZWRlZCIsInJlc3VsdCIsImZhaWxlZCIsImVycm9yIiwiaW52b2tlU2FnYSIsInNhZ2FzIiwiaGFuZGxlcnMiLCJhY3Rpb25LZXlzIiwia2V5cyIsInB1c2giLCJtYXRjaFBhdGhUb1RlbXBsYXRlIiwicGF0aCIsInRlbXBsYXRlIiwicGFyYW1zIiwiZXhlYyIsInJlZHVjZXIiLCJyZXMiLCJ4IiwiaSIsIm5hbWUiLCJyZWR1Y2UiLCJzZWxlY3RvciIsInJvdXRpbmciLCJwYXRobmFtZSIsImdldCIsIndhcm4iLCJoYW5kbGVyc1RvUnVuIiwiaW5pdFR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O3dCQWlCVUEsUTs7O3dCQTBCT0MsUTs7O3dCQTJCQUMsb0I7Ozt3QkE2QkFDLGU7Ozt3QkFPQUMsWTs7QUExR2pCLE9BQU9DLENBQVAsTUFBYyxRQUFkO0FBQ0EsT0FBT0MsV0FBUCxNQUF3QixnQkFBeEI7QUFFQSxTQUFTQyxHQUFULEVBQWNDLE1BQWQsRUFBc0JDLEdBQXRCLEVBQTJCQyxTQUEzQixFQUFzQ0MsVUFBdEMsUUFBd0Qsb0JBQXhEO0FBR0EsU0FBU0MsTUFBVCxRQUF1QixjQUF2QjtBQUNBLFNBQVNDLGVBQVQsUUFBZ0MsY0FBaEM7O0FBT0E7OztBQUdBLFNBQVViLFFBQVYsQ0FBbUJjLElBQW5CLEVBQWlDQyxJQUFqQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVUMsVUFB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QTtBQUFBO0FBQUE7QUFDSCxpQkFBTXJDLG9CQUFvQixDQUFDc0IsUUFBRCxFQUFXZSxRQUFYLENBQTFCOztBQURHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSVA7Ozs7QUFHQSxPQUFPLFNBQVVuQyxZQUFWLENBQXVCeUMsUUFBdkIsRUFBa0QvQixJQUFsRCxFQUFnRVUsUUFBaEU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0gsaUJBQU1kLFNBQVMsQ0FBQ21DLFFBQUQ7QUFBQTtBQUFBLGtDQUFXLGlCQUFVNUIsTUFBVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDdEIsMkJBQU1WLEdBQUcsbUJBQ0ZVLE1BREU7QUFFTEgsc0JBQUFBLElBQUksRUFBSkE7QUFGSyx1QkFBVDs7QUFEc0I7QUFBQTtBQUt0QiwyQkFBTVosb0JBQW9CLENBQUNzQixRQUFELENBQTFCOztBQUxzQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUFYLEVBQWY7O0FBREc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHBhdGhUb1JlZ2V4IGZyb20gJ3BhdGgtdG8tcmVnZXhwJztcbmltcG9ydCB7IEFjdGlvbiBhcyBSZWR1eEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IHB1dCwgc2VsZWN0LCBhbGwsIHRha2VFdmVyeSwgdGFrZUxhdGVzdCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ2hpc3RvcnknO1xuXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0IHsgcm91dGluZ1NlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzJztcbmltcG9ydCB7IExvY2F0aW9uU2VsZWN0b3IgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5cbnR5cGUgUGF0aFBhcmFtcyA9IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG5cbnR5cGUgUm91dGVIYW5kbGVycyA9IHsgW3RlbXBsYXRlOiBzdHJpbmddOiBHZW5lcmF0b3JGdW5jdGlvbiB9O1xuXG4vKipcbiAqIFNpbmdsZSBzYWdhIHJ1bm5lciwgYXV0b21hdGljIHRyeS1jYXRjaCB3aXRoIF9DT01QTEVURUQsIF9TVUNDRUVERUQsIF9GQUlMRUQgZXZlbnQgZGlzcGF0Y2hlc1xuICovXG5mdW5jdGlvbiogdHJ5Q2F0Y2godHlwZTogc3RyaW5nLCBzYWdhOiBHZW5lcmF0b3JGdW5jdGlvbik6IEdlbmVyYXRvciB7XG4gICAgY29uc3QgY29tcGxldGVkID0gKGFjdGlvbjogUmVkdXhBY3Rpb24pID0+ICh7IHR5cGU6IGAke2FjdGlvbi50eXBlfV9DT01QTEVURURgIH0pO1xuICAgIGNvbnN0IHN1Y2NlZWRlZCA9IChhY3Rpb246IFJlZHV4QWN0aW9uLCByZXN1bHQ6IGFueSkgPT4gKHtcbiAgICAgICAgdHlwZTogYCR7YWN0aW9uLnR5cGV9X1NVQ0NFRURFRGAsXG4gICAgICAgIHJlc3VsdCxcbiAgICB9KTtcbiAgICBjb25zdCBmYWlsZWQgPSAoYWN0aW9uOiBSZWR1eEFjdGlvbiwgZXJyb3I6IEVycm9yKSA9PiAoe1xuICAgICAgICB0eXBlOiBgJHthY3Rpb24udHlwZX1fRkFJTEVEYCxcbiAgICAgICAgZXJyb3IsXG4gICAgfSk7XG5cbiAgICByZXR1cm4geWllbGQgdGFrZUxhdGVzdCh0eXBlLCBmdW5jdGlvbiogaW52b2tlU2FnYSguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBhcmdzWzBdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geWllbGQgc2FnYSguLi5hcmdzKTtcbiAgICAgICAgICAgIHlpZWxkIHB1dChzdWNjZWVkZWQoYWN0aW9uLCByZXN1bHQpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgeWllbGQgcHV0KGZhaWxlZChhY3Rpb24sIGUpKTtcbiAgICAgICAgfVxuICAgICAgICB5aWVsZCBwdXQoY29tcGxldGVkKGFjdGlvbikpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIEF1dG9tYXRpY2FsbHkgaW52b2tlcyBhbGwgZ2l2ZW4gc2FnYXMgZm9yIGdpdmVuIGV2ZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiogcnVuU2FnYXMoc2FnYXM6IHsgW2FjdGlvblR5cGU6IHN0cmluZ106IEdlbmVyYXRvckZ1bmN0aW9uIH0pIHtcbiAgICBjb25zdCBoYW5kbGVycyA9IFtdO1xuICAgIGNvbnN0IGFjdGlvbktleXMgPSBfLmtleXMoc2FnYXMpO1xuICAgIGZvciAoY29uc3QgdHlwZSBvZiBhY3Rpb25LZXlzKSB7XG4gICAgICAgIGNvbnN0IHNhZ2EgPSBzYWdhc1t0eXBlXTtcbiAgICAgICAgaGFuZGxlcnMucHVzaCh0cnlDYXRjaCh0eXBlLCBzYWdhKSk7XG4gICAgfVxuICAgIHlpZWxkIGFsbChoYW5kbGVycyk7XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdGhhdCBtYXRjaGVzIHBhdGggdG8gdGVtcGxhdGUgYW5kIHJldHVybnMgb2JqZWN0IG9mIHBhcmFtdGVycyBpZiBtYXRjaGVkXG4gKi9cbmZ1bmN0aW9uIG1hdGNoUGF0aFRvVGVtcGxhdGUocGF0aDogc3RyaW5nLCB0ZW1wbGF0ZTogc3RyaW5nKTogUGF0aFBhcmFtcyB8IG51bGwge1xuICAgIGNvbnN0IGtleXM6IHBhdGhUb1JlZ2V4LktleVtdID0gW107XG4gICAgY29uc3QgcGFyYW1zOiBSZWdFeHBFeGVjQXJyYXkgfCBudWxsID0gcGF0aFRvUmVnZXgodGVtcGxhdGUsIGtleXMpLmV4ZWMocGF0aCk7XG4gICAgY29uc3QgcmVkdWNlciA9IChyZXM6IFBhdGhQYXJhbXMsIHg6IHBhdGhUb1JlZ2V4LktleSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgIHJlc1t4Lm5hbWVdID0gcGFyYW1zIVtpICsgMV07XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfTtcbiAgICByZXR1cm4gcGFyYW1zID8ga2V5cy5yZWR1Y2UocmVkdWNlciwge30pIDogbnVsbDtcbn1cblxuLyoqXG4gKiBEZXBlbmRlY2llcyBzYWdhIHJ1bm5lciB0aGF0IHJ1bnMgc2FnYUhhbmRsZXIgZm9yIGdpdmVuIHJvdXRlIHBhdGggaWYgbWF0Y2hlcyB0ZW1wbGF0ZVxuICogU2FnYXM6IHsndGVtcGxhdGUnOiBzYWdhSGFuZGxlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uKiBydW5Sb3V0ZURlcGVuZGVuY2llcyhcbiAgICBoYW5kbGVyczogUm91dGVIYW5kbGVycyxcbiAgICBzZWxlY3RvcjogTG9jYXRpb25TZWxlY3RvciA9IHJvdXRpbmdTZWxlY3Rvcixcbikge1xuICAgIGNvbnN0IHJvdXRpbmc6IExvY2F0aW9uID0geWllbGQgc2VsZWN0KHNlbGVjdG9yKTtcbiAgICBjb25zdCBwYXRobmFtZSA9IF8uZ2V0KHJvdXRpbmcsICdwYXRobmFtZScpO1xuXG4gICAgaWYgKHR5cGVvZiBwYXRobmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgbG9nZ2VyLndhcm4oXG4gICAgICAgICAgICBgXG4gICAgICAgICAgICBQYXRobmFtZSBpcyBleHBlY3RlZCB0byBiZSBzdHJpbmcgYnV0IGlzICR7dHlwZW9mIHBhdGhuYW1lfVxcblxuICAgICAgICAgICAgVGhpcyBpcyBsaWtlbHkgY2F1c2VkIGJ5IGN1c3RvbSBzZWxlY3RvciB5b3UgaGF2ZSBwYXNzZWQgdmlhIHBhcmFtZXRlcnMuXG4gICAgICAgICAgICBgLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlcnNUb1J1biA9IFtdO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgIGZvciAoY29uc3QgdGVtcGxhdGUgaW4gaGFuZGxlcnMpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbWF0Y2hQYXRoVG9UZW1wbGF0ZShwYXRobmFtZSwgdGVtcGxhdGUpO1xuICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgICBoYW5kbGVyc1RvUnVuLnB1c2goaGFuZGxlcnNbdGVtcGxhdGVdKHBhcmFtcykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHlpZWxkIGFsbChoYW5kbGVyc1RvUnVuKTtcbn1cblxuLy8gQWxpYXMgZm9yIHJ1blJvdXRlRGVwZW5kZWNpZXNcbmV4cG9ydCBmdW5jdGlvbiogcnVuUm91dGVBY3Rpb25zKGhhbmRsZXJzOiBSb3V0ZUhhbmRsZXJzLCBzZWxlY3RvcjogTG9jYXRpb25TZWxlY3Rvcikge1xuICAgIHlpZWxkIHJ1blJvdXRlRGVwZW5kZW5jaWVzKGhhbmRsZXJzLCBzZWxlY3Rvcik7XG59XG5cbi8qKlxuICogU2FnYSB0byByZWZyZXNoIHJvdXRlIGRlcGVuZGVjaWVzIGFmdGVyIGFjdGlvbiBpcyBkb25lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiogcm91dGVSZWZyZXNoKGluaXRUeXBlOiBzdHJpbmd8c3RyaW5nW10sIHR5cGU6IHN0cmluZywgaGFuZGxlcnM6IFJvdXRlSGFuZGxlcnMpIHtcbiAgICB5aWVsZCB0YWtlRXZlcnkoaW5pdFR5cGUsIGZ1bmN0aW9uKihhY3Rpb246IFJlZHV4QWN0aW9uKSB7XG4gICAgICAgIHlpZWxkIHB1dCh7XG4gICAgICAgICAgICAuLi5hY3Rpb24sXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICB9KTtcbiAgICAgICAgeWllbGQgcnVuUm91dGVEZXBlbmRlbmNpZXMoaGFuZGxlcnMpO1xuICAgIH0pO1xufVxuIl19