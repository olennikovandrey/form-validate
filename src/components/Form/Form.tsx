import IMask from "imask";
import React, { Component } from "react";

type FormState = {
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
  messageError: string
};

type FormProps = {};

export default class Form extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      user: "",
      email: "",
      phone: "",
      birth: "",
      message: "",
      userValid: false,
      userError: "",
      emailValid: false,
      emailError: "",
      phoneValid: false,
      phoneError: "",
      birthValid: false,
      birthError: "",
      messageValid: false,
      messageError: "",
      formValid: false
    };
  };

userValidator = (event: React.FormEvent<HTMLInputElement>): void => {
  this.setState({
    user: event.currentTarget.value.replace(/\s+/g, " ")
  });
  const user = this.state.user;
  const usersArr = user.split(" ");
  const isWordsLength = usersArr.every(word => word.length >= 3 && word.length <= 30);
  const regexp = /^[a-z\s]+$/i;
  const isLatinLetters = usersArr.every(letter => regexp.test(letter));

  if (!user) {
    this.setState({ userValid: false });
    this.setState({ userError: "This field can't be empty" });
    event.currentTarget.setAttribute("data-state", "invalid");
  } else if (!isLatinLetters) {
    this.setState({ userValid: false });
    this.setState({ userError: "Use latin letters only" });
    event.currentTarget.setAttribute("data-state", "invalid");
  } else if (!isWordsLength) {
    this.setState({ userValid: false });
    this.setState({ userError: "Words length must be from 3 to 30 symbols" });
    event.currentTarget.setAttribute("data-state", "invalid");
  } else if (usersArr.length !== 2) {
    this.setState({ userValid: false });
    this.setState({ userError: "This field must contain two words" });
    event.currentTarget.setAttribute("data-state", "invalid");
  } else {
    this.setState({ userValid: true });
    this.setState({ userError: "" });
    event.currentTarget.setAttribute("data-state", "valid");
  };
};

emailValidator = (event: React.FormEvent<HTMLInputElement>): void => {
  this.setState({
    email: event.currentTarget.value.toLowerCase()
  });
  const email = this.state.email;
  const regexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const isEmail = regexp.test(email);

  if (!email) {
    this.setState({ emailValid: false });
    this.setState({ emailError: "This field can't be empty" });
    event.currentTarget.setAttribute("data-state", "invalid");
  } else if (!isEmail) {
    this.setState({ emailValid: false });
    this.setState({ emailError: "Please, use email like: example@mail.com" });
    event.currentTarget.setAttribute("data-state", "invalid");
  } else {
    this.setState({ emailValid: true });
    this.setState({ emailError: "" });
    event.currentTarget.setAttribute("data-state", "valid");
  };
};

phoneMaskValidator = (event: React.FormEvent<HTMLInputElement>): void => {
  const phoneInput = document.getElementById("phone");
  const maskOptions = {
    mask: "+{7}(000)000-00-00"
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mask = IMask(phoneInput!, maskOptions);
  this.setState({ phone: event.currentTarget.value });
  const phone = event.currentTarget.value

  if (!phone) {
    this.setState({ phoneValid: false });
    this.setState({ phoneError: "Please, enter your phone number" });
    event.currentTarget.setAttribute("data-state", "invalid");
  } else if (phone.length !== 16) {
    this.setState({ phoneValid: false });
    this.setState({ phoneError: "Please, enter full phone number" });
    event.currentTarget.setAttribute("data-state", "invalid");
  } else {
    this.setState({ phoneValid: true });
    this.setState({ phoneError: "" });
    event.currentTarget.setAttribute("data-state", "valid");
  };
};

birthValidator = (event: React.FormEvent<HTMLInputElement>): void => {
  const date = new Date(event.currentTarget.value);
  const regexp = /[a-zа-яё]/i

  this.setState({
    birth: date.toLocaleDateString()
  });

  if (regexp.test(date.toLocaleDateString())) {
    this.setState({ birthValid: false });
    this.setState({ birthError: "This field can't be empty" });
    event.currentTarget.setAttribute("data-state", "invalid");
  } else {
    this.setState({ birthValid: true });
    this.setState({ birthError: "" });
    event.currentTarget.setAttribute("data-state", "valid");
  };
};

messageValidator = (event: React.FormEvent<HTMLTextAreaElement>): void => {
  this.setState({
    message: event.currentTarget.value
  });
  const message = event.currentTarget.value;

  if (!message) {
    this.setState({ messageValid: false });
    this.setState({ messageError: "This field can't be empty" });
    event.currentTarget.setAttribute("data-state", "invalid");
  } else if (message.length < 10 || message.length > 300) {
    this.setState({ messageValid: false });
    this.setState({ messageError: "Minimum 10, maximum 300 characters" });
    event.currentTarget.setAttribute("data-state", "invalid");
  } else {
    this.setState({ messageValid: true });
    this.setState({ messageError: "" });
    event.currentTarget.setAttribute("data-state", "valid");
  };
};

formValidChecker = (): void => {
  if (this.state.userValid && this.state.emailValid && this.state.phoneValid && this.state.birthValid && this.state.messageValid) {
    this.setState({
      formValid: true
    })
  } else {
    this.setState({
      formValid: false
    })
  }
};

handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
  event.preventDefault();
  console.log(this.state.user + " " + this.state.email + " " +  this.state.phone + " " + this.state.birth + " " + this.state.message)
};

componentDidMount() {
  document.addEventListener("keyup", this.formValidChecker)
};

componentWillUnmount() {
  document.removeEventListener("keyup", this.formValidChecker)
};

  render() {
    const { user, userError, email, emailError, phone, phoneError, birthError, message, messageError, formValid } = this.state;

    return (
      <React.Fragment>
        <form onSubmit={ this.handleSubmit }>
          <span>Please, fill in all the fields</span>
          <div>
            <label>Name, surname (latin only)</label>
            <input
              type="text"
              name="user"
              data-state=""
              value={ user }
              onChange={ this.userValidator }
              onBlur={ this.userValidator }
              onInput={ this.userValidator }
            />
            { userError && <p>{ userError }</p> }
          </div>

          <div>
            <label>E-mail</label>
            <input
              type="email"
              data-state=""
              value={ email }
              onChange={ this.emailValidator }
              onBlur={ this.emailValidator }
              onInput={ this.emailValidator }
            />
            { emailError && <p>{ emailError }</p> }
          </div>

          <div>
            <label>Phone</label>
            <input
              type="text"
              data-state=""
              value={ phone }
              placeholder="+7(000)000-00-00"
              id="phone"
              onChange={ this.phoneMaskValidator }
              onBlur={ this.phoneMaskValidator }
              onInput={ this.phoneMaskValidator }
            />
            { phoneError && <p>{ phoneError }</p> }
          </div>

          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              onChange={ this.birthValidator }
              onBlur={ this.birthValidator }
            />
            { birthError && <p>{ birthError }</p> }
          </div>

          <div>
            <label>Your message</label>
            <textarea
              data-state=""
              value={ message }
              onChange={ this.messageValidator}
              onBlur={ this.messageValidator }
            />
            { messageError && <p className="msg-err">{ messageError }</p> }
          </div>
          <button type="submit" disabled={ !formValid }>Send</button>
        </form>
      </React.Fragment>
    );
  };
};
