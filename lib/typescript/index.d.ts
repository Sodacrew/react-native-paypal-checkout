interface TriggerArgs {
    paymentId: string;
    onMessage: (error: any, result: any) => void;
}
export declare const triggerPaypalCheckout: (args: TriggerArgs) => any;
export {};
