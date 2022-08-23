import PayPalCheckout
import CoreGraphics

@objc(PaypalCheckoutViewManager)
class PaypalCheckoutViewManager: RCTViewManager {
  override func view() -> (PaypalCheckoutView) {
    return PaypalCheckoutView()
  }
}

class PaypalCheckoutView : UIView {

  @objc var clientId: NSString?;
  @objc var paymentId: NSString?;
  @objc var onApprove: RCTDirectEventBlock?;
  @objc var onError: RCTDirectEventBlock?;
  @objc var onCancel: RCTDirectEventBlock?;

  override init(frame: CGRect) {
    super.init(frame: frame)

    let config = CheckoutConfig(
        clientID: self.clientID as String,
        environment: .sandbox
    )

    Checkout.set(config: config)

    let paymentButton = PayPalButton()
    self.addSubview(paymentButton)

    NSLayoutConstraint.activate(
        [
            paymentButton.centerYAnchor.constraint(equalTo: self.centerYAnchor),
            paymentButton.centerXAnchor.constraint(equalTo: self.centerXAnchor)
        ]
    )

    configurePayPalCheckout()
  }

    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
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
