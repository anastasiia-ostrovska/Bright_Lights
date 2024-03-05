import FormPagesBtnController from './formPagesBtnController.js';

const form = document.querySelector('#multi_step_form');
const formPagesList = form.querySelectorAll('.form_step');
const prevBtn = form.querySelector('.prev_btn');
const nextBtn = form.querySelector('.next_btn');

const formPagesBtnController = new FormPagesBtnController({ formPagesList, prevBtn, nextBtn });
formPagesBtnController.init();

formPagesBtnController.prevBtn.addEventListener('click', (event) => {
  if (formPagesBtnController.pageIndex === 0) {
    event.currentTarget.style.display = 'none';
  }
});

formPagesBtnController.nextBtn.addEventListener('click', (event) => {
  if (--formPagesBtnController.pageIndex === 0) {
    formPagesBtnController.prevBtn.style.display = 'block';
  }
});

