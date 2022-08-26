import Foundation
import PayPalCheckout
@objc(PaypalCheckoutTrigger)
class PaypalCheckoutTrigger: NSObject {

    @objc func triggerPaypalCheckout(_ paymentId: NSString, onMessageCallback onMesssage:RCTResponseSenderBlock) {
        Checkout.start(
            createOrder: { createOrderAction in
            createOrderAction.set(orderId: paymentId! as String)
            }, onApprove: { _approval in

            self.onMessage!(["message": "approved"])
            }

            , onCancel: {
                self.onMessage!(["message": "cancelled"])

            }, onError: { error in
                    self.onMessage!(["error": error])
            }
        )
    }