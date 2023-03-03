import Foundation
import PayPalCheckout

@objc(PaypalCheckoutTrigger)
class PaypalCheckoutTrigger: NSObject {
    
    @objc
    func triggerPaypalCheckout(_ paymentId: NSString, needDetails shouldGetOrderDetails: Bool, onMessageCallback onMessage: @escaping RCTResponseSenderBlock) {
        DispatchQueue.main.async{
            Checkout.start(
                createOrder: { createOrderAction in
                    createOrderAction.set(orderId: paymentId as String)
                }, onApprove: { approval in
                    approval.actions.capture { (response, error) in
                        if(!shouldGetOrderDetails) { onMessage([NSNull(), "approved"]) }
                    }
                    if(shouldGetOrderDetails) {
                        approval.actions.getOrderDetails { details, error in
                            let encoder = JSONEncoder()
                            if let jsonData = try? encoder.encode(details?.payer),
                               let jsonString = String(data: jsonData, encoding: .utf8) {
                                let resultsDict = [
                                  "result" : "approved",
                                  "payer" : jsonString
                                ]
                                onMessage([NSNull(), resultsDict])
                            } else {
                                onMessage([NSNull(), "approved"])
                            }
                        }
                    }
                }, onCancel: {
                    onMessage([NSNull(), "cancelled"])
                }, onError: { error in
                    onMessage([error])
                }
            )
        }
    }
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
