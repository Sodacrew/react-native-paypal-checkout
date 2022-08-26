import { ConfigPlugin, withAppDelegate } from '@expo/config-plugins';
import type { PaypalCheckoutPluginProps } from '../withPaypalCheckout';

const DID_FINISH_LAUNCHING_WITH_OPTIONS_REGEXP = RegExp(
  /(\- \(BOOL\)application:\(UIApplication \*\)application didFinishLaunchingWithOptions:\(NSDictionary \*\)launchOptions)\n\{/,
  'm'
);
const COMMENT = '// add paypal checkout';
const HEADER = '#import <PayPalCheckout/PayPalCheckout-Swift.h>';

const modifyAppDelegate: ConfigPlugin<PaypalCheckoutPluginProps> = (
  config,
  props
) => {
  return withAppDelegate(config, (_props) => {
    const { contents } = _props.modResults;

    if (contents.includes(COMMENT)) {
      console.log('already added paypal checkout');
      return _props;
    }

    const found = DID_FINISH_LAUNCHING_WITH_OPTIONS_REGEXP.exec(contents);

    if (!found) {
      throw new Error('didFinishLaunchingWithOptions not found in AppDelegate');
    }
    _props.modResults.contents = contents.replace(
      DID_FINISH_LAUNCHING_WITH_OPTIONS_REGEXP,
      `${found[0]}
        // add paypal checkout
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
                                                                      ? 'PPCEnvironmentSandbox'
                                                                      : 'PPCEnvironmentLive'
                                                                  }];
      
            [PPCheckout setConfig:config];`
    );

    _props.modResults.contents = contents.replace(
      `#import "AppDelegate.h"`,
      `#import "AppDelegate.h"
        
%{HEADER}}`
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
