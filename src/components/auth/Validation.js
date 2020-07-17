export function validateLoginInput(loginInput) {
    if (!loginInput.username) {
        return "Username can not be empty";
    } else if (!loginInput.password) {
        return "Password can not be empty";
    }
    return "";
}

export function validateRegisterInput(registerInput) {
    if (!registerInput.username) {
        return "Username can not be empty";
    } else if (!registerInput.firstName) {
        return "First Name can not be empty";
    } else if (!registerInput.lastName) {
        return "Last Name can not be empty";
    } else if (!registerInput.email) {
        return "Email can not be empty";
    } else if (!registerInput.phone) {
        return "Phone Number can not be empty";
    } else if (!registerInput.day) {
        return "Day of birth can not be empty";
    } else if (!registerInput.month) {
        return "Month of birth can not be empty";
    } else if (!registerInput.year) {
        return "Year of birth can not be empty";
    } else if (!registerInput.password) {
        return "Password can not be empty";
    } else if (!registerInput.confirmPassword) {
        return "Confirm password can not be empty";
    } else if (!isValidEmail(registerInput.email)) {
        return "Invalid email entered";
    } else if (Object.is(Number(registerInput.phone), NaN)) {
        return "Invalid phone number";
    } else if (
        !isDateValid(registerInput.day, registerInput.month, registerInput.year)
    ) {
        return "Invalid date of birth entered ";
    } else if (registerInput.password !== registerInput.confirmPassword) {
        return "Password do not match with confirm password";
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
