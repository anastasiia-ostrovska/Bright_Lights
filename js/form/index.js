import FormStepsBtnController from './formStepsBtnController.js';

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

// handle prev button visibility on click:
const toggleBtnVisibility = (button, hiddenClassName) => {
  button.classList.toggle(hiddenClassName);
};
const handlePrevBtnVisibility = (formStepsBtnController, hiddenClassName) => {
  const isFirstStep = formStepsBtnController.stepIndex === 0;
  const isSecondStep = (formStepsBtnController.stepIndex - 1) === 0;
  const isPrevBtnHidden = formStepsBtnController.prevBtn.classList.contains(hiddenClassName);

  if (isFirstStep && !isPrevBtnHidden) {
    toggleBtnVisibility(formStepsBtnController.prevBtn, hiddenClassName);
  }

  if (isSecondStep && isPrevBtnHidden) {
    toggleBtnVisibility(formStepsBtnController.prevBtn, hiddenClassName);
  }
};

const formNavBtnList = [prevBtn, nextBtn];
formNavBtnList.forEach(btn => btn.addEventListener('click', (event) => {
  handlePrevBtnVisibility(formStepsBtnController, hiddenClassName);
}));


