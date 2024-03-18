"use strict";
exports.__esModule = true;
exports.withIosPaypalCheckout = void 0;
var config_plugins_1 = require("@expo/config-plugins");
var DID_FINISH_LAUNCHING_WITH_OPTIONS_REGEXP = RegExp(/(- \(BOOL\)application:\(UIApplication \*\)application didFinishLaunchingWithOptions:\(NSDictionary \*\)launchOptions)\n\{/, 'm');
var COMMENT = '// add paypal checkout';
var HEADER = '#import <PayPalCheckout/PayPalCheckout-Swift.h>';
var modifyAppDelegate = function (config, props) {
    return (0, config_plugins_1.withAppDelegate)(config, function (_props) {
        var found = DID_FINISH_LAUNCHING_WITH_OPTIONS_REGEXP.exec(_props.modResults.contents);
        if (!found) {
            throw new Error('didFinishLaunchingWithOptions not found in AppDelegate');
        }
        if (_props.modResults.contents.includes(COMMENT)) {
            console.log('already added paypal checkout');
        }
        else {
            _props.modResults.contents = _props.modResults.contents.replace(DID_FINISH_LAUNCHING_WITH_OPTIONS_REGEXP, "".concat(found[0], "\n        // add paypal checkout\n    PPCheckoutConfig *config = [[PPCheckoutConfig alloc] initWithClientID:@\"").concat(props.clientId, "\" \n                                                                returnUrl:@\"").concat(props.returnUrl, "\" \n                                                                createOrder:nil \n                                                                onApprove:nil \n                                                            onShippingChange:nil \n                                                                    onCancel:nil\n                                                                    onError:nil \n                                                                environment:").concat(props.environment ===
                'sandbox'
                ? 'PPCEnvironmentSandbox'
                : 'PPCEnvironmentLive', "];\n    \n    [PPCheckout setConfig:config];"));
        }
        if (_props.modResults.contents.includes(HEADER)) {
            console.log('already added paypal checkout header');
        }
        else {
            _props.modResults.contents = _props.modResults.contents.replace("#import \"AppDelegate.h\"", "#import \"AppDelegate.h\"\n              \n".concat(HEADER));
        }
        return _props;
    });
};
var withIosPaypalCheckout = function (config, props) {
    modifyAppDelegate(config, props);
    return config;
};
exports.withIosPaypalCheckout = withIosPaypalCheckout;
