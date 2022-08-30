import { ConfigPlugin } from '@expo/config-plugins';
export interface PaypalCheckoutPluginProps {
    clientId: string;
    returnUrl: string;
    environment: 'sandbox' | 'live';
    androidSDKVersion?: string;
}
declare const _default: ConfigPlugin<PaypalCheckoutPluginProps>;
export default _default;
