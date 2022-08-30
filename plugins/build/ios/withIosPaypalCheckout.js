"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withIosPaypalCheckout = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const DID_FINISH_LAUNCHING_WITH_OPTIONS_REGEXP = RegExp(/(\- \(BOOL\)application:\(UIApplication \*\)application didFinishLaunchingWithOptions:\(NSDictionary \*\)launchOptions)\n\{/, 'm');
const COMMENT = '// add paypal checkout';
const HEADER = '#import <PayPalCheckout/PayPalCheckout-Swift.h>';
const modifyAppDelegate = (config, props) => {
    return (0, config_plugins_1.withAppDelegate)(config, (_props) => {
        const found = DID_FINISH_LAUNCHING_WITH_OPTIONS_REGEXP.exec(_props.modResults.contents);
        if (!found) {
            throw new Error('didFinishLaunchingWithOptions not found in AppDelegate');
        }
        if (_props.modResults.contents.includes(COMMENT)) {
            console.log('already added paypal checkout');
        }
        else {
            _props.modResults.contents = _props.modResults.contents.replace(DID_FINISH_LAUNCHING_WITH_OPTIONS_REGEXP, `${found[0]}
        // add paypal checkout
    PPCheckoutConfig *config = [[PPCheckoutConfig alloc] initWithClientID:@"${props.clientId}" 
                                                                returnUrl:@"${props.returnUrl}" 
                                                                createOrder:nil 
                                                                onApprove:nil 
                                                            onShippingChange:nil 
                                                                    onCancel:nil
                                                                    onError:nil 
                                                                environment:${props.environment ===
                'sandbox'
                ? 'PPCEnvironmentSandbox'
                : 'PPCEnvironmentLive'}];
    
    [PPCheckout setConfig:config];`);
        }
        if (_props.modResults.contents.includes(HEADER)) {
            console.log('already added paypal checkout header');
        }
        else {
            _props.modResults.contents = _props.modResults.contents.replace(`#import "AppDelegate.h"`, `#import "AppDelegate.h"
              
${HEADER}`);
        }
        return _props;
    });
};
const withIosPaypalCheckout = (config, props) => {
    modifyAppDelegate(config, props);
    return config;
};
exports.withIosPaypalCheckout = withIosPaypalCheckout;
