import Foundation

@objc(PaypalCheckoutViewManager)
class PaypalCheckoutViewManager: RCTViewManager {
  override func view() -> UIView! {
    return PaypalCheckoutView(frame:CGRect.init())
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

}
