declare type PaypalCheckoutProps = {
    paymentId: string;
    onApprove: (event: any) => void;
    onError: (event: any) => void;
    onCancel: (event: any) => void;
};
export declare const PaypalCheckoutView: import("react-native").HostComponent<PaypalCheckoutProps> | (() => never);
declare type PaypalTriggerArgs = {
    paymentId: string;
    onApprove: () => void;
    onError: (error: any) => void;
    onCancel: () => void;
};
export declare const triggerCheckout: (args: PaypalTriggerArgs) => any;
export {};
