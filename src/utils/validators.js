export class Validators {
  static required(value = "") {
    return value && value.trim();
  }

  static minLength(length) {
    return length
      ? function minimumLength(value) {
          return value.length >= length;
        }
      : Error;
  }

  static startsWithCapitalLetter(value) {
    return value ? isUpperCase(value.charAt(0)) : false;
  }

  static isEmail(email) {
    return email
      ? regExps.isEmail.test(String(email).trim().toLowerCase())
      : false;
  }

  static isLatin(value) {
    return value
      ? regExps.isLatin.test(String(value).trim().toLowerCase())
      : false;
  }

  static isValidPassword(value) {
    return value ? regExps.isValidPassword.test(value.trim()) : false;
  }

  static isPhoneNumber(value) {
    const val = String(value).replace(/[()\-]/g, "");
    return val ? regExps.isPhoneNumber.test(val.trim().toLowerCase()) : false;
  }

  static isEqual(input) {
    return input
      ? function isEqual(value2) {
          return input.value === value2;
        }
      : false;
  }
}

export const regExps = {
  isEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  isLatin: /^[A-z\u00C0-\u00ff\s'\.,-\/#!$%\^&\*;:{}=\-_`~()]+$/,
  isValidPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
  isPhoneNumber: /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{7,14}$/,
};

function isUpperCase(char) {
  return char !== char.toLowerCase();
}
