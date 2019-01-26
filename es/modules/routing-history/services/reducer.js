"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  previousLocation: null,
  activeLocation: null
};

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes.default.ADD_LOCATION:
      {
        var historyAction = action.payload.action;

        if (historyAction === _constants.HistoryActions.POP) {
          return _objectSpread({}, state, {
            activeLocation: action.payload.location
          });
        }

        return {
          previousLocation: state.activeLocation,
          activeLocation: action.payload.location
        };
      }

    default:
      return state;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3JvdXRpbmctaGlzdG9yeS9zZXJ2aWNlcy9yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbImluaXRpYWxTdGF0ZSIsInByZXZpb3VzTG9jYXRpb24iLCJhY3RpdmVMb2NhdGlvbiIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsInR5cGVzIiwiQUREX0xPQ0FUSU9OIiwiaGlzdG9yeUFjdGlvbiIsInBheWxvYWQiLCJIaXN0b3J5QWN0aW9ucyIsIlBPUCIsImxvY2F0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBMEIsR0FBRztBQUMvQkMsRUFBQUEsZ0JBQWdCLEVBQUUsSUFEYTtBQUUvQkMsRUFBQUEsY0FBYyxFQUFFO0FBRmUsQ0FBbkM7O0FBS2Usb0JBQTZEO0FBQUEsTUFBcERDLEtBQW9ELHVFQUE5QkgsWUFBOEI7QUFBQSxNQUFoQkksTUFBZ0I7O0FBQ3hFLFVBQVFBLE1BQU0sQ0FBQ0MsSUFBZjtBQUNJLFNBQUtDLHFCQUFNQyxZQUFYO0FBQXlCO0FBQ3JCLFlBQU1DLGFBQWEsR0FBR0osTUFBTSxDQUFDSyxPQUFQLENBQWVMLE1BQXJDOztBQUNBLFlBQUlJLGFBQWEsS0FBS0UsMEJBQWVDLEdBQXJDLEVBQTBDO0FBQ3RDLG1DQUNPUixLQURQO0FBRUlELFlBQUFBLGNBQWMsRUFBRUUsTUFBTSxDQUFDSyxPQUFQLENBQWVHO0FBRm5DO0FBSUg7O0FBQ0QsZUFBTztBQUNIWCxVQUFBQSxnQkFBZ0IsRUFBRUUsS0FBSyxDQUFDRCxjQURyQjtBQUVIQSxVQUFBQSxjQUFjLEVBQUVFLE1BQU0sQ0FBQ0ssT0FBUCxDQUFlRztBQUY1QixTQUFQO0FBSUg7O0FBQ0Q7QUFDSSxhQUFPVCxLQUFQO0FBZlI7QUFpQkgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24sIFBhcnRpYWxTdGF0ZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB0eXBlcyBmcm9tICcuL2FjdGlvblR5cGVzJztcbmltcG9ydCB7IEhpc3RvcnlBY3Rpb25zIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5jb25zdCBpbml0aWFsU3RhdGU6IFBhcnRpYWxTdGF0ZSA9IHtcbiAgICBwcmV2aW91c0xvY2F0aW9uOiBudWxsLFxuICAgIGFjdGl2ZUxvY2F0aW9uOiBudWxsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3RhdGU6IFBhcnRpYWxTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBY3Rpb24pIHtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgdHlwZXMuQUREX0xPQ0FUSU9OOiB7XG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5QWN0aW9uID0gYWN0aW9uLnBheWxvYWQuYWN0aW9uO1xuICAgICAgICAgICAgaWYgKGhpc3RvcnlBY3Rpb24gPT09IEhpc3RvcnlBY3Rpb25zLlBPUCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVMb2NhdGlvbjogYWN0aW9uLnBheWxvYWQubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNMb2NhdGlvbjogc3RhdGUuYWN0aXZlTG9jYXRpb24sXG4gICAgICAgICAgICAgICAgYWN0aXZlTG9jYXRpb246IGFjdGlvbi5wYXlsb2FkLmxvY2F0aW9uLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn1cbiJdfQ==