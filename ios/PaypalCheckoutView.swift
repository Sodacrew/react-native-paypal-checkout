
import Foundation
import UIKit
import PayPalCheckout


@objc(PaypalCheckoutView)
class PaypalCheckoutView : UIView {
var paymentButton: PayPalButton?

  @objc var paymentId: NSString?;
  @objc var onApprove: RCTDirectEventBlock?;
  @objc var onError: RCTDirectEventBlock?;
  @objc var onCancel: RCTDirectEventBlock?;


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
            self.onApprove!([:])
        }
          Checkout.setOnCancelCallback {
              self.onCancel!([:])
          }

    Checkout.setOnErrorCallback { error in
        self.onError!(["error": error])
    }
  }
}