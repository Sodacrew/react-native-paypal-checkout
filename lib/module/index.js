import { requireNativeComponent, NativeModules } from 'react-native';
import React from 'react';
const PaypalCheckoutViewNative = requireNativeComponent('PaypalCheckoutView');
export const PaypalCheckoutButton = props => {
  return /*#__PURE__*/React.createElement(PaypalCheckoutViewNative, props);
};
export const triggerPaypalCheckout = args => NativeModules.PaypalCheckoutTrigger.triggerPaypalCheckout(args.paymentId, args.onMessage);
//# sourceMappingURL=index.js.map