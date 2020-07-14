import config from "../../paysafeConfig.json";
export function prepareSetupInput(formInput, totalAmout) {
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
    merchantRefNum: `${config.merchant.merchantRefNumber}`,
    canEditAmount: true,
    merchantDescriptor: config.merchant.merchantDescriptor,
    displayPaymentMethods: ["card"],
    paymentMethodDetails: {},
  };
}

export function callBackFunction(instance, error, result) {
  if (result && result.paymentHandleToken) {
    console.log(result);
    instance.showSuccessScreen(JSON.stringify(result));
    return result;
  } else {
    instance.showFailScreen();
    console.log(error);
  }
}
