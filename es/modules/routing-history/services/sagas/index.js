"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _callee2;

var _dependecies = require("../../dependecies");

var _actions = require("../actions");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(_callee2);

var put = _dependecies.sagaEffects.put,
    takeEvery = _dependecies.sagaEffects.takeEvery;

function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return takeEvery(_dependecies.LOCATION_CHANGE,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(_ref) {
            var payload;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    payload = _ref.payload;
                    _context.next = 3;
                    return put((0, _actions.addLocation)(payload.location, payload.action));

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked, this);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3JvdXRpbmctaGlzdG9yeS9zZXJ2aWNlcy9zYWdhcy9pbmRleC50cyJdLCJuYW1lcyI6WyJwdXQiLCJzYWdhRWZmZWN0cyIsInRha2VFdmVyeSIsIkxPQ0FUSU9OX0NIQU5HRSIsInBheWxvYWQiLCJsb2NhdGlvbiIsImFjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUdBOzs7Ozs7SUFFUUEsRyxHQUFtQkMsd0IsQ0FBbkJELEc7SUFBS0UsUyxHQUFjRCx3QixDQUFkQyxTOztBQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNYLGlCQUFNQSxTQUFTLENBQUNDLDRCQUFEO0FBQUE7QUFBQSxrQ0FBa0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQVlDLG9CQUFBQSxPQUFaLFFBQVlBLE9BQVo7QUFBQTtBQUM3QiwyQkFBTUosR0FBRyxDQUFDLDBCQUFZSSxPQUFPLENBQUNDLFFBQXBCLEVBQThCRCxPQUFPLENBQUNFLE1BQXRDLENBQUQsQ0FBVDs7QUFENkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBbEIsRUFBZjs7QUFEVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNhZ2FFZmZlY3RzLCBMT0NBVElPTl9DSEFOR0UgfSBmcm9tICcuLi8uLi9kZXBlbmRlY2llcyc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuLi8uLi90eXBlcyc7XG5cbmltcG9ydCB7IGFkZExvY2F0aW9uIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5cbmNvbnN0IHsgcHV0LCB0YWtlRXZlcnkgfSA9IHNhZ2FFZmZlY3RzO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiooKSB7XG4gICAgeWllbGQgdGFrZUV2ZXJ5KExPQ0FUSU9OX0NIQU5HRSwgZnVuY3Rpb24qKHsgcGF5bG9hZCB9OiBBY3Rpb24pIHtcbiAgICAgICAgeWllbGQgcHV0KGFkZExvY2F0aW9uKHBheWxvYWQubG9jYXRpb24sIHBheWxvYWQuYWN0aW9uKSk7XG4gICAgfSk7XG59XG4iXX0=