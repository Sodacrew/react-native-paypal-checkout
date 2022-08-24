import PayPalCheckout
import CoreGraphics
import UIKit
import Foundation

@objc(PaypalCheckoutViewManager)
class PaypalCheckoutViewManager: RCTViewManager {
  override func view() -> UIView! {
    return PaypalCheckoutView()
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

}

class PaypalCheckoutView : UIView {

  @objc var paymentId: NSString?;
  @objc var onApprove: RCTDirectEventBlock?;
  @objc var onError: RCTDirectEventBlock?;
  @objc var onCancel: RCTDirectEventBlock?;

  override init(frame: CGRect) {
    super.init(frame: frame)

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


@objc(PaypalTrigger)
class PaypalTrigger: NSObject {
    @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
    @objc 
    func triggerPayPalCheckout(_ id: NSString,  onApprove: @escaping RCTResponseSenderBlock, onCancel: @escaping RCTResponseSenderBlock,  onError: @escaping RCTResponseSenderBlock) {
    Checkout.start(
        createOrder: { createOrderAction in
          createOrderAction.set(orderId: id as String)
        }, onApprove: { approval in
          onApprove([])
        }, onCancel: {
              onCancel([])
        }, onError:  { error in
             onError([error])
        }
    )
  }
}