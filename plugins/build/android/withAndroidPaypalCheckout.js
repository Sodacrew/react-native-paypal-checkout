"use strict";
exports.__esModule = true;
exports.withAndroidPaypalCheckout = void 0;
var config_plugins_1 = require("@expo/config-plugins");
var getMainApplicationOrThrow = config_plugins_1.AndroidConfig.Manifest.getMainApplicationOrThrow;
var PAYPAL_REPO_COMMENT = '// add paypal checkout repository';
var PAYPAL_COMPLIE_OPTIONS_COMMENT = '// add paypal checkout compile options';
var COMPILE_OPTIONS = 'compileOptions {';
// const KOTLIN_OPTIONS = 'kotlinOptions {';
var DEPENDENCY_NAME = 'com.paypal.checkout:android-sdk:';
var IMPORT_NAME = 'import com.paypal.checkout.PayPalCheckout';
var modifyProjectBuildGradle = function (config) {
    return (0, config_plugins_1.withProjectBuildGradle)(config, function (_props) {
        if (_props.modResults.contents.includes(PAYPAL_REPO_COMMENT)) {
            console.log('paypal checkout repo already added');
        }
        else {
            _props.modResults.contents = _props.modResults.contents.replace(/allprojects\s?{\n\s*repositories\s?{/, "allprojects {\n    repositories {\n        ".concat(PAYPAL_REPO_COMMENT, "\n        mavenCentral()\n        maven {\n            url  \"https://cardinalcommerceprod.jfrog.io/artifactory/android\"\n            credentials {\n                username \"paypal_sgerritz\"\n                password \"AKCp8jQ8tAahqpT5JjZ4FRP2mW7GMoFZ674kGqHmupTesKeAY2G8NcmPKLuTxTGkKjDLRzDUQ\"\n            }\n        }\n                "));
        }
        return _props;
    });
};
var modifyAppBuildGradle = function (config, props) {
    return (0, config_plugins_1.withAppBuildGradle)(config, function (_props) {
        var _a;
        if (_props.modResults.contents.includes(PAYPAL_COMPLIE_OPTIONS_COMMENT)) {
            console.log('paypal checkout compile options already added');
        }
        else {
            if (_props.modResults.contents.includes(COMPILE_OPTIONS)) {
                _props.modResults.contents = _props.modResults.contents.replace(COMPILE_OPTIONS, "".concat(COMPILE_OPTIONS, "\n        ").concat(PAYPAL_COMPLIE_OPTIONS_COMMENT, "\n        sourceCompatibility JavaVersion.VERSION_1_8\n        targetCompatibility JavaVersion.VERSION_1_8\n    }\n        "));
            }
            else {
                _props.modResults.contents = _props.modResults.contents.replace('android {', "android {\n    ".concat(COMPILE_OPTIONS, "\n        ").concat(PAYPAL_COMPLIE_OPTIONS_COMMENT, "\n        sourceCompatibility JavaVersion.VERSION_1_8\n        targetCompatibility JavaVersion.VERSION_1_8\n    }\n        "));
            }
            //   if (_props.modResults.contents.includes(KOTLIN_OPTIONS)) {
            //     _props.modResults.contents = _props.modResults.contents.replace(
            //       KOTLIN_OPTIONS,
            //       `${KOTLIN_OPTIONS}
            //     jvmTarget = "1.8"
            // }`
            //     );
            //   } else {
            //     _props.modResults.contents = _props.modResults.contents.replace(
            //       'android {',
            //       `android {
            // ${KOTLIN_OPTIONS}
            //     jvmTarget = "1.8"
            // }
            //     `
            //     );
            //   }
            if (_props.modResults.contents.includes(DEPENDENCY_NAME)) {
                console.log('paypal checkout dependency already added');
            }
            else {
                _props.modResults.contents = _props.modResults.contents.replace('dependencies {', "dependencies {\n    implementation('".concat(DEPENDENCY_NAME).concat((_a = props.androidSDKVersion) !== null && _a !== void 0 ? _a : '0.7.3', "')\n    "));
            }
        }
        return _props;
    });
};
var modifyMainApllication = function (config, props) {
    return (0, config_plugins_1.withMainApplication)(config, function (_props) {
        if (_props.modResults.contents.includes(IMPORT_NAME)) {
            console.log('paypal checkout import already added');
            return _props;
        }
        _props.modResults.contents = _props.modResults.contents.replace('public class MainApplication extends Application', "".concat(IMPORT_NAME, ";\nimport com.paypal.checkout.config.Environment;\nimport com.paypal.checkout.createorder.CurrencyCode;\nimport com.paypal.checkout.createorder.UserAction;\nimport com.paypal.checkout.config.CheckoutConfig;\n\nimport com.sodacrew.reactnativepaypalcheckout.PaypalCheckoutPackage;\n\npublic class MainApplication extends Application"));
        _props.modResults.contents = _props.modResults.contents.replace("super.onCreate();", "super.onCreate();\n    PayPalCheckout.setConfig(new CheckoutConfig(\n        this,\n        \"".concat(props.clientId, "\",\n        ").concat(props.environment === 'sandbox'
            ? 'Environment.SANDBOX'
            : 'Environment.LIVE', ",\n        \"").concat(props.returnUrl, "\",\n        CurrencyCode.USD,\n        UserAction.PAY_NOW\n    ));\n"));
        // _props.modResults.contents = _props.modResults.contents.replace(
        //   'return packages;',
        //   `packages.add(new PaypalCheckoutPackage());
        //             return packages;`
        // );
        return _props;
    });
};
var modifyAndroidManifest = function (config, props) {
    return (0, config_plugins_1.withAndroidManifest)(config, function (_props) {
        var _a, _b;
        var mainApplication = getMainApplicationOrThrow(_props.modResults);
        if (!mainApplication)
            return _props;
        var paypalRedirectActivityIndex = (_b = (_a = mainApplication.activity) === null || _a === void 0 ? void 0 : _a.findIndex(function (activity) {
            return activity.$['android:name'] ===
                'com.paypal.openid.RedirectUriReceiverActivity';
        })) !== null && _b !== void 0 ? _b : 0;
        var newPaypalRedirectActivity = {
            '$': {
                'android:name': 'com.paypal.openid.RedirectUriReceiverActivity',
                'android:excludeFromRecents': 'true',
                'android:theme': '@style/PYPLAppTheme'
            },
            'intent-filter': [
                {
                    action: {
                        $: {
                            'android:name': 'android.intent.action.VIEW'
                        }
                    },
                    data: {
                        $: {
                            'android:host': 'paypalpay',
                            'android:scheme': "".concat(props.returnUrl.split('://')[0])
                        }
                    },
                    category: [
                        { $: { 'android:name': 'android.intent.category.DEFAULT' } },
                        { $: { 'android:name': 'android.intent.category.BROWSABLE' } },
                    ]
                },
            ]
        };
        if (paypalRedirectActivityIndex < 0) {
            if (!mainApplication.activity) {
                mainApplication.activity = [newPaypalRedirectActivity];
            }
            else {
                mainApplication.activity.push(newPaypalRedirectActivity);
            }
        }
        return _props;
    });
};
var withAndroidPaypalCheckout = function (config, props) {
    modifyProjectBuildGradle(config);
    modifyAppBuildGradle(config, props);
    modifyMainApllication(config, props);
    modifyAndroidManifest(config, props);
    return config;
};
exports.withAndroidPaypalCheckout = withAndroidPaypalCheckout;
