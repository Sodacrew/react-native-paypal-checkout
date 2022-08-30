
package com.sodacrew.reactnativepaypalcheckout

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

import com.paypal.checkout.PayPalCheckout
import com.paypal.checkout.approve.OnApprove
import com.paypal.checkout.cancel.OnCancel
import com.paypal.checkout.createorder.CreateOrder
import com.paypal.checkout.error.OnError

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
                onMessage(errorInfo.error.message)
            }
        )

        PayPalCheckout.startCheckout(
            CreateOrder { createOrderActions ->
                createOrderActions.set(paymentId)
            }
        )
    }
}
