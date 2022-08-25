
import Foundation
import UIKit
import PayPalCheckout


@objc(PaypalCheckoutView)
class PaypalCheckoutView : UIView {
var paymentButton: PayPalButton?

  @objc var paymentId: NSString?;
  @objc var onMessage: RCTDirectEventBlock?;


      override func didSetProps(_ changedProps: [String]!) {
        if let paymentButton = self.paymentButton {
            paymentButton.removeFromSuperview()
        }
        
        self.paymentButton = PayPalButton()
        configurePayPalCheckout()
        if let paymentButton = self.paymentButton {
            self.addSubview(paymentButton)
        }
      }

  override init(frame: CGRect) {
    super.init(frame: frame)
  }

    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    

    override func layoutSubviews() {
        if let paymentButton = self.paymentButton {
            paymentButton.frame = self.bounds
        }
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