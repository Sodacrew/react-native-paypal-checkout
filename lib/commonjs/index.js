"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggerPaypalCheckout = exports.PaypalCheckoutButton = void 0;

var _reactNative = require("react-native");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
const PaypalCheckoutViewNative = (0, _reactNative.requireNativeComponent)('PaypalCheckoutView');

const PaypalCheckoutButton = props => {
  return /*#__PURE__*/_react.default.createElement(PaypalCheckoutViewNative, props);
};

exports.PaypalCheckoutButton = PaypalCheckoutButton;

const triggerPaypalCheckout = args => _reactNative.NativeModules.PaypayCheckout.triggerPaypalCheckout(args.paymentId, args.onMessage);

exports.triggerPaypalCheckout = triggerPaypalCheckout;
//# sourceMappingURL=index.js.map