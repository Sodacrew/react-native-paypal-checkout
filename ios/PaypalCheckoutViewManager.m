#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(PaypalCheckoutViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(paymentId, NSString)
RCT_EXPORT_VIEW_PROPERTY(onMessage, RCTDirectEventBlock)

@end
