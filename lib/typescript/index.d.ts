interface TriggerArgs {
    paymentId: string;
    onMessage: (error: any, result: any) => void;
    needDetails?: boolean;
}
export declare const triggerPaypalCheckout: (args: TriggerArgs) => any;
export {};
