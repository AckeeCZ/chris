function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import types from './actionTypes';
import { HistoryActions } from './constants';
var initialState = {
  previousLocation: null,
  activeLocation: null
};
export default function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case types.ADD_LOCATION:
      {
        var historyAction = action.payload.action;

        if (historyAction === HistoryActions.POP) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3JvdXRpbmctaGlzdG9yeS9zZXJ2aWNlcy9yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbInR5cGVzIiwiSGlzdG9yeUFjdGlvbnMiLCJpbml0aWFsU3RhdGUiLCJwcmV2aW91c0xvY2F0aW9uIiwiYWN0aXZlTG9jYXRpb24iLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJBRERfTE9DQVRJT04iLCJoaXN0b3J5QWN0aW9uIiwicGF5bG9hZCIsIlBPUCIsImxvY2F0aW9uIl0sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBT0EsS0FBUCxNQUFrQixlQUFsQjtBQUNBLFNBQVNDLGNBQVQsUUFBK0IsYUFBL0I7QUFFQSxJQUFNQyxZQUEwQixHQUFHO0FBQy9CQyxFQUFBQSxnQkFBZ0IsRUFBRSxJQURhO0FBRS9CQyxFQUFBQSxjQUFjLEVBQUU7QUFGZSxDQUFuQztBQUtBLGVBQWUsWUFBNkQ7QUFBQSxNQUFwREMsS0FBb0QsdUVBQTlCSCxZQUE4QjtBQUFBLE1BQWhCSSxNQUFnQjs7QUFDeEUsVUFBUUEsTUFBTSxDQUFDQyxJQUFmO0FBQ0ksU0FBS1AsS0FBSyxDQUFDUSxZQUFYO0FBQXlCO0FBQ3JCLFlBQU1DLGFBQWEsR0FBR0gsTUFBTSxDQUFDSSxPQUFQLENBQWVKLE1BQXJDOztBQUNBLFlBQUlHLGFBQWEsS0FBS1IsY0FBYyxDQUFDVSxHQUFyQyxFQUEwQztBQUN0QyxtQ0FDT04sS0FEUDtBQUVJRCxZQUFBQSxjQUFjLEVBQUVFLE1BQU0sQ0FBQ0ksT0FBUCxDQUFlRTtBQUZuQztBQUlIOztBQUNELGVBQU87QUFDSFQsVUFBQUEsZ0JBQWdCLEVBQUVFLEtBQUssQ0FBQ0QsY0FEckI7QUFFSEEsVUFBQUEsY0FBYyxFQUFFRSxNQUFNLENBQUNJLE9BQVAsQ0FBZUU7QUFGNUIsU0FBUDtBQUlIOztBQUNEO0FBQ0ksYUFBT1AsS0FBUDtBQWZSO0FBaUJIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uLCBQYXJ0aWFsU3RhdGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgdHlwZXMgZnJvbSAnLi9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgeyBIaXN0b3J5QWN0aW9ucyB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuY29uc3QgaW5pdGlhbFN0YXRlOiBQYXJ0aWFsU3RhdGUgPSB7XG4gICAgcHJldmlvdXNMb2NhdGlvbjogbnVsbCxcbiAgICBhY3RpdmVMb2NhdGlvbjogbnVsbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN0YXRlOiBQYXJ0aWFsU3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogQWN0aW9uKSB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIHR5cGVzLkFERF9MT0NBVElPTjoge1xuICAgICAgICAgICAgY29uc3QgaGlzdG9yeUFjdGlvbiA9IGFjdGlvbi5wYXlsb2FkLmFjdGlvbjtcbiAgICAgICAgICAgIGlmIChoaXN0b3J5QWN0aW9uID09PSBIaXN0b3J5QWN0aW9ucy5QT1ApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlTG9jYXRpb246IGFjdGlvbi5wYXlsb2FkLmxvY2F0aW9uLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHByZXZpb3VzTG9jYXRpb246IHN0YXRlLmFjdGl2ZUxvY2F0aW9uLFxuICAgICAgICAgICAgICAgIGFjdGl2ZUxvY2F0aW9uOiBhY3Rpb24ucGF5bG9hZC5sb2NhdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59XG4iXX0=