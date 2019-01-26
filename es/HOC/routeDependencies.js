"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reactRouter = require("react-router");

var _recompose = require("recompose");

var _lodash = require("lodash");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var logger = console;
var log = {
  error: {
    routeEnter: function routeEnter(_routeEnter) {
      logger.warn("The onRouteEnter has to be a function. You have supplied: ".concat(_typeof(_routeEnter)));
    },
    routeLeave: function routeLeave(_routeLeave) {
      logger.warn("The onRouteLeave has to be a function. You have supplied: ".concat(_typeof(_routeLeave)));
    },
    reRoute: function reRoute(_reRoute) {
      logger.warn("The shouldReRoute has to be a function. You have supplied: ".concat(_typeof(_reRoute)));
    }
  }
};

var enterHandler = function enterHandler(props) {
  if (typeof props.read === 'function') {
    props.read();
  }
};

var leaveHandler = function leaveHandler(props) {
  if (typeof props.clear === 'function') {
    props.clear();
  }
};

var reRouteHandler = function reRouteHandler(oldProps, newProps) {
  return oldProps.location.pathname !== newProps.location.pathname || oldProps.location.search !== newProps.location.search || oldProps.location.hash !== newProps.location.hash;
};

var routeDependencies = function routeDependencies(config) {
  var defaultConfig = {
    onRouteEnter: enterHandler,
    onRouteLeave: leaveHandler,
    shouldReRoute: reRouteHandler,
    propsMapping: _lodash.identity
  };

  var _defaults = (0, _lodash.defaults)(config, defaultConfig),
      onRouteEnter = _defaults.onRouteEnter,
      onRouteLeave = _defaults.onRouteLeave,
      shouldReRoute = _defaults.shouldReRoute,
      propsMapping = _defaults.propsMapping;

  return (0, _redux.compose)(_reactRouter.withRouter,
  /* tslint:disable no-invalid-this */
  (0, _recompose.lifecycle)({
    componentDidMount: function componentDidMount() {
      if (typeof onRouteEnter !== 'function') {
        log.error.routeEnter(onRouteEnter);
      } else {
        onRouteEnter(this.props);
      }
    },
    componentDidUpdate: function componentDidUpdate(prevProps) {
      if (typeof shouldReRoute !== 'function') {
        log.error.reRoute(shouldReRoute);
      } else if (typeof onRouteEnter !== 'function') {
        log.error.routeEnter(onRouteEnter);
      } else if (typeof onRouteLeave !== 'function') {
        log.error.routeLeave(onRouteLeave);
      } else if (shouldReRoute(prevProps, this.props)) {
        onRouteLeave(this.props);
        onRouteEnter(this.props);
      }
    },
    componentWillUnmount: function componentWillUnmount() {
      if (typeof onRouteLeave !== 'function') {
        log.error.routeLeave(onRouteLeave);
      } else {
        onRouteLeave(this.props);
      }
    }
  }),
  /* tslint:enable no-invalid-this */
  _recompose.pure, (0, _recompose.mapProps)(propsMapping));
};

