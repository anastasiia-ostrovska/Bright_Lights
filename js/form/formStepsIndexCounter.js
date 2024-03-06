class FormStepsIndexCounter {
  constructor (formStepsList) {
    this.formStepsList = formStepsList;
    this.stepIndex = 0;
  }

  increaseIndex = () => {
    const stepsCount = this.formStepsList.length;
    if (this.stepIndex < stepsCount - 1) {
      this.stepIndex++;
    }
  };

  decreaseIndex = () => {
    if (this.stepIndex > 0) {
      this.stepIndex--;
    }
  };
}

export default FormStepsIndexCounter;