import Foundation
import PayPalCheckout

@objc(PaypalCheckoutTrigger)
class PaypalCheckoutTrigger: NSObject {
    
    @objc
    func triggerPaypalCheckout(_ paymentId: NSString, onMessageCallback onMessage: @escaping RCTResponseSenderBlock) {
        DispatchQueue.main.async{
            Checkout.start(
                createOrder: { createOrderAction in
                    createOrderAction.set(orderId: paymentId as String)
                }, onApprove: { _approval in
                    onMessage([NSNull(), "approved"])
                }, onCancel: {
                    onMessage([NSNull(), "cancel"])
                }, onError: { error in
                    onMessage([error])
                }
            )
        }
    }
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