var _default = routeDependencies;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9IT0Mvcm91dGVEZXBlbmRlbmNpZXMudHMiXSwibmFtZXMiOlsibG9nZ2VyIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwicm91dGVFbnRlciIsIndhcm4iLCJyb3V0ZUxlYXZlIiwicmVSb3V0ZSIsImVudGVySGFuZGxlciIsInByb3BzIiwicmVhZCIsImxlYXZlSGFuZGxlciIsImNsZWFyIiwicmVSb3V0ZUhhbmRsZXIiLCJvbGRQcm9wcyIsIm5ld1Byb3BzIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInNlYXJjaCIsImhhc2giLCJyb3V0ZURlcGVuZGVuY2llcyIsImNvbmZpZyIsImRlZmF1bHRDb25maWciLCJvblJvdXRlRW50ZXIiLCJvblJvdXRlTGVhdmUiLCJzaG91bGRSZVJvdXRlIiwicHJvcHNNYXBwaW5nIiwiaWRlbnRpdHkiLCJ3aXRoUm91dGVyIiwiY29tcG9uZW50RGlkTW91bnQiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInB1cmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQU1BLE1BQU0sR0FBR0MsT0FBZjtBQUVBLElBQU1DLEdBQUcsR0FBRztBQUNSQyxFQUFBQSxLQUFLLEVBQUU7QUFDSEMsSUFBQUEsVUFERyxzQkFDUUEsV0FEUixFQUN5QjtBQUN4QkosTUFBQUEsTUFBTSxDQUFDSyxJQUFQLDZFQUFnRkQsV0FBaEY7QUFDSCxLQUhFO0FBSUhFLElBQUFBLFVBSkcsc0JBSVFBLFdBSlIsRUFJeUI7QUFDeEJOLE1BQUFBLE1BQU0sQ0FBQ0ssSUFBUCw2RUFBZ0ZDLFdBQWhGO0FBQ0gsS0FORTtBQU9IQyxJQUFBQSxPQVBHLG1CQU9LQSxRQVBMLEVBT21CO0FBQ2xCUCxNQUFBQSxNQUFNLENBQUNLLElBQVAsOEVBQWlGRSxRQUFqRjtBQUNIO0FBVEU7QUFEQyxDQUFaOztBQWNBLElBQU1DLFlBQVksR0FB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QUNILE9BRkQsTUFFTztBQUNIQSxRQUFBQSxZQUFZLENBQUMsS0FBS2YsS0FBTixDQUFaO0FBQ0g7QUFDSjtBQTFCa0QsR0FBdkQsQ0FIRztBQStCSDtBQUNBd0IsaUJBaENHLEVBaUNILHlCQUFTUCxZQUFULENBakNHLENBQVA7QUFtQ0gsQ0EzQ0Q7O2VBNENlTixpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXBvc2UgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyB3aXRoUm91dGVyLCBSb3V0ZUNvbXBvbmVudFByb3BzIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCB7IGxpZmVjeWNsZSwgcHVyZSwgbWFwUHJvcHMgfSBmcm9tICdyZWNvbXBvc2UnO1xuaW1wb3J0IHsgaWRlbnRpdHksIGRlZmF1bHRzIH0gZnJvbSAnbG9kYXNoJztcblxuY29uc3QgbG9nZ2VyID0gY29uc29sZTtcblxuY29uc3QgbG9nID0ge1xuICAgIGVycm9yOiB7XG4gICAgICAgIHJvdXRlRW50ZXIocm91dGVFbnRlcjogYW55KSB7XG4gICAgICAgICAgICBsb2dnZXIud2FybihgVGhlIG9uUm91dGVFbnRlciBoYXMgdG8gYmUgYSBmdW5jdGlvbi4gWW91IGhhdmUgc3VwcGxpZWQ6ICR7dHlwZW9mIHJvdXRlRW50ZXJ9YCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJvdXRlTGVhdmUocm91dGVMZWF2ZTogYW55KSB7XG4gICAgICAgICAgICBsb2dnZXIud2FybihgVGhlIG9uUm91dGVMZWF2ZSBoYXMgdG8gYmUgYSBmdW5jdGlvbi4gWW91IGhhdmUgc3VwcGxpZWQ6ICR7dHlwZW9mIHJvdXRlTGVhdmV9YCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlUm91dGUocmVSb3V0ZTogYW55KSB7XG4gICAgICAgICAgICBsb2dnZXIud2FybihgVGhlIHNob3VsZFJlUm91dGUgaGFzIHRvIGJlIGEgZnVuY3Rpb24uIFlvdSBoYXZlIHN1cHBsaWVkOiAke3R5cGVvZiByZVJvdXRlfWApO1xuICAgICAgICB9LFxuICAgIH0sXG59O1xuXG5jb25zdCBlbnRlckhhbmRsZXIgPSAocHJvcHM6IE9wdGlvbmFsUHJvcHMpID0+IHtcbiAgICBpZiAodHlwZW9mIHByb3BzLnJlYWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcHJvcHMucmVhZCgpO1xuICAgIH1cbn07XG5cbmNvbnN0IGxlYXZlSGFuZGxlciA9IChwcm9wczogT3B0aW9uYWxQcm9wcykgPT4ge1xuICAgIGlmICh0eXBlb2YgcHJvcHMuY2xlYXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcHJvcHMuY2xlYXIoKTtcbiAgICB9XG59O1xuXG5jb25zdCByZVJvdXRlSGFuZGxlciA9IChvbGRQcm9wczogUm91dGVDb21wb25lbnRQcm9wcywgbmV3UHJvcHM6IFJvdXRlQ29tcG9uZW50UHJvcHMpID0+XG4gICAgb2xkUHJvcHMubG9jYXRpb24ucGF0aG5hbWUgIT09IG5ld1Byb3BzLmxvY2F0aW9uLnBhdGhuYW1lIHx8XG4gICAgb2xkUHJvcHMubG9jYXRpb24uc2VhcmNoICE9PSBuZXdQcm9wcy5sb2NhdGlvbi5zZWFyY2ggfHxcbiAgICBvbGRQcm9wcy5sb2NhdGlvbi5oYXNoICE9PSBuZXdQcm9wcy5sb2NhdGlvbi5oYXNoO1xuXG5pbnRlcmZhY2UgT3B0aW9uYWxQcm9wcyB7XG4gICAgcmVhZD86ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZDtcbiAgICBjbGVhcj86ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZDtcbn1cblxuaW50ZXJmYWNlIENvbmZpZzxQLCBQMj4ge1xuICAgIG9uUm91dGVFbnRlcjogKHByb3BzOiBQICYgT3B0aW9uYWxQcm9wcykgPT4gdm9pZDtcbiAgICBvblJvdXRlTGVhdmU6IChwcm9wczogUCAmIE9wdGlvbmFsUHJvcHMpID0+IHZvaWQ7XG4gICAgc2hvdWxkUmVSb3V0ZTogKHByZXZQcm9wczogUCAmIFJvdXRlQ29tcG9uZW50UHJvcHMsIHByb3BzOiBQICYgUm91dGVDb21wb25lbnRQcm9wcykgPT4gYm9vbGVhbjtcbiAgICBwcm9wc01hcHBpbmc6IChwcm9wczogUCAmIE9wdGlvbmFsUHJvcHMpID0+IFAyO1xufVxuXG5jb25zdCByb3V0ZURlcGVuZGVuY2llcyA9IDxQLCBQMiA9IHtba2V5OiBzdHJpbmddOiBhbnl9Pihjb25maWc/OiBQYXJ0aWFsPENvbmZpZzxQLCBQMj4+KSA9PiB7XG4gICAgY29uc3QgZGVmYXVsdENvbmZpZzogQ29uZmlnPFAsIFAyPiA9IHtcbiAgICAgICAgb25Sb3V0ZUVudGVyOiBlbnRlckhhbmRsZXIsXG4gICAgICAgIG9uUm91dGVMZWF2ZTogbGVhdmVIYW5kbGVyLFxuICAgICAgICBzaG91bGRSZVJvdXRlOiByZVJvdXRlSGFuZGxlcixcbiAgICAgICAgcHJvcHNNYXBwaW5nOiBpZGVudGl0eSxcbiAgICB9O1xuICAgIGNvbnN0IHsgb25Sb3V0ZUVudGVyLCBvblJvdXRlTGVhdmUsIHNob3VsZFJlUm91dGUsIHByb3BzTWFwcGluZyB9ID0gZGVmYXVsdHMoY29uZmlnLCBkZWZhdWx0Q29uZmlnKTtcbiAgICByZXR1cm4gY29tcG9zZShcbiAgICAgICAgd2l0aFJvdXRlcixcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUgbm8taW52YWxpZC10aGlzICovXG4gICAgICAgIGxpZmVjeWNsZTxQICYgT3B0aW9uYWxQcm9wcyAmIFJvdXRlQ29tcG9uZW50UHJvcHMsIHt9Pih7XG4gICAgICAgICAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9uUm91dGVFbnRlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBsb2cuZXJyb3Iucm91dGVFbnRlcihvblJvdXRlRW50ZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9uUm91dGVFbnRlcih0aGlzLnByb3BzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wczogUCAmIFJvdXRlQ29tcG9uZW50UHJvcHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNob3VsZFJlUm91dGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nLmVycm9yLnJlUm91dGUoc2hvdWxkUmVSb3V0ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb25Sb3V0ZUVudGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZy5lcnJvci5yb3V0ZUVudGVyKG9uUm91dGVFbnRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb25Sb3V0ZUxlYXZlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZy5lcnJvci5yb3V0ZUxlYXZlKG9uUm91dGVMZWF2ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzaG91bGRSZVJvdXRlKHByZXZQcm9wcywgdGhpcy5wcm9wcykpIHtcbiAgICAgICAgICAgICAgICAgICAgb25Sb3V0ZUxlYXZlKHRoaXMucHJvcHMpO1xuICAgICAgICAgICAgICAgICAgICBvblJvdXRlRW50ZXIodGhpcy5wcm9wcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb25Sb3V0ZUxlYXZlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZy5lcnJvci5yb3V0ZUxlYXZlKG9uUm91dGVMZWF2ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb25Sb3V0ZUxlYXZlKHRoaXMucHJvcHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlIG5vLWludmFsaWQtdGhpcyAqL1xuICAgICAgICBwdXJlLFxuICAgICAgICBtYXBQcm9wcyhwcm9wc01hcHBpbmcpLFxuICAgICk7XG59O1xuZXhwb3J0IGRlZmF1bHQgcm91dGVEZXBlbmRlbmNpZXM7XG4iXX0=