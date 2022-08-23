@objc(PaypalCheckoutViewManager)
class PaypalCheckoutViewManager: RCTViewManager {
  override func view() -> (PaypalCheckoutView) {
    return PaypalCheckoutView()
  }
}

class PaypalCheckoutView : UIView {

  @objc var paymentId: NSString;
  @objc var onApprove: RCTDirectEventBlock;
  @objc var onError: RCTDirectEventBlock;
  @objc var onCancel: RCTDirectEventBlock;

  override func viewDidLoad() {
    super.viewDidLoad()

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

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  func configurePayPalCheckout() {
        Checkout.setCreateOrderCallback { createOrderAction in
          createOrderAction.set(orderId: paymentId)
        }

        Checkout.setOnApproveCallback { 
          onApprove()
        }
      Checkout.setOnCancelCallback {
        onCancel()
      }

    Checkout.setOnErrorCallback { error in
    onError(["error": error])
    }
  }
}
