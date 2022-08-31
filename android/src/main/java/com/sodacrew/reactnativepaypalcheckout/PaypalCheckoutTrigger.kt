package com.sodacrew.reactnativepaypalcheckout

import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class PaypalCheckoutTrigger(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var paymentSheetFragment: PaymentSheetFragment? = null
    override fun getName(): String {
        return "PaypalCheckoutTrigger"
    }


    @ReactMethod
    fun triggerPaypalCheckout(paymentId: String, onMessage: Callback) {

        paymentSheetFragment?.removeFragment(reactApplicationContext)
        paymentSheetFragment = PaymentSheetFragment(reactApplicationContext, onMessage)
        try {
            (reactApplicationContext.currentActivity as? AppCompatActivity)?.supportFragmentManager?.let {
                it.beginTransaction()
                    .add(paymentSheetFragment!!, PaymentSheetFragment.TAG)
                    .commit()
            }
        } catch (error: IllegalStateException) {
            onMessage(error.message)
        }

        paymentSheetFragment?.triggerPaypalCheckout(paymentId)
    }
}


fun Fragment.removeFragment(context: ReactApplicationContext) {
    (context.currentActivity as? AppCompatActivity)?.supportFragmentManager?.let {
        if (it.findFragmentByTag(this.tag) != null) {
            it.beginTransaction().remove(this).commitAllowingStateLoss()
        }
    }
}