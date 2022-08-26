import { StyleProp, ViewStyle } from 'react-native';
interface TriggerArgs {
    paymentId: string;
    onMessage: (error: any, result: any) => void;
}
interface NativeProps {
    paymentId: string;
    onMessage: (event: any) => void;
    style?: StyleProp<ViewStyle>;
}
export declare const PaypalCheckoutButton: (props: NativeProps) => JSX.Element;
export declare const triggerPaypalCheckout: (args: TriggerArgs) => any;
export {};
