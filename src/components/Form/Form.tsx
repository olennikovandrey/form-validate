import Loader from "../Loader/Loader"
import IMask from "imask";
import { FormState } from "../../types/types";
import { SendingData } from "../../classes/sendingData";
import { preSendValidResults } from "../../classes/preSendValidResults";
import React, { Component } from "react";

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
      formValid: false,
      pending: false
    };
  };

userValidator = (event: React.FormEvent<HTMLInputElement>): void => {
  const usersArr: string[] = event.currentTarget.value.replace(/\s+/g, " ").split(" ");
  if (usersArr.length > 2) { usersArr.length = 2 };

  this.setState({
    user: usersArr.join(" ")
  });

  const user: string = this.state.user;
  const isWordsLength: boolean = usersArr.every(word => word.length >= 3 && word.length <= 30);
  const regexp: RegExp = /^[a-z]*$/i;
  const isLatinLetters: boolean = usersArr.every(letter => regexp.test(letter));

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

  const email: string = this.state.email;
  const regexp: RegExp = /^([^.@]+)(\.[^.@]+)*@([a-z]+\.)+([a-z]+){2,4}$/;
  const isEmail: boolean = regexp.test(email);

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
  const phoneInput: HTMLElement | null = document.getElementById("phone");
  const maskOptions = {
    mask: "+{7}(000)000-00-00"
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mask = IMask(phoneInput!, maskOptions);
  this.setState({ phone: event.currentTarget.value });
  const phone: string = event.currentTarget.value

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
  const date: Date = new Date(event.currentTarget.value);
  const regexp: RegExp = /[a-zа-яё]/i;

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
  const message: string = event.currentTarget.value;

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
    this.setState({ formValid: true });
  } else {
    this.setState({ formValid: false });
  };
};

sendAjaxRequest = (data: SendingData) => {
  this.setState({
    pending: true,
    formValid: false
  });

  const allFields: NodeListOf<Element> = document.querySelectorAll(".field");
  const serverAnswerField: Element | null = document.querySelector(".server-answer");
  const xhr: XMLHttpRequest = new XMLHttpRequest();

  xhr.open("POST", "https://62e43a583c89b95396d929bb.mockapi.io/olennikovandrey/formvalid", true); //test API server with my json answer
  //xhr.open("POST", "https://api.jsonbin.io/v3/b", true); //for test, unlimited API service
  xhr.setRequestHeader("Content-Type", "application/json");
  //xhr.setRequestHeader("X-Master-Key", "$2b$10$aOlYwEThIpuMzMIMsI64L.4uqkdh/GrM0p2T48mKdpi5HaTDmmQf"); //for test, unlimited API service
  xhr.send(JSON.stringify(data));

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) return;

    if (xhr.status !== 201) {
      this.setState({
        pending: false,
        formValid: true
      });
      document.querySelector(".server-answer")!.innerHTML = xhr.responseText;
      setTimeout(() => { serverAnswerField!.innerHTML = "" }, 7500);
    } else {
      this.setState({
        pending: false,
        userValid: false,
        emailValid: false,
        phoneValid: false,
        birthValid: false,
        messageValid: false,
        formValid: false,
        user: "",
        email: "",
        phone: "",
        birth: "",
        message: "",
      });

      allFields.forEach(function(el) { el.setAttribute("data-state", "") });
      document.getElementsByTagName("form")[0].reset();
      serverAnswerField!.innerHTML = JSON.parse(xhr.responseText).text; //for pasting response text to UI from recieved json (lemited API)
      //serverAnswerField!.innerHTML = (JSON.parse(xhr.responseText).record.phone); //for pasting response text to UI from recieved json (unlimited)
      setTimeout(() => { serverAnswerField!.innerHTML = "" }, 7500);
    };
  };
};

handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
  event.preventDefault();

  const data: SendingData = new SendingData(this.state.user, this.state.email, this.state.phone, this.state.birth, this.state.message);
  const isUserValid: boolean = this.state.user.split(" ").map(item => /^[a-z]{3,30}\b$/i.test(item)).every(bool => bool);
  const isEmailValid: boolean = /^([^.@]+)(\.[^.@]+)*@([a-z]+\.)+([a-z]+){2,4}$/.test(this.state.email);
  const isPhoneValid: boolean = /^\+?[7][-(]?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/.test(this.state.phone);
  const isBirthValid: boolean = /^\d{1,2}\.?\/?\d{1,2}\.?\/?\d{4}$/.test(this.state.birth);
  const isMessageValid: boolean = this.state.message.length > 10 && this.state.message.length <= 300;

  if (isUserValid && isEmailValid && isPhoneValid && isBirthValid && isMessageValid) {
    this.sendAjaxRequest(data);
  } else {
    const validData: preSendValidResults = new preSendValidResults(isUserValid, isEmailValid, isPhoneValid, isBirthValid, isMessageValid);
    const invalidField: string = Object.entries(validData).filter(item => !item[1])[0][0];
    alert(`Please, check your ${ invalidField }-field for correct filling again`);
  };
};

componentDidMount() {
  document.addEventListener("keyup", this.formValidChecker)
};

componentWillUnmount() {
  document.removeEventListener("keyup", this.formValidChecker)
};

  render() {
    const { user, userError, emailError, phoneError, birthError, messageError, formValid, pending } = this.state;

    return (
      <div className="form-wrapper">
        <form onSubmit={ this.handleSubmit }>
          <span>Please, fill in all fields</span>
          <div>
            <label>Name, surname (latin only) <b>*</b></label>
            <input
              type="text"
              name="user"
              value={ user }
              className="field"
              onBlur={ this.userValidator }
              onInput={ this.userValidator }
              onKeyUp={ this.userValidator }
            />
            { userError && <p>{ userError }</p> }
          </div>

          <div>
            <label>E-mail <b>*</b></label>
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
            <label>Phone <b>*</b></label>
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
            <label>Date of Birth <b>*</b></label>
            <input
              type="date"
              className="field"
              onChange={ this.birthValidator }
              onBlur={ this.birthValidator }
            />
            { birthError && <p>{ birthError }</p> }
          </div>

          <div>
            <label>Your message (300 characters maximum) <b>*</b></label>
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
