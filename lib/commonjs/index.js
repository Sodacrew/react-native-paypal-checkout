"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggerPaypalCheckout = void 0;
var _reactNative = require("react-native");
// import React from 'react';

// interface NativeProps {
//   paymentId: string;
//   onMessage: (event: any) => void;
//   style?: StyleProp<ViewStyle>;
// }

// const PaypalCheckoutViewNative =
//   requireNativeComponent<NativeProps>('PaypalCheckoutView');

// export const PaypalCheckoutButton = (props: NativeProps) => {
//   return <PaypalCheckoutViewNative {...props} />;
// };

const triggerPaypalCheckout = args => _reactNative.NativeModules.PaypalCheckoutTrigger.triggerPaypalCheckout(args.paymentId, args.needDetails, args.onMessage);
exports.triggerPaypalCheckout = triggerPaypalCheckout;
//# sourceMappingURL=index.js.map