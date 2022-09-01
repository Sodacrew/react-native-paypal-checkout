package com.sodacrew.reactnativepaypalcheckout

import android.graphics.Color
import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class PaypalCheckoutViewManager : SimpleViewManager<View>() {
  override fun getName() = "PaypalCheckoutView"

  override fun createViewInstance(reactContext: ThemedReactContext): View {
    return View(reactContext)
  }
}
