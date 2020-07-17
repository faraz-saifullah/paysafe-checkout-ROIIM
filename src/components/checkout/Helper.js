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
    //handle scinario when user is logged in
    if (customerId !== "") {
      //Get singleUseCustomerToken from the backend
      try {
        const res = await axios.post(
          "http://ec2-3-136-87-139.us-east-2.compute.amazonaws.com:3001/tokens",
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
      } catch (err) {
        return err;
      }
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
    //handle scinario when user is logged in
    if (this.singleUseCustomerToken !== "") {
      setupInput.singleUseCustomerToken = this.singleUseCustomerToken;
    }
    return setupInput;
  };

  callBackFunction = async (instance, error, result) => {
    //case when user decides to not save card
    if (result && result.paymentHandleToken && !result.customerOperation) {
      try {
        const response = await axios.post(
          "http://ec2-3-136-87-139.us-east-2.compute.amazonaws.com:3001/payments",
          {
            merchantRefNum: this.merchantRefNum,
            paymentHandleToken: result.paymentHandleToken,
            amount: result.amount,
          }
        );
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
      //case when user decides to save card
    } else if (
      result &&
      result.paymentHandleToken &&
      result.customerOperation === "ADD"
    ) {
      try {
        //pass customer Id to backend when customer waants to save card
        const response = await axios.post(
          "http://ec2-3-136-87-139.us-east-2.compute.amazonaws.com:3001/payments",
          {
            customerId: this.customerId,
            merchantRefNum: this.merchantRefNum,
            paymentHandleToken: result.paymentHandleToken,
            amount: result.amount,
          }
        );
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
      //case when setup function fails to create iframe
    } else {
      this.paymentResponse.status = "failed";
      this.paymentResponse.message = "Unable To Initialize Payment";
      this.promiseReject(this.paymentResponse);
      throw error;
    }
  };

  closeCallBack = (stage, expired) => {
    if (expired) {
      //case when  payment handle expires without user completing the payment
      this.paymentResponse.status = "failed";
      this.paymentResponse.message = "Session Expired";
      this.promiseReject(this.paymentResponse);
    } else if (this.paymentResponse.status !== "success") {
      //case when user closes the iframe before completing the payment
      this.paymentResponse.status = "failed";
      this.paymentResponse.message = "Payment Closed Unexpectedly By The User!";
      this.promiseReject(this.paymentResponse);
    }
    this.promiseResolve();
  };
}
