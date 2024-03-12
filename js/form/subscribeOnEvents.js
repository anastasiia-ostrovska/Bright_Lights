import { ticketsInfo } from '../tickets/ticketsInfo.js';
import { slidesArray } from '../slider/index.js';
import { openBtnList } from '../modal/index.js';
import { modalElement } from '../modal/index.js';
import { toggleClassName } from '../utils/stylesUtils.js';
import { getIsXIndex } from '../utils/indexUtils.js';
import FormStepsBtnController from './formStepsBtnController.js';

export const createFormStepControllerOnOpen = ({
  formStepState,
  formStepsList,
  prevBtn,
  nextBtn,
  hiddenClassName
}) => {
  openBtnList.forEach(btn => btn.addEventListener('click', (event) => {
    const formStepsBtnController = new FormStepsBtnController({
      formStepsList,
      prevBtn,
      nextBtn,
      hiddenClassName
    });
    formStepsBtnController.init();
    formStepState.setBtnController(formStepsBtnController);
  }));
};

export const removeFormStepControllerOnCLose = (formStepState) => {
  modalElement.addEventListener('close', (event) => {
    formStepState.setBtnController(null);
  });
};

export const handlePrevBtnVisibilityOnBtnClick = ({ formStepState, prevBtn, nextBtn, hiddenClassName }) => {
  nextBtn.addEventListener('click', (event) => {
    const isFirstStep = getIsXIndex(formStepState.btnController.stepIndex, 0);
    const isPrevBtnHidden = formStepState.btnController.prevBtn.classList.contains(hiddenClassName);

    if (isFirstStep && isPrevBtnHidden) {
      toggleClassName(prevBtn, hiddenClassName);
    }
  });

  prevBtn.addEventListener('click', (event) => {
    const isSecondStep = getIsXIndex(formStepState.btnController.stepIndex, 1);
    const isPrevBtnHidden = prevBtn.classList.contains(hiddenClassName);

    if (isSecondStep && !isPrevBtnHidden) {
      toggleClassName(prevBtn, hiddenClassName);
    }
  });
};

export const renderPricesOnOpen = ({ ticketBtnSelector, priceFan1El, priceFan2El }) => {
  slidesArray.forEach((slide, index) => slide.addEventListener('click', (event) => {
    const isButton = event.target.tagName === 'BUTTON';
    const isContainTicketBtnSelector = event.target.classList.contains(ticketBtnSelector);
    const prices = ticketsInfo[index].price;
    if (isButton && isContainTicketBtnSelector) {
      priceFan1El.innerHTML = prices.FAN1;
      priceFan2El.innerHTML = prices.FAN2;
    }
  }));
};

export const resetTicketsQuantityOnClose = (quantityCounterList) => {
  modalElement.addEventListener('close', (event) => {
    quantityCounterList.forEach(counter => counter.value = 0);
  });
};





