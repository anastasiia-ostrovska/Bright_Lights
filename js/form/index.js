import FormStepsBtnController from './formStepsBtnController.js';
import { toggleClassName } from '../utils/stylesUtils.js';

const form = document.querySelector('#multi_step_form');
const formStepsElementList = form.querySelectorAll('.form_step');
const prevBtn = form.querySelector('.prev_btn');
const nextBtn = form.querySelector('.next_btn');
const hiddenClassName = 'hidden';

// activate button controller:
const formStepsBtnController = new FormStepsBtnController({
  formStepsList: formStepsElementList,
  prevBtn,
  nextBtn,
  hiddenClassName
});
formStepsBtnController.init();

const handlePrevBtnVisibility = (formStepsBtnController, hiddenClassName) => {
  const isFirstStep = formStepsBtnController.stepIndex === 0;
  const isSecondStep = (formStepsBtnController.stepIndex - 1) === 0;
  const isPrevBtnHidden = formStepsBtnController.prevBtn.classList.contains(hiddenClassName);

  if (isFirstStep && !isPrevBtnHidden) {
    toggleClassName(formStepsBtnController.prevBtn, hiddenClassName);
  }

  if (isSecondStep && isPrevBtnHidden) {
    toggleClassName(formStepsBtnController.prevBtn, hiddenClassName);
  }
};

const formNavBtnList = [formStepsBtnController.prevBtn, formStepsBtnController.nextBtn];
formNavBtnList.forEach(btn => btn.addEventListener('click', (event) => {
  handlePrevBtnVisibility(formStepsBtnController, hiddenClassName);
}));

// slidesArray.forEach(slide => slide.addEventListener('click', (event) => {
//
// }));
//
// const openBtnList = document.querySelectorAll('.modal_show_btn');


