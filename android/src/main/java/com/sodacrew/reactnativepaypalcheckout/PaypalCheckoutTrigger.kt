
package com.sodacrew.reactnativepaypalcheckout

import android.content.Context
import android.os.Build
import android.util.Log
import android.widget.Toast
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.util.*
import com.paypal.checkout.PayPalCheckout;

class PaypalCheckoutTrigger(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "PaypalCheckoutTrigger"
    }


    @ReactMethod
    fun triggerPaypalCheckout(paymentId: String, onMessage: Callback) {
        PayPalCheckout.registerCallbacks(
            onApprove = OnApprove { approval ->
                onMessage(null, "approved")
            },
            onCancel = OnCancel {
                onMessage(null, "cancelled")
            },
            onError = OnError { errorInfo ->
                onMessage(errorInfo)
            }
        )

        PayPalCheckout.startCheckout(
            CreateOrder { createOrderActions ->
                createOrderActions.set(paymentId)
            }
        )
    }
}
