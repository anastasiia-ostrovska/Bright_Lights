import FormStepsIndexCounter from './formStepsIndexCounter.js';

class FormStepsInterface extends FormStepsIndexCounter {
  constructor (formStepsList, hiddenClassName) {
    super(formStepsList);
    this.hiddenClassName = hiddenClassName;
  }

  showStep = (index) => {
    this.formStepsList.forEach(page => page.classList.add(this.hiddenClassName));
    this.formStepsList[index].classList.remove(this.hiddenClassName);
  };
}

export default FormStepsInterface;