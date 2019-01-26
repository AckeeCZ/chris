"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addLocation = void 0;

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/prefer-default-export
var addLocation = function addLocation(location, action) {
  return {
    type: _actionTypes.default.ADD_LOCATION,
    payload: {
      location: location,
      action: action
    }
  };
};

exports.addLocation = addLocation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3JvdXRpbmctaGlzdG9yeS9zZXJ2aWNlcy9hY3Rpb25zLnRzIl0sIm5hbWVzIjpbImFkZExvY2F0aW9uIiwibG9jYXRpb24iLCJhY3Rpb24iLCJ0eXBlIiwidHlwZXMiLCJBRERfTE9DQVRJT04iLCJwYXlsb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFHQTtBQUNPLElBQU1BLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNDLFFBQUQsRUFBcUJDLE1BQXJCO0FBQUEsU0FBaUQ7QUFDeEVDLElBQUFBLElBQUksRUFBRUMscUJBQU1DLFlBRDREO0FBRXhFQyxJQUFBQSxPQUFPLEVBQUU7QUFDTEwsTUFBQUEsUUFBUSxFQUFSQSxRQURLO0FBRUxDLE1BQUFBLE1BQU0sRUFBTkE7QUFGSztBQUYrRCxHQUFqRDtBQUFBLENBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICcuLi9kZXBlbmRlY2llcyc7XG5pbXBvcnQgdHlwZXMgZnJvbSAnLi9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgeyBIaXN0b3J5QWN0aW9ucyB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnRcbmV4cG9ydCBjb25zdCBhZGRMb2NhdGlvbiA9IChsb2NhdGlvbjogTG9jYXRpb24sIGFjdGlvbjogSGlzdG9yeUFjdGlvbnMpID0+ICh7XG4gICAgdHlwZTogdHlwZXMuQUREX0xPQ0FUSU9OLFxuICAgIHBheWxvYWQ6IHtcbiAgICAgICAgbG9jYXRpb24sXG4gICAgICAgIGFjdGlvbixcbiAgICB9LFxufSk7XG4iXX0=