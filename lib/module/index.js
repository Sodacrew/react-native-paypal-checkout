import { requireNativeComponent, UIManager, Platform, NativeModules } from 'react-native';
const LINKING_ERROR = `The package 'react-native-paypal-checkout' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const ComponentName = 'PaypalCheckoutView';
export const PaypalCheckoutView = UIManager.getViewManagerConfig(ComponentName) != null ? requireNativeComponent(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
};
export const triggerCheckout = args => NativeModules.PaypalTrigger.triggerPayPalCheckout(args);
//# sourceMappingURL=index.js.map