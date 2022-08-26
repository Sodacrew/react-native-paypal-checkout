import { StyleProp, ViewStyle } from 'react-native';
interface TriggerArgs {
    paymentId: string;
    onMessage: (event: any) => void;
}
interface NativeProps extends TriggerArgs {
    style?: StyleProp<ViewStyle>;
}
export declare const PaypalCheckoutButton: (props: NativeProps) => JSX.Element;
export declare const triggerPaypalCheckout: (args: TriggerArgs) => any;
export {};
