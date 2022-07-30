export class SendingData {
  user: string;
  email: string;
  phone: string;
  birthDate: string;
  message: string

  constructor(user: string, email: string, phone: string, birthDate: string, message: string) {
    this.user = user;
    this.email = email;
    this.phone = phone;
    this.birthDate = birthDate;
    this.message = message;
  };
};
