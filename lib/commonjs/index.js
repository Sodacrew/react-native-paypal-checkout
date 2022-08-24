"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggerCheckout = exports.PaypalCheckoutView = void 0;

var _reactNative = require("react-native");

const LINKING_ERROR = `The package 'react-native-paypal-checkout' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const ComponentName = 'PaypalCheckoutView';
const PaypalCheckoutView = _reactNative.UIManager.getViewManagerConfig(ComponentName) != null ? (0, _reactNative.requireNativeComponent)(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
};
exports.PaypalCheckoutView = PaypalCheckoutView;

const triggerCheckout = args => _reactNative.NativeModules.Trigger.triggerPayPalCheckout(args);

exports.triggerCheckout = triggerCheckout;
//# sourceMappingURL=index.js.map