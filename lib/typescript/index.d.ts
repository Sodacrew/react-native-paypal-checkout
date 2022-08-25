import { StyleProp, ViewStyle } from 'react-native';
declare type NativeProps = {
    style?: StyleProp<ViewStyle>;
    paymentId: string;
    onMessage?: (event: any) => void;
};
export declare const PaypalCheckoutButton: (props: NativeProps) => JSX.Element;
export {};
