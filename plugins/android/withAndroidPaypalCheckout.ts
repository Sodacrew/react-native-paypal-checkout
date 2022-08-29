import {
  ConfigPlugin,
  withAppBuildGradle,
  withMainApplication,
  withProjectBuildGradle,
} from '@expo/config-plugins';
import type { PaypalCheckoutPluginProps } from '../withPaypalCheckout';

const PAYPAL_REPO_COMMENT = '// add paypal checkout repository';
const PAYPAL_COMPLIE_OPTIONS_COMMENT = '// add paypal checkout compile options';

const COMPILE_OPTIONS = 'compileOptions {';
const KOTLIN_OPTIONS = 'kotlinOptions {';

const DEPENDENCY_NAME = 'com.paypal.checkout:android-sdk:';

const IMPORT_NAME = 'import com.paypal.checkout.PayPalCheckout';

const modifyProjectBuildGradle: ConfigPlugin = (config) => {
  return withProjectBuildGradle(config, (_props) => {
    if (_props.modResults.contents.includes(PAYPAL_REPO_COMMENT)) {
      console.log('paypal checkout repo already added');
    } else {
      _props.modResults.contents = _props.modResults.contents.replace(
        /allprojects\s?{\n\s*repositories\s?{/,
        `allprojects {
    repositories {
        ${PAYPAL_REPO_COMMENT}
        mavenCentral()
        maven {
            url  "https://cardinalcommerceprod.jfrog.io/artifactory/android"
            credentials {
                username paypal_sgerritz
                password AKCp8jQ8tAahqpT5JjZ4FRP2mW7GMoFZ674kGqHmupTesKeAY2G8NcmPKLuTxTGkKjDLRzDUQ
            }
        }
                `
      );
    }

    return _props;
  });
};

const modifyAppBuildGradle: ConfigPlugin<PaypalCheckoutPluginProps> = (
  config,
  props
) => {
  return withAppBuildGradle(config, (_props) => {
    if (_props.modResults.contents.includes(PAYPAL_COMPLIE_OPTIONS_COMMENT)) {
      console.log('paypal checkout compile options already added');
    } else {
      if (_props.modResults.contents.includes(COMPILE_OPTIONS)) {
        _props.modResults.contents = _props.modResults.contents.replace(
          COMPILE_OPTIONS,
          `${COMPILE_OPTIONS}
        ${PAYPAL_COMPLIE_OPTIONS_COMMENT}
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
        `
        );
      } else {
        _props.modResults.contents = _props.modResults.contents.replace(
          'android {',
          `android {
    ${COMPILE_OPTIONS}
        ${PAYPAL_COMPLIE_OPTIONS_COMMENT}
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
        `
        );
      }

      if (_props.modResults.contents.includes(KOTLIN_OPTIONS)) {
        _props.modResults.contents = _props.modResults.contents.replace(
          KOTLIN_OPTIONS,
          `${KOTLIN_OPTIONS}
        jvmTarget = "1.8"
    }`
        );
      } else {
        _props.modResults.contents = _props.modResults.contents.replace(
          'android {',
          `android {
    ${KOTLIN_OPTIONS}
        jvmTarget = "1.8"
    }
        `
        );
      }

      if (_props.modResults.contents.includes(DEPENDENCY_NAME)) {
        console.log('paypal checkout dependency already added');
      } else {
        _props.modResults.contents = _props.modResults.contents.replace(
          'dependencies {',
          `dependencies {
    implementation('${DEPENDENCY_NAME}${props.androidSDKVersion ?? '0.7.3'}')
    `
        );
      }
    }
    return _props;
  });
};

const modifyMainApllication: ConfigPlugin<PaypalCheckoutPluginProps> = (
  config,
  props
) => {
  return withMainApplication(config, (_props) => {
    if (_props.modResults.contents.includes(IMPORT_NAME)) {
      console.log('paypal checkout import already added');
      return _props;
    }

    _props.modResults.contents = _props.modResults.contents.replace(
      'public class MainApplication extends Application',
      `${IMPORT_NAME};
import com.paypal.checkout.config.Environment;
import com.paypal.checkout.createorder.CurrencyCode;
import com.paypal.checkout.createorder.UserAction;

public class MainApplication extends Application`
    );

    _props.modResults.contents = _props.modResults.contents.replace(
      `super.onCreate();`,
      `super.onCreate();
    PayPalCheckout.setConfig(new CheckoutConfig(
        this,
        "${props.clientId}",
        ${
          props.environment === 'sandbox'
            ? 'Envrionment.SANDBOX'
            : 'Envrionment.PRODUCTION'
        },
        "${props.returnUrl}",
        CurrencyCode.USD,
        UserAction.PAY_NOW
    ));
`
    );

    _props.modResults.contents = _props.modResults.contents.replace(
      'return packages;',
      `packages.add(new PaypalCheckoutPackage());
                return packages;`
    );
    return _props;
  });
};

export const withAndroidPaypalCheckout: ConfigPlugin<
  PaypalCheckoutPluginProps
> = (config, props) => {
  modifyProjectBuildGradle(config);
  modifyAppBuildGradle(config, props);
  modifyMainApllication(config, props);

  return config;
};
