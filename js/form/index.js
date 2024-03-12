import { ticketsInfo } from '../tickets/ticketsInfo.js';
import { openBtnList } from '../modal/index.js';
import { modalElement } from '../modal/index.js';
import { createFormStepControllerOnOpen, setTicketInfoOnOpen } from './subscribeOnEvents.js';
import { removeFormStepControllerOnCLose } from './subscribeOnEvents.js';
import { handlePrevBtnVisibilityOnBtnClick } from './subscribeOnEvents.js';
import { renderPricesOnOpen } from './subscribeOnEvents.js';
import { resetTicketsQuantityOnClose } from './subscribeOnEvents.js';
import { FormStepsState } from './formStepsState.js';
import { TicketInfoState } from './ticketInfoState.js';

const formStepState = new FormStepsState;

const form = document.querySelector('#multi_step_form');
const formStepsElementList = form.querySelectorAll('.form_step');
const prevBtn = form.querySelector('.prev_btn');
const nextBtn = form.querySelector('.next_btn');
const hiddenClassName = 'hidden';

createFormStepControllerOnOpen({
  openBtnList,
  formStepState,
  formStepsList: formStepsElementList,
  prevBtn,
  nextBtn,
  hiddenClassName
});
removeFormStepControllerOnCLose({ modalElement, formStepState });
handlePrevBtnVisibilityOnBtnClick({ formStepState, prevBtn, nextBtn, hiddenClassName });

const ticketInfoState = new TicketInfoState();

setTicketInfoOnOpen({ ticketInfoState, ticketsInfo, openBtnList });

const priceFan1El = form.querySelector('.price.fan-1');
const priceFan2El = form.querySelector('.price.fan-2');

renderPricesOnOpen({ ticketInfoState, priceFan1El, priceFan2El, openBtnList });

// on close:
const quantityCounterList = form.querySelectorAll('.counter');
resetTicketsQuantityOnClose({ modalElement, quantityCounterList });





