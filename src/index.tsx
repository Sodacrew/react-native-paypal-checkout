import { requireNativeComponent, UIManager, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-paypal-checkout' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

type PaypalCheckoutProps = {
  paymentId: string;
  clientId: string;
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
