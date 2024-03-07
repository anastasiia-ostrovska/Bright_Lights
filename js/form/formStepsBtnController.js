import FormStepsInterface from './formStepsInterface.js';

class FormStepsBtnController extends FormStepsInterface {
  constructor ({ formStepsList, prevBtn, nextBtn, hiddenClassName }) {
    super(formStepsList, hiddenClassName);
    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;
  }

  onPrevBtnClick = () => {
    this.decreaseIndex(this.stepIndex);
    this.showStep(this.stepIndex);
  };

  onNextBtnClick = () => {
    this.increaseIndex();
    this.showStep(this.stepIndex);
  };

  init = () => {
    this.showStep(this.stepIndex);
    this.prevBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.onPrevBtnClick();
    });
    this.nextBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.onNextBtnClick();
    });
  };
}

export default FormStepsBtnController;