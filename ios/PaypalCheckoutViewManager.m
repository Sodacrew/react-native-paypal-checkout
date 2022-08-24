#import "React/RCTViewManager.h"
#import "React/RCTEventEmitter.h"
#import <Foundation/Foundation.h>

@interface RCT_EXTERN_MODULE(PaypalCheckoutViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(paymentId, NSString)
RCT_EXPORT_VIEW_PROPERTY(onApprove, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCancel, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onError, RCTDirectEventBlock)

@end
