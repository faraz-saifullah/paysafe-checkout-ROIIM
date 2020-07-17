export function validateInput(customerInfo, billingAddress) {
    let validationError = customerInfoValidation(customerInfo);
    if (!validationError) {
        validationError = billingAddressValidation(billingAddress);
    }
    return validationError
}

function billingAddressValidation(billingAddress) {
    if (!billingAddress.street) {
        return "Address Street can not be empty";
    } else if (!billingAddress.city) {
        return "City can not be empty";
    } else if (!billingAddress.zip) {
        return "Zip Code can not be empty";
    } else if (Object.is(Number(billingAddress.zip), NaN)) {
        return "Invalid Zip Code";
    } else if (!billingAddress.state) {
        return "State Code can not be empty";
    } else if (!billingAddress.country) {
        return "Country Code can not be empty";
    } else if (!isCodeValid(billingAddress.state)) {
        return "Invalid state code. (MH for Maharashtra)"
    } else if (!isCodeValid(billingAddress.country)) {
        return "Invalid country code. (IN for India)"
    }
    return "";
}

function isCodeValid(code) {
    if (code.length === 2 && code === code.toUpperCase())
        return true;
    return false;
}

function customerInfoValidation(customerInfo) {
    if (!customerInfo.firstName) {
        return "First Name can not be empty";
    } else if (!customerInfo.lastName) {
        return "Last Name can not be empty";
    } else if (!customerInfo.email) {
        return "Email can not be empty";
    } else if (!customerInfo.phone) {
        return "Phone Number can not be empty";
    } else if (!customerInfo.day) {
        return "Day of birth can not be empty";
    } else if (!customerInfo.month) {
        return "Month of birth can not be empty";
    } else if (!customerInfo.year) {
        return "Year of birth can not be empty";
    } else if (!isValidEmail(customerInfo.email)) {
        return "Invalid email entered";
    } else if (Object.is(Number(customerInfo.phone), NaN)) {
        return "Invalid phone number";
    } else if (
        !isDateValid(customerInfo.day, customerInfo.month, customerInfo.year)
    ) {
        return "Invalid date of birth entered ";
    }
    return "";
}

function isDateValid(day, month, year) {
    if (
        Object.is(Number(day), NaN) ||
        Object.is(Number(month), NaN) ||
        Object.is(Number(year), NaN)
    )
        return false;
    if (day < 1 || day > 31) return false;
    if (month < 1 || month > 12) return false;
    if (year < 1920 || year > 2020) return false;
    return true;
}

function isValidEmail(email) {
    const regularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
}
