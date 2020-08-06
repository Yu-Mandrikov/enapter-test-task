import { Component } from "./components/component";
import { Form } from "./components/form/form";
import { Validators } from "./utils/validators";

export class RegistrationForm extends Component {
  constructor(id) {
    super(id);

    Object.keys(this.form.controls).forEach((control) => {
      const $el = document.getElementById(control);
      $el.addEventListener("keyup", () => {
        this.form.isValid(control);
      });
    });
  }

  init() {
    this.$el.addEventListener("submit", this.submitHandler);

    this.form = new Form(this.$el, document.getElementById("submit"), {
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
    });
    this.form.controls["repeatpass"].push(
      Validators.isEqual(this.form.form["password"])
    );

    this.form.$submitBtn.addEventListener("click", (event) => {
      this.submitHandler(event);
      this.form.$submitBtn.disabled = true;
    });
  }

  submitHandler(event) {
    event.preventDefault();

    const POSTdata = {
      id: Date.now(),
      ...this.form.getInputsValues(),
    };

    console.log("JSON.stringify(POSTdata)\n", JSON.stringify(POSTdata));
    console.log("POSTdata:\n", POSTdata);

    this.form.clearForm();
  }
}
