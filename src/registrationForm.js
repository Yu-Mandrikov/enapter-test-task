import { Component } from "./components/component";
import { Form } from "./components/form/form";
import { Validators } from "./utils/validators";

const validators = {
  username: [
    Validators.required,
    Validators.minLength(3),
    Validators.isLatin,
    Validators.startsWithCapitalLetter,
  ],
  email: [Validators.required, Validators.isEmail],
  phone: [Validators.required, Validators.isPhoneNumber],
  password: [
    Validators.required,
    Validators.isValidPassword,
    Validators.minLength(6),
  ],
  repeatpass: [Validators.required, Validators.minLength(6)],
};

export class RegistrationForm extends Component {
  constructor(id) {
    super(id);
    Object.keys(this.form.inputs).forEach((control) =>
      document
        .getElementById(control)
        .addEventListener("keyup", () => this.form.isValid(control))
    );
  }

  init() {
    this.form = new Form(
      this.$el,
      document.getElementById("submit"),
      validators
    );

    this.form.inputs["repeatpass"].push(
      Validators.isEqual(this.form.form["password"])
    );

    this.form.submitBtn.addEventListener("click", (event) => {
      this.submitHandler(event);
      this.form.submitBtn.disabled = true;
    });

    this.form.form.addEventListener("submit", this.submitHandler);
    delete this.$el;
  }

  submitHandler(event) {
    event.preventDefault();
    const POSTData = { id: Date.now(), ...this.form.getInputsValues() };
    console.log("JSON.stringify(POSTData)\n", JSON.stringify(POSTData));
    console.log("POSTData:\n", POSTData);
    this.form.clearForm();
  }
}
