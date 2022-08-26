import {
  requireNativeComponent,
  StyleProp,
  ViewStyle,
  NativeModules,
} from 'react-native';
import React from 'react';

interface TriggerArgs {
  paymentId: string;
  onMessage: (error: any, result: any) => void;
}
interface NativeProps {
  paymentId: string;
  onMessage: (event: any) => void;
  style?: StyleProp<ViewStyle>;
}

const PaypalCheckoutViewNative =
  requireNativeComponent<NativeProps>('PaypalCheckoutView');

export const PaypalCheckoutButton = (props: NativeProps) => {
  return <PaypalCheckoutViewNative {...props} />;
};

export const triggerPaypalCheckout = (args: TriggerArgs) =>
  NativeModules.PaypalCheckoutTrigger.triggerPaypalCheckout(
    args.paymentId,
    args.onMessage
  );
