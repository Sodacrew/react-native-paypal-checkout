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
                        let resultsDict = [
                            "result" : "approved",                          
                        ]
                        if(!shouldGetOrderDetails) { onMessage([NSNull(), resultsDict]) }
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
                                let resultsDict = [
                                    "result" : "approved",                          
                                ]
                                onMessage([NSNull(), resultsDict])
                            }
                        }
                    }
                }, onCancel: {
                    let resultsDict = [
                        "result" : "cancelled",                          
                    ]
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
