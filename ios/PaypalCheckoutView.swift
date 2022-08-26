import Foundation
import UIKit
import PayPalCheckout

@objc(PaypalCheckoutView)
class PaypalCheckoutView : UIView {
    
    var paymentButtonContainer: PaymentButtonContainer?
    
    @objc var paymentId: NSString?;
    @objc var onMessage: RCTDirectEventBlock?;
    
    override func didSetProps(_ changedProps: [String]!) {
        
        if let paymentButtonContainer = self.paymentButtonContainer {
            paymentButtonContainer.removeFromSuperview()
        }
        
   
        self.paymentButtonContainer = PaymentButtonContainer(
            payPalButtonUIConfiguration: PayPalButtonUIConfiguration(attributes: PaymentButtonAttributes(size: PaymentButtonSize(rawValue:300) ?? .expanded)),
            payLaterButtonUIConfiguration: PayLaterButtonUIConfiguration.init()
        )
        

        if let paymentButtonContainer = self.paymentButtonContainer {
            paymentButtonContainer.frame = CGRect(x: 0, y: 0, width: self.frame.width, height: self.frame.height)
            
            self.addSubview(paymentButtonContainer)
            NSLayoutConstraint.activate(
                [
                    paymentButtonContainer.centerYAnchor.constraint(equalTo: self.centerYAnchor),
                    paymentButtonContainer.centerXAnchor.constraint(equalTo: self.centerXAnchor),
                ]
            )
        }
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
    }
    
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    
    func configurePayPalCheckout() {
        Checkout.setCreateOrderCallback { createOrderAction in
            createOrderAction.set(orderId: self.paymentId! as String)
        }
        Checkout.setOnApproveCallback { _approve in
            self.onMessage!(["message": "approved"])
        }
        Checkout.setOnCancelCallback {
            self.onMessage!(["message": "cancelled"])
        }
        
        Checkout.setOnErrorCallback { error in
            self.onMessage!(["error": error])
        }
    }
}
