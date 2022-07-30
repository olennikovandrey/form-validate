export type FormState = {
  user: string,
  email: string,
  phone: string,
  birth: string,
  message: string,
  userValid: boolean,
  emailValid: boolean,
  phoneValid: boolean,
  birthValid: boolean,
  messageValid: boolean,
  formValid: boolean,
  userError: string,
  emailError: string,
  phoneError: string,
  birthError: string,
  messageError: string,
  pending: boolean
};
