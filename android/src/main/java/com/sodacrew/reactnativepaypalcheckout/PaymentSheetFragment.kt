package com.sodacrew.reactnativepaypalcheckout

import android.content.Context
import androidx.fragment.app.Fragment
import com.facebook.react.bridge.*


import java.io.ByteArrayOutputStream

import com.paypal.checkout.PayPalCheckout
import com.paypal.checkout.approve.OnApprove
import com.paypal.checkout.cancel.OnCancel
import com.paypal.checkout.createorder.CreateOrder
import com.paypal.checkout.error.OnError

class PaymentSheetFragment(
    private val context: ReactApplicationContext,
    private val onMessage: Callback
) : Fragment() {


    override fun onAttach(context: Context) {
        super.onAttach(context)
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

    }

    fun triggerPaypalCheckout(paymentId: String) {

        PayPalCheckout.startCheckout(
            CreateOrder { createOrderActions ->
                createOrderActions.set(paymentId)
            }
        )
    }

    companion object {
        const val TAG = "payment_sheet_launch_fragment"
    }
}