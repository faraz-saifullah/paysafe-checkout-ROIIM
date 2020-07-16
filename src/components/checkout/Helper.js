import config from "../../paysafeConfig.json";
import axios from "axios";

let merchantRefNumber = '';

export function prepareSetupInput(formInput, totalAmout) {
  merchantRefNumber = Math.random().toString(36).slice(5);
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
    merchantRefNum: `${merchantRefNumber}`,
    canEditAmount: false,
    merchantDescriptor: config.merchant.merchantDescriptor,
    displayPaymentMethods: ["card"],
    paymentMethodDetails: {},
  };
}

export async function callBackFunction(instance, error, result) {
  if (result && result.paymentHandleToken) {
    try {
      const response = await axios.post("http://localhost:3001/payments", {
        merchantRefNum: merchantRefNumber,
        paymentHandleToken: result.paymentHandleToken,
        amount: result.amount,
      });
      instance.showSuccessScreen(`Payment ID: ${response.data.id}`);
    } catch (err) {
      instance.showFailureScreen("Payment Failed! Please Try Again.");
      throw err;
    }
    return result;
  } else {
    throw error;
  }
}
