import Loader from "../Loader/Loader"
import IMask from "imask";
import { FormState } from "types/types";
import React, { Component } from "react";

type FormProps = {};

export default class Form extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      user: "",
      email: "",
      phone: "",
      birth: "" || null,
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
      formValid: false,
      pending: false
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
  const regexp = /^([^.@]+)(\.[^.@]+)*@([a-z]+\.)+([a-z]+){2,4}$/;
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

sendAjaxRequest = (data: object) => {
  this.setState({
    pending: true,
    formValid: false
  });

  const allFields = document.querySelectorAll(".field");
  const serverAnswerField = document.querySelector(".server-answer");
  const xhr = new XMLHttpRequest();

  //xhr.open("POST", "https://62e43a583c89b95396d929bb.mockapi.io/olennikovandrey/formvalid", true);
  xhr.open("POST", "https://api.jsonbin.io/v3/b", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-Master-Key", "$2b$10$aOlYwEThIpuMzMIMsI64L.4uqkdh/GrM0p2T48mKdpi5HaTDmmQfq");
  xhr.send(JSON.stringify(data));

  xhr.onload = () => {
    this.setState({
      pending: false,
      user: "",
      email: "",
      phone: "",
      birth: "",
      message: "",
    });
    allFields.forEach(function(el) { el.setAttribute("data-state", "") });
    document.getElementsByTagName("form")[0].reset()
    //serverAnswerField!.innerHTML = (JSON.parse(xhr.responseText).text);
    serverAnswerField!.innerHTML = (JSON.parse(xhr.responseText).record.phone);
    setTimeout(() => { serverAnswerField!.innerHTML = "" }, 7500);
  };

  xhr.onerror = () => document.querySelector(".server-answer")!.innerHTML = "Something wrong, try again";
};

handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
  event.preventDefault();
  const data = {
    user: this.state.user,
    email: this.state.email,
    phone: this.state.phone,
    birthDate: this.state.birth,
    message: this.state.message
  };
  this.sendAjaxRequest(data);
};

componentDidMount() {
  document.addEventListener("keyup", this.formValidChecker)
};

componentWillUnmount() {
  document.removeEventListener("keyup", this.formValidChecker)
};

  render() {
    const { userError, emailError, phoneError, birthError, messageError, formValid, pending } = this.state;

    return (
      <div className="form-wrapper">
        <form onSubmit={ this.handleSubmit }>
          <span>Please, fill in all fields</span>
          <div>
            <label>Name, surname (latin only)</label>
            <input
              type="text"
              name="user"
              className="field"
              onBlur={ this.userValidator }
              onInput={ this.userValidator }
              onKeyUp={ this.userValidator }
            />
            { userError && <p>{ userError }</p> }
          </div>

          <div>
            <label>E-mail</label>
            <input
              type="email"
              className="field"
              onBlur={ this.emailValidator }
              onInput={ this.emailValidator }
              onKeyUp={ this.emailValidator }
            />
            { emailError && <p>{ emailError }</p> }
          </div>

          <div>
            <label>Phone</label>
            <input
              type="text"
              className="field"
              placeholder="+7(000)000-00-00"
              id="phone"
              onKeyUp={ this.phoneMaskValidator }
              onBlur={ this.phoneMaskValidator }
              onInput={ this.phoneMaskValidator }
            />
            { phoneError && <p>{ phoneError }</p> }
          </div>

          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              className="field"
              onChange={ this.birthValidator }
              onBlur={ this.birthValidator }
            />
            { birthError && <p>{ birthError }</p> }
          </div>

          <div>
            <label>Your message (300 characters maximum)</label>
            <textarea
              className="field"
              maxLength={ 300 }
              onChange={ this.messageValidator}
              onBlur={ this.messageValidator }
            />
            { messageError && <p className="msg-err">{ messageError }</p> }
          </div>
          <button type="submit" disabled={ !formValid }>Send</button>
        </form>
        <span className="server-answer"></span>
        { pending && <Loader /> }
      </div>
    );
  };
};
