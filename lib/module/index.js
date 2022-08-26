import { requireNativeComponent, NativeModules } from 'react-native';
import React from 'react'; // const LINKING_ERROR =
//   `The package 'react-native-paypal-checkout' doesn't seem to be linked. Make sure: \n\n` +
//   Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
//   '- You rebuilt the app after installing the package\n' +
//   '- You are not using Expo managed workflow\n';

;
const PaypalCheckoutViewNative = requireNativeComponent('PaypalCheckoutView');
export const PaypalCheckoutButton = props => {
  return /*#__PURE__*/React.createElement(PaypalCheckoutViewNative, props);
};
export const triggerPaypalCheckout = args => NativeModules.PaypayCheckout.triggerPaypalCheckout(args.paymentId, args.onMessage);
//# sourceMappingURL=index.js.map