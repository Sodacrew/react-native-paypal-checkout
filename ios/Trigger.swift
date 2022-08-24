import PayPalCheckout
import Foundation

@objc(Trigger)
class Trigger: NSObject {
    @objc func triggerPayPalCheckout(paymentId: NSString, onApprove:RCTResponseSenderBlock, onCancel: RCTResponseSenderBlock, onError: RCTResponseSenderBlock) {}
    
    Checkout.start(
        createOrder: { createOrderAction in
          createOrderAction.set(orderId: paymentId! as String)
        }, onApprove: { _approval in

          onApprove!([:])
        }

        , onCancel: {
              onCancel!([:])

        }, onError: { error in
             onError!(["error": error])
        }
    )
}