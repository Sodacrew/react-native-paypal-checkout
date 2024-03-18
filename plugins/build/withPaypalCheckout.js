"use strict";
exports.__esModule = true;
// import { withAndroidPaypalCheckout } from './android/withAndroidPaypalCheckout';
var config_plugins_1 = require("@expo/config-plugins");
var withIosPaypalCheckout_1 = require("./ios/withIosPaypalCheckout");
var withExpoConfigPlugins = function (config, props) {
    (0, withIosPaypalCheckout_1.withIosPaypalCheckout)(config, props);
    // withAndroidPaypalCheckout(config, props);
    return config;
};
var pak = require('@sodacrew/react-native-paypal-checkout/package.json');
exports["default"] = (0, config_plugins_1.createRunOncePlugin)(withExpoConfigPlugins, pak.name, pak.version);
