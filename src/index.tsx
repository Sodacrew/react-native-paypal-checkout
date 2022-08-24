import {
  requireNativeComponent,
  UIManager,
  Platform,
  NativeModules,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-paypal-checkout' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

type PaypalCheckoutProps = {
  paymentId: string;
  onApprove: (event: any) => void;
  onError: (event: any) => void;
  onCancel: (event: any) => void;
};

const ComponentName = 'PaypalCheckoutView';

export const PaypalCheckoutView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<PaypalCheckoutProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

type PaypalTriggerArgs = {
  paymentId: string;
  onApprove: () => void;
  onError: (error: any) => void;
  onCancel: () => void;
};

export const triggerCheckout = (args: PaypalTriggerArgs) =>
  NativeModules.Trigger.triggerPayPalCheckout(args);
