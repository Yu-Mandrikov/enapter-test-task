import { errorMessages } from "../../utils/errorMessages";
import { errorTooltips } from "../../utils/errorTooltip";

export class Form {
  constructor(form, submitBtn, inputs) {
    this.form = form;
    this.inputs = inputs;

    this.submitBtn = submitBtn;
    this.submitBtn.disabled = true;

    this.areInputsValid = Object.keys(this.inputs).reduce(
      (isInputsValid, inputName) => ({ ...isInputsValid, [inputName]: false }),
      {}
    );
  }

  clearForm() {
    this.form.reset();
  }

  getInputsValues() {
    return Object.keys(this.inputs).reduce(
      (data, inputName) => ({
        ...data,
        [inputName]: this.form[inputName].value,
      }),
      {}
    );
  }

  isValid(inputName) {
    const validators = this.inputs[inputName];

    const isValid = validators.reduce((isValid, validator) => {
      return validator(this.form[inputName].value) && isValid;
    }, true);

    isValid
      ? this.deleteErrorMessage(this.form[inputName])
      : this.showErrorMessage(this.form[inputName]);

    this.areInputsValid[inputName] = isValid;
    this.submitBtn.disabled = !Object.values(this.areInputsValid).every(
      (value) => value
    );

    return isValid;
  }

  showErrorMessage(input) {
    this.deleteErrorMessage(input);
    const message = `<span class="input-error">${
      errorMessages[input.name] || "Input error. Please check again."
    } <span class="tooltip-wrapper"><i class="fas fa-info-circle"></i>  <div class="tooltip-content">
    ${errorTooltips[input.name]}
  </div></span>
</span>
`;
    input.classList.add("invalid");
    input.nextSibling.nextSibling.innerHTML = message;
  }

  deleteErrorMessage($control) {
    $control.classList.remove("invalid");
    $control.nextSibling.nextSibling.innerHTML = "";
  }
}
