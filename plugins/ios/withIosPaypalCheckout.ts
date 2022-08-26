import { ConfigPlugin, withAppDelegate } from '@expo/config-plugins';
import type { PaypalCheckoutPluginProps } from '../withPaypalCheckout';

const DID_FINISH_LAUNCHING_WITH_OPTIONS = `-(BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{`;

const modifyAppDelegate: ConfigPlugin<PaypalCheckoutPluginProps> = (
  config,
  props
) => {
  return withAppDelegate(config, (_props) => {
    const { contents } = _props.modResults;

    if (!contents.includes(DID_FINISH_LAUNCHING_WITH_OPTIONS)) {
      throw new Error('didFinishLaunchingWithOptions not found in AppDelegate');
    }

    _props.modResults.contents = contents.replace(
      DID_FINISH_LAUNCHING_WITH_OPTIONS,
      `${DID_FINISH_LAUNCHING_WITH_OPTIONS}
        PPCheckoutConfig *config = [[PPCheckoutConfig alloc] initWithClientID:@"${
          props.clientId
        }" 
                                                                    returnUrl:@"${
                                                                      props.returnUrl
                                                                    }" 
                                                                  createOrder:nil 
                                                                    onApprove:nil 
                                                             onShippingChange:nil 
                                                                     onCancel:nil
                                                                      onError:nil 
                                                                  environment:${
                                                                    props.environment ===
                                                                    'sandbox'
                                                                      ? 'PPCheckoutEnvironmentSandbox'
                                                                      : 'PPCEnvironmentLive'
                                                                  }];
  
        [PPCheckout setConfig:config];`
    );
    return _props;
  });
};

export const withIosPaypalCheckout: ConfigPlugin<PaypalCheckoutPluginProps> = (
  config,
  props
) => {
  modifyAppDelegate(config, props);

  return config;
};
