class FormStepsIndexCounter {
  constructor (formStepsList) {
    this.formStepsList = formStepsList;
    this._stepIndex = 0;
  }

  get stepIndex () {
    return this._stepIndex;
  }

  increaseIndex = () => {
    const stepsCount = this.formStepsList.length;
    if (this._stepIndex < stepsCount - 1) {
      this._stepIndex++;
    }
  };

  decreaseIndex = () => {
    if (this._stepIndex > 0) {
      this._stepIndex--;
    }
  };
}

export default FormStepsIndexCounter;