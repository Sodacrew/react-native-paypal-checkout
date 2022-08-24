import ExpoModulesCore
import PayPalCheckout

public class AppLifecycleDelegate: ExpoAppDelegateSubscriber {
    public func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
      let config = CheckoutConfig(
        clientID: "AZ7GEyCVqTQTeMd-ew_27mPT1uoNPzYUJ3Szk0yw-OiF7CchhrzwhEaU_sm0hrgO6EvtlzDAcvI9KRF8",
            environment: .sandbox
        )

    Checkout.set(config: config)
    print("PayPal Checkout SDK version: \(Checkout.version())")
    
        return true
    }
}