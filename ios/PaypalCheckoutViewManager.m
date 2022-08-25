 10 lines (9 sloc)  374 Bytes
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(PaypalCheckoutViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(paymentId, NSString)
RCT_EXPORT_VIEW_PROPERTY(onApprove, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCancel, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onError, RCTDirectEventBlock)

@end
