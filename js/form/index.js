import { renderPricesOnOpen } from './subscribeOnEvents.js';
import { createFormStepControllerOnOpen } from './subscribeOnEvents.js';
import { handlePrevBtnVisibilityOnClick } from './subscribeOnEvents.js';
import { resetTicketsQuantityOnClose } from './subscribeOnEvents.js';
import { removeFormStepControllerOnCLose } from './subscribeOnEvents.js';

const form = document.querySelector('#multi_step_form');
const priceFan1El = form.querySelector('.price.fan-1');
const priceFan2El = form.querySelector('.price.fan-2');
const ticketBtnSelector = 'modal_show_btn';

renderPricesOnOpen({ ticketBtnSelector, priceFan1El, priceFan2El });

const formStepsElementList = form.querySelectorAll('.form_step');
const prevBtn = form.querySelector('.prev_btn');
const nextBtn = form.querySelector('.next_btn');
const hiddenClassName = 'hidden';

createFormStepControllerOnOpen({
  formStepsList: formStepsElementList,
  prevBtn,
  nextBtn,
  hiddenClassName
});

const formNavBtnList = [prevBtn, nextBtn];
handlePrevBtnVisibilityOnClick(formNavBtnList, hiddenClassName);

// on close:
const quantityCounterList = form.querySelectorAll('.counter');
resetTicketsQuantityOnClose(quantityCounterList);
removeFormStepControllerOnCLose();





