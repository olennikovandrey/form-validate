export class preSendValidResults {
  User: boolean;
  Email: boolean;
  Phone: boolean;
  Date: boolean;
  Message: boolean

  constructor(isUserValid: boolean, isEmailValid: boolean, isPhoneValid: boolean, isBirthValid: boolean, isMessageValid: boolean) {
    this.User = isUserValid;
    this.Email = isEmailValid;
    this.Phone = isPhoneValid;
    this.Date = isBirthValid;
    this.Message = isMessageValid;
  };
};
