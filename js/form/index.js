import FormStepsBtnController from './formStepsBtnController.js';
import { renderPricesOnModalOpen } from './subscribeOnEvents.js';
import { handlePrevBtnVisibilityOnClick } from './subscribeOnEvents.js';
import { resetTicketsQuantityOnModalClose } from './subscribeOnEvents.js';

const form = document.querySelector('#multi_step_form');
const priceFan1El = form.querySelector('.price.fan-1');
const priceFan2El = form.querySelector('.price.fan-2');
const ticketBtnSelector = 'modal_show_btn';

renderPricesOnModalOpen({ ticketBtnSelector, priceFan1El, priceFan2El });

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

const formNavBtnList = [prevBtn, nextBtn];

handlePrevBtnVisibilityOnClick({
  formStepsBtnController,
  formNavBtnList,
  hiddenClassName,
});

// reset quantity on close:
const quantityCounterList = form.querySelectorAll('.counter');

resetTicketsQuantityOnModalClose(quantityCounterList);





