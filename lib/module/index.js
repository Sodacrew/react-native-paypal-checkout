import { requireNativeComponent } from 'react-native';
import React from 'react'; // const LINKING_ERROR =
//   `The package 'react-native-paypal-checkout' doesn't seem to be linked. Make sure: \n\n` +
//   Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
//   '- You rebuilt the app after installing the package\n' +
//   '- You are not using Expo managed workflow\n';

// const ComponentName = 'PaypalCheckoutView';
const PaypalCheckoutViewNative = requireNativeComponent('PaypalCheckoutView');
export const PaypalCheckoutButton = props => {
  return /*#__PURE__*/React.createElement(PaypalCheckoutViewNative, props);
};
//# sourceMappingURL=index.js.map