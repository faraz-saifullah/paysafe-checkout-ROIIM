import config from "../../paysafeConfig.json";
import axios from "axios";

export default class Helper {
  constructor() {
    this.merchantRefNum = "";
    this.customerId = "";
    this.singleUseCustomerToken = "";
    this.paymentResponse = {};
    this.paymentStatus = new Promise((resolve, reject) => {
      this.promiseResolve = resolve;
      this.promiseReject = reject;
    });
  }

  prepareSetupInput = async (
    billingAddress,
    customerInfo,
    totalAmout,
    customerId
  ) => {
    this.merchantRefNum = Math.random().toString(36).slice(5);
    this.customerId = customerId;
    if (customerId !== "") {
      const res = await axios.post(
        "http://localhost:3001/payments/token",
        {
          merchantRefNum: this.merchantRefNum,
          customerId: this.customerId,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      this.singleUseCustomerToken = res.data.singleUseCustomerToken;
    }
    customerInfo.dateOfBirth = {
      day: Number(customerInfo.day),
      month: Number(customerInfo.month),
      year: Number(customerInfo.year),
    };
    const setupInput = {
      currency: `${config.currency}`,
      amount: totalAmout,
      locale: `${config.locale}`,
      customer: customerInfo,
      billingAddress: billingAddress,
      environment: `${config.environment}`,
      merchantRefNum: `${this.merchantRefNum}`,
      canEditAmount: false,
      merchantDescriptor: config.merchant.merchantDescriptor,
      displayPaymentMethods: ["card"],
      paymentMethodDetails: {},
    };
    if (this.singleUseCustomerToken !== "") {
      setupInput.singleUseCustomerToken = this.singleUseCustomerToken;
    }
    return setupInput;
  };

  callBackFunction = async (instance, error, result) => {
    if (result && result.paymentHandleToken && !result.customerOperation) {
      try {
        const response = await axios.post("http://localhost:3001/payments", {
          merchantRefNum: this.merchantRefNum,
          paymentHandleToken: result.paymentHandleToken,
          amount: result.amount,
        });
        instance.showSuccessScreen(`Payment ID: ${response.data.id}`);
        this.paymentResponse.status = "success";
        this.paymentResponse.message = "Payment Successfully Processed!";
        this.promiseResolve(this.paymentResponse);
      } catch (err) {
        instance.showFailureScreen("Payment Failed! Please Try Again.");
        this.paymentResponse.status = "failed";
        this.paymentResponse.message = "Unable To Process Payment";
        this.promiseReject(this.paymentResponse);
        throw err;
      }
    } else if (
      result &&
      result.paymentHandleToken &&
      result.customerOperation === "ADD"
    ) {
      try {
        const response = await axios.post("http://localhost:3001/payments", {
          customerId: this.customerId,
          merchantRefNum: this.merchantRefNum,
          paymentHandleToken: result.paymentHandleToken,
          amount: result.amount,
        });
        instance.showSuccessScreen(`Payment ID: ${response.data.id}`);
        this.paymentResponse.status = "success";
        this.paymentResponse.message = "Payment Successfully Processed!";
        this.promiseResolve(this.paymentResponse);
      } catch (err) {
        instance.showFailureScreen("Payment Failed! Please Try Again.");
        this.paymentResponse.status = "failed";
        this.paymentResponse.message = "Unable To Process Payment";
        this.promiseReject(this.paymentResponse);
        throw err;
      }
    } else {
      this.paymentResponse.status = "failed";
      this.paymentResponse.message = "Unable To Initialize Payment";
      this.promiseReject(this.paymentResponse);
      throw error;
    }
  };

  closeCallBack = (stage, expired) => {
    if (expired) {
      this.paymentResponse.status = "failed";
      this.paymentResponse.message = "Session Expired";
      this.promiseReject(this.paymentResponse);
    } else if (this.paymentResponse.status !== "success") {
      this.paymentResponse.status = "failed";
      this.paymentResponse.message = "Payment Closed Unexpectedly By The User!";
      this.promiseReject(this.paymentResponse);
    }
    this.promiseResolve();
  };
}
