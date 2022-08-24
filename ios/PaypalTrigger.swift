import PayPalCheckout
import Foundation

@objc(PaypalTrigger)
class PaypalTrigger: NSObject {
    @objc 
    func triggerPayPalCheckout(_ id: NSString,  onApprove: @escaping RCTResponseSenderBlock, onCancel: @escaping RCTResponseSenderBlock,  onError: @escaping RCTResponseSenderBlock) {
    Checkout.start(
        createOrder: { createOrderAction in
          createOrderAction.set(orderId: id as String)
        }, onApprove: { approval in
          onApprove([])
        }, onCancel: {
              onCancel([])
        }, onError:  { error in
             onError([error])
        }
    )
  }
}