import { ticketsInfo } from '../tickets/ticketsInfo.js';
import { slidesArray } from '../slider/index.js';
import { openBtnList } from '../modal/index.js';
import { modalElement } from '../modal/index.js';
import { toggleClassName } from '../utils/stylesUtils.js';
import { getIsXIndex } from '../utils/indexUtils.js';
import FormStepsBtnController from './formStepsBtnController.js';

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

let formStepsBtnController = null;
export const createFormStepControllerOnOpen = ({
  formStepsList,
  prevBtn,
  nextBtn,
  hiddenClassName
}) => {
  openBtnList.forEach(btn => btn.addEventListener('click', (event) => {
    formStepsBtnController = new FormStepsBtnController({
      formStepsList,
      prevBtn,
      nextBtn,
      hiddenClassName
    });
    formStepsBtnController.init();
  }));
};

export const handlePrevBtnVisibilityOnBtnClick = ({ prevBtn, nextBtn, hiddenClassName }) => {
  nextBtn.addEventListener('click', (event) => {
    const isFirstStep = getIsXIndex(formStepsBtnController.stepIndex, 0);
    const isPrevBtnHidden = formStepsBtnController.prevBtn.classList.contains(hiddenClassName);

    if (isFirstStep && isPrevBtnHidden) {
      toggleClassName(formStepsBtnController.prevBtn, hiddenClassName);
    }
  });

  prevBtn.addEventListener('click', (event) => {
    const isSecondStep = getIsXIndex(formStepsBtnController.stepIndex, 1);
    const isPrevBtnHidden = prevBtn.classList.contains(hiddenClassName);

    if (isSecondStep && !isPrevBtnHidden) {
      toggleClassName(formStepsBtnController.prevBtn, hiddenClassName);
    }
  });
};

export const resetTicketsQuantityOnClose = (quantityCounterList) => {
  modalElement.addEventListener('close', (event) => {
    quantityCounterList.forEach(counter => counter.value = 0);
  });
};

export const removeFormStepControllerOnCLose = () => {
  modalElement.addEventListener('close', (event) => {
    formStepsBtnController = null;
  });
};



