"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const withAndroidPaypalCheckout_1 = require("./android/withAndroidPaypalCheckout");
const config_plugins_1 = require("@expo/config-plugins");
const withIosPaypalCheckout_1 = require("./ios/withIosPaypalCheckout");
const withExpoConfigPlugins = (config, props) => {
    (0, withIosPaypalCheckout_1.withIosPaypalCheckout)(config, props);
    (0, withAndroidPaypalCheckout_1.withAndroidPaypalCheckout)(config, props);
    return config;
};
const pak = require('@sodacrew/react-native-paypal-checkout/package.json');
exports.default = (0, config_plugins_1.createRunOncePlugin)(withExpoConfigPlugins, pak.name, pak.version);
