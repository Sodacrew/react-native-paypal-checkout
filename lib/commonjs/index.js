"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaypalCheckoutButton = void 0;

var _reactNative = require("react-native");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const ComponentName = 'PaypalCheckoutView';
const PaypalCheckoutViewNative = (0, _reactNative.requireNativeComponent)('PaypalCheckoutView');

const PaypalCheckoutButton = props => {
  return /*#__PURE__*/_react.default.createElement(PaypalCheckoutViewNative, props);
};

exports.PaypalCheckoutButton = PaypalCheckoutButton;
//# sourceMappingURL=index.js.map