#import "React/RCTViewManager.h"
#import "React/RCTEventEmitter.h"
#import <Foundation/Foundation.h>

@interface RCT_EXTERN_MODULE(PaypalCheckoutViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(paymentId, NSString)
RCT_EXPORT_VIEW_PROPERTY(onApprove, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCancel, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onError, RCTDirectEventBlock)
RCT_EXTERN_METHOD(increment)

@end


@interface RCT_EXTERN_MODULE(PaypalTrigger, NSObject)
RCT_EXTERN_METHOD(triggerPayPalCheckout: paymentId (NSString) onApprove:(RCTResponseSenderBlock)onApprove onCancel:(RCTResponseSenderBlock)onCancel onError(RCTResponseSenderBlock)onError)
@end