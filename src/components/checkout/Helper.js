import config from "../../paysafeConfig.json";
import axios from "axios";

export default class Helper {
  constructor() {
    this.merchantRefNum = '';
    this.paymentResponse = {};
    this.paymentStatus = new Promise((resolve, reject) => {
      this.promiseResolve = resolve;
      this.promiseReject = reject;
    });
  }

  prepareSetupInput = (formInput, totalAmout) => {
    this.merchantRefNum = Math.random().toString(36).slice(5);
    return {
      currency: `${config.currency}`,
      amount: totalAmout * 100,
      locale: `${config.locale}`,
      customer: {
        firstName: "John",
        lastName: "Dee",
        email: "johndee@paysafe.com",
        phone: "1234567890",
        dateOfBirth: {
          day: 1,
          month: 7,
          year: 1990,
        },
      },
      billingAddress: formInput,
      environment: `${config.environment}`,
      merchantRefNum: `${this.merchantRefNum}`,
      canEditAmount: false,
      merchantDescriptor: config.merchant.merchantDescriptor,
      displayPaymentMethods: ["card"],
      paymentMethodDetails: {},
    };
  }

  callBackFunction = async (instance, error, result) => {
    if (result && result.paymentHandleToken) {
      try {
        const response = await axios.post("http://localhost:3001/payments", {
          merchantRefNum: this.merchantRefNum,
          paymentHandleToken: result.paymentHandleToken,
          amount: result.amount,
        });
        instance.showSuccessScreen(`Payment ID: ${response.data.id}`);
        this.paymentResponse.status = "success"
        this.paymentResponse.message = "Payment Successfully Processed!";
        this.promiseResolve(this.paymentResponse);
      } catch (err) {
        instance.showFailureScreen("Payment Failed! Please Try Again.");
        this.paymentResponse.status = "failed"
        this.paymentResponse.message = "Unable To Process Payment";
        this.promiseReject(this.paymentResponse);
        throw err;
      }
    } else {
      this.paymentResponse.status = "failed"
      this.paymentResponse.message = "Unable To Initialize Payment";
      this.promiseReject(this.paymentResponse);
      throw error;
    }
  }

  closeCallBack = (stage, expired) => {
    if (expired) {
      this.paymentResponse.status = "failed"
      this.paymentResponse.message = "Session Expired";
      this.promiseReject(this.paymentResponse);
    } else if (this.paymentResponse.status !== "success") {
      this.paymentResponse.status = "failed"
      this.paymentResponse.message = "Payment Closed Unexpectedly By The User!";
      this.promiseReject(this.paymentResponse);
    }
    this.promiseResolve();
  }
}
