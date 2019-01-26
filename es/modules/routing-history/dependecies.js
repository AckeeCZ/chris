"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Location", {
  enumerable: true,
  get: function get() {
    return _history.Location;
  }
});
Object.defineProperty(exports, "LOCATION_CHANGE", {
  enumerable: true,
  get: function get() {
    return _connectedReactRouter.LOCATION_CHANGE;
  }
});
Object.defineProperty(exports, "routingSelector", {
  enumerable: true,
  get: function get() {
    return _selectors.routingSelector;
  }
});
Object.defineProperty(exports, "LocationSelector", {
  enumerable: true,
  get: function get() {
    return _types.LocationSelector;
  }
});
exports.sagaEffects = void 0;

var sagaEffects = _interopRequireWildcard(require("redux-saga/effects"));

exports.sagaEffects = sagaEffects;

var _history = require("history");

var _connectedReactRouter = require("connected-react-router");

var _selectors = require("../../services/selectors");

var _types = require("../../types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL3JvdXRpbmctaGlzdG9yeS9kZXBlbmRlY2llcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHNhZ2FFZmZlY3RzIGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5leHBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ2hpc3RvcnknO1xuXG5leHBvcnQgeyBzYWdhRWZmZWN0cyB9O1xuZXhwb3J0IHsgTE9DQVRJT05fQ0hBTkdFIH0gZnJvbSAnY29ubmVjdGVkLXJlYWN0LXJvdXRlcic7XG5leHBvcnQgeyByb3V0aW5nU2VsZWN0b3IgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9zZWxlY3RvcnMnO1xuZXhwb3J0IHsgTG9jYXRpb25TZWxlY3RvciB9IGZyb20gJy4uLy4uL3R5cGVzJztcbiJdfQ==