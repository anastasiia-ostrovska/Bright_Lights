import FormStepsBtnController from './formStepsBtnController.js';

const form = document.querySelector('#multi_step_form');
const formStepsElementList = form.querySelectorAll('.form_step');
const prevBtn = form.querySelector('.prev_btn');
const nextBtn = form.querySelector('.next_btn');
const hiddenClassName = 'hidden';

const formStepsBtnController = new FormStepsBtnController({
  formStepsList: formStepsElementList,
  prevBtn,
  nextBtn,
  hiddenClassName
});
formStepsBtnController.init();

formStepsBtnController.prevBtn.addEventListener('click', (event) => {
  if (formStepsBtnController.stepIndex === 0) {
    event.currentTarget.style.display = 'none';
  }
});

formStepsBtnController.nextBtn.addEventListener('click', (event) => {
  if (--formStepsBtnController.stepIndex === 0) {
    formStepsBtnController.prevBtn.style.display = 'block';
  }
});

