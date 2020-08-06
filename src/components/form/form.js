import { errorMessages } from "../../utils/errorMessages";
import { errorTooltips } from "../../utils/errorTooltip";

export class Form {
  constructor(form, submitBtn, controls) {
    this.form = form;
    this.controls = controls;

    this.$submitBtn = submitBtn;
    this.$submitBtn.disabled = true;

    this.isInputsValid = {}; // Activate register button if every item in object's values is true (it's equivalent to valid form)
    Object.keys(this.controls).forEach((control) => {
      this.isInputsValid = {
        ...this.isInputsValid,
        [control]: false,
      };
    });
  }

  clearForm() {
    Object.keys(this.controls).forEach((control) => {
      this.form[control].value = "";
    });
  }

  getInputsValues() {
    const value = {};
    Object.keys(this.controls).forEach((control) => {
      value[control] = this.form[control].value;
    });
    return value;
  }

  // checks active input separately from others on every key press
  isValid(control = null) {
    this.isFormValid = true;
    const validators = this.controls[control];
    let errorMessage = "";
    let isValid = true;

    validators.forEach((validator) => {
      isValid = validator(this.form[control].value) && isValid;
      errorMessage = errorMessages[validator];
    });

    this.isFormValid = this.isFormValid && isValid;

    isValid
      ? this.deleteErrorMessage(this.form[control])
      : this.showErrorMessage(this.form[control]);

    this.isInputsValid[control] = this.isFormValid;
    this.$submitBtn.disabled = !Object.values(this.isInputsValid).every(
      (value) => value
    );

    return this.isFormValid;
  }

  // renders span under input element: <span>{Error message} {error tooltip}</span>
  showErrorMessage($control) {
    this.deleteErrorMessage($control);
    const message = `<span class="input-error">${
      errorMessages[$control.name] || "Error"
    } <span class="tooltip-wrapper"><i class="fas fa-info-circle"></i>  <div class="tooltip-content">
    ${errorTooltips[$control.name]}
  </div></span>
</span>
`;
    $control.classList.add("invalid");
    $control.nextSibling.nextSibling.innerHTML = message;
  }

  deleteErrorMessage($control) {
    $control.classList.remove("invalid");
    $control.nextSibling.nextSibling.innerHTML = "";
  }
}
