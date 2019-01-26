var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(_callee2);

import { sagaEffects, LOCATION_CHANGE } from '../../dependecies';
import { addLocation } from '../actions';
var put = sagaEffects.put,
    takeEvery = sagaEffects.takeEvery;
export default function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return takeEvery(LOCATION_CHANGE,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(_ref) {
            var payload;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    payload = _ref.payload;
                    _context.next = 3;
                    return put(addLocation(payload.location, payload.action));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3JvdXRpbmctaGlzdG9yeS9zZXJ2aWNlcy9zYWdhcy9pbmRleC50cyJdLCJuYW1lcyI6WyJzYWdhRWZmZWN0cyIsIkxPQ0FUSU9OX0NIQU5HRSIsImFkZExvY2F0aW9uIiwicHV0IiwidGFrZUV2ZXJ5IiwicGF5bG9hZCIsImxvY2F0aW9uIiwiYWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsU0FBU0EsV0FBVCxFQUFzQkMsZUFBdEIsUUFBNkMsbUJBQTdDO0FBR0EsU0FBU0MsV0FBVCxRQUE0QixZQUE1QjtJQUVRQyxHLEdBQW1CSCxXLENBQW5CRyxHO0lBQUtDLFMsR0FBY0osVyxDQUFkSSxTO0FBRWIsZUFBZTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDWCxpQkFBTUEsU0FBUyxDQUFDSCxlQUFEO0FBQUE7QUFBQSxrQ0FBa0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQVlJLG9CQUFBQSxPQUFaLFFBQVlBLE9BQVo7QUFBQTtBQUM3QiwyQkFBTUYsR0FBRyxDQUFDRCxXQUFXLENBQUNHLE9BQU8sQ0FBQ0MsUUFBVCxFQUFtQkQsT0FBTyxDQUFDRSxNQUEzQixDQUFaLENBQVQ7O0FBRDZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQWxCLEVBQWY7O0FBRFc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzYWdhRWZmZWN0cywgTE9DQVRJT05fQ0hBTkdFIH0gZnJvbSAnLi4vLi4vZGVwZW5kZWNpZXMnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuXG5pbXBvcnQgeyBhZGRMb2NhdGlvbiB9IGZyb20gJy4uL2FjdGlvbnMnO1xuXG5jb25zdCB7IHB1dCwgdGFrZUV2ZXJ5IH0gPSBzYWdhRWZmZWN0cztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24qKCkge1xuICAgIHlpZWxkIHRha2VFdmVyeShMT0NBVElPTl9DSEFOR0UsIGZ1bmN0aW9uKih7IHBheWxvYWQgfTogQWN0aW9uKSB7XG4gICAgICAgIHlpZWxkIHB1dChhZGRMb2NhdGlvbihwYXlsb2FkLmxvY2F0aW9uLCBwYXlsb2FkLmFjdGlvbikpO1xuICAgIH0pO1xufVxuIl19