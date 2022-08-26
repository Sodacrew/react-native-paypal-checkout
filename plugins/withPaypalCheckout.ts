import { ConfigPlugin, createRunOncePlugin } from '@expo/config-plugins';
import { withIosPaypalCheckout } from './ios/withIosPaypalCheckout';

export interface PaypalCheckoutPluginProps {
  clientId: string;
  returnUrl: string;
  environment: 'sandbox' | 'live';
}

const withExpoConfigPlugins: ConfigPlugin<PaypalCheckoutPluginProps> = (
  config,
  props
) => {
  withIosPaypalCheckout(config, props);

  return config;
};

const pak = require('@react-native-seoul/kakao-login/package.json');
export default createRunOncePlugin(
  withExpoConfigPlugins,
  pak.name,
  pak.version
);
