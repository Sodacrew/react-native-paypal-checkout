import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-paypal-checkout' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

type PaypalCheckoutProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'PaypalCheckoutView';

export const PaypalCheckoutView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<PaypalCheckoutProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
