import { StyleProp, ViewStyle } from 'react-native';
declare type NativeProps = {
    style?: StyleProp<ViewStyle>;
    paymentId: string;
    onApprove: (event: any) => void;
    onError: (event: any) => void;
    onCancel: (event: any) => void;
};
export declare const PaypalCheckoutView: import("react-native").HostComponent<NativeProps> | (() => never);
export {};
