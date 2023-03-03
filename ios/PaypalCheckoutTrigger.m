#import <React/RCTBridgeModule.h>
#import <Foundation/Foundation.h>

@interface RCT_EXTERN_MODULE(PaypalCheckoutTrigger, NSObject)
RCT_EXTERN_METHOD(triggerPaypalCheckout: (NSString *)paymentId needDetails:(BOOL)needDetails onMessageCallback:(RCTResponseSenderBlock)onMessage )
@end
