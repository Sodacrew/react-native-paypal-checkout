import { requireNativeComponent, StyleProp, ViewStyle } from 'react-native';
import React from 'react';

// const LINKING_ERROR =
//   `The package 'react-native-paypal-checkout' doesn't seem to be linked. Make sure: \n\n` +
//   Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
//   '- You rebuilt the app after installing the package\n' +
//   '- You are not using Expo managed workflow\n';

type NativeProps = {
  style?: StyleProp<ViewStyle>;
  paymentId: string;
  onMessage?: (event: any) => void;
};

// const ComponentName = 'PaypalCheckoutView';

const PaypalCheckoutViewNative =
  requireNativeComponent<NativeProps>('PaypalCheckoutView');

export const PaypalCheckoutButton = (props: NativeProps) => {
  return <PaypalCheckoutViewNative {...props} />;
};
