#import "React/RCTBridgeModule.h"
#import <Foundation/Foundation.h>

@interface RCT_EXTERN_MODULE(PaypalTrigger NSObject)
RCT_EXTERN_METHOD(triggerPayPalCheckout: paymentId (NSString) onApprove:(RCTResponseSenderBlock)onApprove onCancel:(RCTResponseSenderBlock)onCancel onError(RCTResponseSenderBlock)onError)
@end