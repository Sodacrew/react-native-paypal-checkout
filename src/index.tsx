import { requireNativeComponent, StyleProp, ViewStyle, NativeModules } from 'react-native';
import React from 'react';

// const LINKING_ERROR =
//   `The package 'react-native-paypal-checkout' doesn't seem to be linked. Make sure: \n\n` +
//   Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
//   '- You rebuilt the app after installing the package\n' +
//   '- You are not using Expo managed workflow\n';

interface TriggerArgs {
  paymentId: string;
  onMessage: (event: any) => void;
}
interface NativeProps extends TriggerArgs {
  style?: StyleProp<ViewStyle>;

};

const PaypalCheckoutViewNative =
  requireNativeComponent<NativeProps>('PaypalCheckoutView');

export const PaypalCheckoutButton = (props: NativeProps) => {
  return <PaypalCheckoutViewNative {...props} />;
};


export const triggerPaypalCheckout =(args: TriggerArgs) => NativeModules.PaypayCheckout.triggerPaypalCheckout(args.paymentId, args.onMessage)